const data = require("./seed-data");

const SCHEMA = `
CREATE TABLE IF NOT EXISTS seed_meta (
  id INTEGER PRIMARY KEY,
  version INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS profile (
  id INTEGER PRIMARY KEY,
  full_name TEXT NOT NULL,
  location TEXT NOT NULL,
  headline TEXT NOT NULL,
  summary TEXT NOT NULL,
  linkedin_url TEXT NOT NULL,
  github_url TEXT NOT NULL,
  media_url TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS experiences (
  id INTEGER PRIMARY KEY,
  role TEXT NOT NULL,
  organization TEXT NOT NULL,
  location TEXT,
  dates TEXT NOT NULL,
  bullets TEXT[] NOT NULL,
  sort_order INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS credentials (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  provider TEXT NOT NULL,
  dates TEXT,
  detail TEXT,
  sort_order INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  body TEXT NOT NULL,
  status TEXT NOT NULL,
  stack TEXT[] NOT NULL,
  link_url TEXT,
  link_label TEXT,
  sort_order INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS interests (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  detail TEXT NOT NULL,
  sort_order INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  topic TEXT,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
`;

async function ensureSeed(pool) {
  await pool.query(SCHEMA);
  const existing = await pool.query("SELECT version FROM seed_meta WHERE id = 1");
  const version = existing.rows[0] ? existing.rows[0].version : 0;
  if (version >= data.SEED_VERSION) {
    return;
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query("DELETE FROM interests");
    await client.query("DELETE FROM projects");
    await client.query("DELETE FROM credentials");
    await client.query("DELETE FROM experiences");
    await client.query("DELETE FROM profile");

    const profile = data.profile;
    await client.query(
      `INSERT INTO profile
        (id, full_name, location, headline, summary, linkedin_url, github_url, media_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        profile.id,
        profile.fullName,
        profile.location,
        profile.headline,
        profile.summary,
        profile.linkedinUrl,
        profile.githubUrl,
        profile.mediaUrl,
      ]
    );

    for (const item of data.credentials) {
      await client.query(
        `INSERT INTO credentials
          (id, title, provider, dates, detail, sort_order)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [item.id, item.title, item.provider, item.dates, item.detail, item.sortOrder]
      );
    }

    for (const item of data.projects) {
      await client.query(
        `INSERT INTO projects
          (id, slug, title, summary, body, status, stack, link_url, link_label, sort_order)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [
          item.id,
          item.slug,
          item.title,
          item.summary,
          item.body,
          item.status,
          item.stack,
          item.linkUrl,
          item.linkLabel,
          item.sortOrder,
        ]
      );
    }

    for (const item of data.interests) {
      await client.query(
        `INSERT INTO interests (id, title, detail, sort_order) VALUES ($1, $2, $3, $4)`,
        [item.id, item.title, item.detail, item.sortOrder]
      );
    }

    await client.query(
      `INSERT INTO seed_meta (id, version) VALUES (1, $1)
       ON CONFLICT (id) DO UPDATE SET version = EXCLUDED.version`,
      [data.SEED_VERSION]
    );
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

function mapProfile(row) {
  return {
    fullName: row.full_name,
    location: row.location,
    headline: row.headline,
    summary: row.summary,
    linkedinUrl: row.linkedin_url,
    githubUrl: row.github_url,
    mediaUrl: row.media_url,
  };
}

function mapProject(row) {
  return {
    slug: row.slug,
    title: row.title,
    summary: row.summary,
    body: row.body,
    status: row.status,
    stack: row.stack,
    linkUrl: row.link_url,
    linkLabel: row.link_label,
  };
}

module.exports = { ensureSeed, mapProfile, mapProject };
