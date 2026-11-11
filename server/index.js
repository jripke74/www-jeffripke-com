require("dotenv").config();

const path = require("path");
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { createPool } = require("./db");
const { ensureSeed, mapProfile, mapProject } = require("./seed");
const { sendContactNote } = require("./mail");

const app = express();
const pool = createPool();
const clientDir = path.join(__dirname, "..", "client", "dist");

app.set("trust proxy", 1);
app.disable("x-powered-by");

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'"],
        // Safari 27 reports a false style-src violation when a page creates
        // elements, unless style attributes are explicitly allowed.
        styleSrcAttr: ["'unsafe-inline'"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'"],
        formAction: ["'self'"],
        frameAncestors: ["'none'"],
        baseUri: ["'self'"],
        objectSrc: ["'none'"],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

app.use(express.json({ limit: "32kb" }));

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many notes from this network. Please wait and try again." },
});

app.get("/api/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ ok: true });
  } catch (error) {
    res.status(503).json({ ok: false });
  }
});

app.get("/api/profile", async (req, res, next) => {
  try {
    const profile = await pool.query("SELECT * FROM profile WHERE id = 1");
    const interests = await pool.query("SELECT title, detail FROM interests ORDER BY sort_order");
    const credentials = await pool.query(
      "SELECT title, provider, dates, detail FROM credentials ORDER BY sort_order"
    );
    if (!profile.rows[0]) {
      res.status(404).json({ error: "Profile is not available yet." });
      return;
    }
    res.json({
      profile: mapProfile(profile.rows[0]),
      interests: interests.rows,
      credentials: credentials.rows,
    });
  } catch (error) {
    next(error);
  }
});

app.get("/api/projects", async (req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT slug, title, summary, status, stack, link_url, link_label, images
       FROM projects ORDER BY sort_order`
    );
    res.json({
      projects: result.rows.map((row) => {
        const images = Array.isArray(row.images) ? row.images : [];
        const cover =
          images.find((image) => image.caption === "Music") ||
          images.find((image) => !image.phone) ||
          images[0] ||
          null;
        return {
          slug: row.slug,
          title: row.title,
          summary: row.summary,
          status: row.status,
          stack: row.stack,
          linkUrl: row.link_url,
          linkLabel: row.link_label,
          cover: cover ? cover.src : null,
          coverPhone: Boolean(cover && cover.phone),
        };
      }),
    });
  } catch (error) {
    next(error);
  }
});

app.get("/api/projects/:slug", async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM projects WHERE slug = $1", [req.params.slug]);
    if (!result.rows[0]) {
      res.status(404).json({ error: "That project is not on this site." });
      return;
    }
    res.json({ project: mapProject(result.rows[0]) });
  } catch (error) {
    next(error);
  }
});

const TOPICS = new Set(["general", "media", "map-your-travels", "other"]);

app.post("/api/contact", contactLimiter, async (req, res, next) => {
  try {
    const payload = req.body || {};
    if (typeof payload.companyWebsite === "string" && payload.companyWebsite.trim()) {
      res.status(201).json({ ok: true });
      return;
    }

    const name = cleanText(payload.name, 80);
    const email = cleanText(payload.email, 120);
    const topic = TOPICS.has(payload.topic) ? payload.topic : "general";
    const body = cleanText(payload.body, 2000);

    if (!name) {
      res.status(400).json({ error: "Enter your name.", field: "name" });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      res.status(400).json({ error: "Enter a valid email address.", field: "email" });
      return;
    }
    if (body.length < 10) {
      res.status(400).json({ error: "Write a note of at least 10 characters.", field: "body" });
      return;
    }

    await pool.query(
      "INSERT INTO messages (name, email, topic, body) VALUES ($1, $2, $3, $4)",
      [name, email, topic, body]
    );
    try {
      await sendContactNote({ name, email, topic, body });
    } catch (error) {
      console.error(error);
      res.status(502).json({
        error: "Your note was saved, but it could not be emailed. Please try again later.",
      });
      return;
    }
    res.status(201).json({ ok: true });
  } catch (error) {
    next(error);
  }
});

app.use(express.static(clientDir));

app.use((req, res, next) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    next();
    return;
  }
  if (req.path.startsWith("/api")) {
    next();
    return;
  }
  res.sendFile(path.join(clientDir, "index.html"), (error) => {
    if (error) {
      next();
    }
  });
});

app.use((req, res) => {
  res.status(404).json({ error: "Not found." });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: "Something went wrong on the server." });
});

function cleanText(value, max) {
  if (typeof value !== "string") {
    return "";
  }
  return value.replace(/\s+/g, " ").trim().slice(0, max);
}

async function start() {
  await ensureSeed(pool);
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Listening on ${port}`);
  });
}

start().catch((error) => {
  console.error(error);
  process.exit(1);
});
