const crypto = require("crypto");
const pageMeta = require("../client/src/page-meta.json");

const CANONICAL_ORIGIN = "https://www.jeffripke.com";
const PORTRAIT = `${CANONICAL_ORIGIN}/jeff-ripke.jpg`;

const homeJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: "Jeff Ripke",
      url: `${CANONICAL_ORIGIN}/`,
      jobTitle: "Full-stack web developer",
      image: PORTRAIT,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Coeur d'Alene",
        addressRegion: "Idaho",
        addressCountry: "US",
      },
      sameAs: [
        "https://www.linkedin.com/in/jeffripke/",
        "https://github.com/jripke74",
        "https://www.ripkemedia.com",
      ],
    },
    {
      "@type": "WebSite",
      name: "Jeff Ripke",
      url: `${CANONICAL_ORIGIN}/`,
    },
  ],
}).replace(/</g, "\\u003c");

const jsonLdScriptSrc = `'sha256-${crypto.createHash("sha256").update(homeJsonLd).digest("base64")}'`;

const STATIC_PATHS = Object.keys(pageMeta);

function normalizePath(path) {
  if (path.length > 1 && path.endsWith("/")) {
    return path.slice(0, -1);
  }
  return path;
}

async function describePage(pool, path) {
  const pathname = normalizePath(path);
  if (pageMeta[pathname]) {
    return {
      ...pageMeta[pathname],
      pathname,
      image: PORTRAIT,
      card: "summary",
      jsonLd: pathname === "/" ? homeJsonLd : "",
    };
  }

  const match = pathname.match(/^\/projects\/([a-z0-9-]+)$/);
  if (!match) {
    return null;
  }

  const result = await pool.query("SELECT title, summary, images FROM projects WHERE slug = $1", [
    match[1],
  ]);
  const project = result.rows[0];
  if (!project) {
    return null;
  }

  const images = Array.isArray(project.images) ? project.images : [];
  const cover =
    images.find((image) => image.caption === "Music") ||
    images.find((image) => !image.phone) ||
    images[0] ||
    null;

  return {
    title: `${project.title} | Jeff Ripke`,
    description: project.summary,
    pathname,
    image: cover ? absoluteUrl(cover.src) : PORTRAIT,
    card: cover && !cover.phone ? "summary_large_image" : "summary",
    jsonLd: "",
  };
}

function notFoundPage(path) {
  return {
    title: "Page not found | Jeff Ripke",
    description: "That address is not part of this site.",
    pathname: normalizePath(path),
    image: PORTRAIT,
    card: "summary",
    jsonLd: "",
    noindex: true,
  };
}

function renderDocument(html, page) {
  const title = escapeHtml(page.title);
  const description = escapeHtml(page.description);
  const canonical = escapeHtml(`${CANONICAL_ORIGIN}${page.pathname}`);
  const image = escapeHtml(page.image);
  let next = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
  next = next.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${description}" />`
  );
  const tags = [
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="Jeff Ripke" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta name="twitter:card" content="${page.card}" />`,
    page.noindex ? `<meta name="robots" content="noindex" />` : "",
    page.jsonLd ? `<script type="application/ld+json">${page.jsonLd}</script>` : "",
  ]
    .filter(Boolean)
    .join("\n    ");
  return next.replace("</head>", `    ${tags}\n  </head>`);
}

async function renderSitemap(pool) {
  const projects = await pool.query("SELECT slug FROM projects ORDER BY sort_order");
  const paths = [
    ...STATIC_PATHS,
    ...projects.rows.map((row) => `/projects/${row.slug}`),
  ];
  const urls = paths
    .map((path) => `  <url><loc>${escapeHtml(`${CANONICAL_ORIGIN}${path}`)}</loc></url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function absoluteUrl(src) {
  if (src.startsWith("https://")) {
    return src;
  }
  return `${CANONICAL_ORIGIN}${src.startsWith("/") ? src : `/${src}`}`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

module.exports = {
  describePage,
  jsonLdScriptSrc,
  notFoundPage,
  renderDocument,
  renderSitemap,
};
