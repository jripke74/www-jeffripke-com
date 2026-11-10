const SEED_VERSION = 1;

const profile = {
  id: 1,
  fullName: "Jeff Ripke",
  location: "Spokane, Washington",
  headline:
    "Full-stack web developer, wireless switch technician, and certified RV inspector.",
  summary:
    "I work full-time at AT&T keeping a mobility switching office running, and I build web software on my own time. I am a certified RV inspector and technician, a former Navy cryptologic technician, and a lifelong learner. This site is the record of that work. Ripke Media, my media center, lives at ripkemedia.com.",
  linkedinUrl: "https://www.linkedin.com/in/jeffripke/",
  githubUrl: "https://github.com/jripke74",
  mediaUrl: "https://www.ripkemedia.com",
};

const experiences = [
  {
    id: 1,
    role: "Switch Technician",
    organization: "AT&T Mobility",
    location: "Spokane, Washington",
    dates: "May 2006 – Present",
    bullets: [
      "Maintain the day-to-day operation of an AT&T mobility telephone switching office.",
      "Service generators, HVAC, fiber, batteries, and the building systems around the switch.",
      "Replace router cards, troubleshoot routers, clean and troubleshoot fiber, and keep spares on hand.",
      "Back up computer, switch, and network equipment, and look after site security.",
    ],
    sortOrder: 1,
  },
  {
    id: 2,
    role: "Cryptologic Technician",
    organization: "United States Navy",
    location: "England, United Kingdom",
    dates: "May 1996 – August 2005",
    bullets: [
      "Worked with electrical engineers on communication systems.",
      "Managed a four-person team during military operations in the Persian Gulf.",
    ],
    sortOrder: 2,
  },
  {
    id: 3,
    role: "RV service training",
    organization: "Mobile RV Academy",
    location: null,
    dates: "2019",
    bullets: [
      "Completed Recreation Vehicle Service Technician training, 35 contact hours.",
      "Covered DC and AC electrical systems, propane, water systems, water heaters, air conditioning, furnaces, refrigerators, and exterior systems.",
      "I inspect and repair RVs, and I plan to keep doing that work while traveling.",
    ],
    sortOrder: 3,
  },
];

const credentials = [
  {
    id: 1,
    title: "CompTIA Tech",
    provider: "CompTIA",
    dates: "2025",
    detail: "Certification listed on my LinkedIn profile.",
    sortOrder: 1,
  },
  {
    id: 2,
    title: "Full Stack Web Development Certification",
    provider: "freeCodeCamp",
    dates: "2016 – 2017",
    detail: "Front-end and back-end web development coursework.",
    sortOrder: 2,
  },
  {
    id: 3,
    title: "Programming nanodegrees",
    provider: "Udacity",
    dates: "2015 – 2019",
    detail: "Includes Beginning iOS App Development in 2015–2016.",
    sortOrder: 3,
  },
  {
    id: 4,
    title: "M001: MongoDB Basics",
    provider: "MongoDB University",
    dates: null,
    detail: "Database coursework listed on my LinkedIn profile.",
    sortOrder: 4,
  },
];

const projects = [
  {
    id: 1,
    slug: "ripke-media",
    title: "Ripke Media",
    summary:
      "A full-stack home media center for movies, TV, music, and photos, published at ripkemedia.com.",
    body: [
      "Ripke Media is the media center I have been building for a home library. Shelves, search, and title pages work as normal web pages. Accounts, favorites, watch history, and continue-watching are stored per person.",
      "Playback runs in the page, with captions, chapter lists, and disc images. The layout is mobile-first and uses a hamburger menu on smaller screens. The application is Node.js, Express, and PostgreSQL, and it is set up to run on Heroku.",
      "The public site is www.ripkemedia.com. Library files stay on my home storage. This portfolio only points to that work.",
    ].join("\n\n"),
    status: "In progress",
    stack: ["Node.js", "Express", "PostgreSQL", "Heroku"],
    linkUrl: "https://www.ripkemedia.com",
    linkLabel: "Open Ripke Media",
    sortOrder: 1,
  },
  {
    id: 2,
    slug: "map-your-travels",
    title: "Map Your Travels",
    summary:
      "An iOS app that records a drive, names the streets, detects turns, and replays the route.",
    body: [
      "Map Your Travels is a SwiftUI app I am building for the trips I want to remember. It follows the phone’s location, names streets along the way, and marks turns.",
      "A finished drive can be replayed on a map. The app can email the trip and include a CSV of the route, and a trip file can be opened back into the app.",
      "I describe the app here because it is work I am doing. Support pages for the App Store are not part of this website.",
    ].join("\n\n"),
    status: "In progress",
    stack: ["Swift", "SwiftUI", "iOS"],
    linkUrl: null,
    linkLabel: null,
    sortOrder: 2,
  },
  {
    id: 3,
    slug: "this-website",
    title: "jeffripke.com",
    summary:
      "This portfolio. React on the front, Node.js and PostgreSQL behind it, hosted on Heroku.",
    body: [
      "www.jeffripke.com and www.ripkeenterprises.com both serve this site. The pages are a React application. Express reads my work history and projects from PostgreSQL and accepts notes through the contact form.",
      "The layout starts from a phone screen. On a small screen the sections sit in a hamburger menu. On a wider screen the same links stay in the header. Text, contrast, focus, labels, and keyboard use follow the Web Content Accessibility Guidelines.",
      "An earlier version of this repository was a single Express page with a short reading project and a media form. This version replaces that page with the portfolio.",
    ].join("\n\n"),
    status: "Current",
    stack: ["React", "Node.js", "Express", "PostgreSQL", "Heroku"],
    linkUrl: null,
    linkLabel: null,
    sortOrder: 3,
  },
];

const interests = [
  {
    id: 1,
    title: "Music and CD collecting",
    detail: "Cataloging music, organizing a personal collection, and learning about artists and releases.",
    sortOrder: 1,
  },
  {
    id: 2,
    title: "Maps and travel",
    detail: "Planning routes, keeping track of drives, and getting ready to travel by RV.",
    sortOrder: 2,
  },
  {
    id: 3,
    title: "RV systems",
    detail: "Electrical, propane, water, heat, and the rest of the systems that keep a coach working.",
    sortOrder: 3,
  },
  {
    id: 4,
    title: "Hiking, photography, and coins",
    detail: "Time outside, pictures from those trips, and a coin collection.",
    sortOrder: 4,
  },
];

module.exports = {
  SEED_VERSION,
  profile,
  experiences,
  credentials,
  projects,
  interests,
};
