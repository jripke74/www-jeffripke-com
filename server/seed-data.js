const SEED_VERSION = 8;

const profile = {
  id: 1,
  fullName: "Jeff Ripke",
  location: "Coeur d'Alene, Idaho",
  headline: "Full-stack web developer.",
  summary:
    "I build web applications and iOS apps. This site is the record of that software work. Ripke Media, my media center, lives at ripkemedia.com.",
  linkedinUrl: "https://www.linkedin.com/in/jeffripke/",
  githubUrl: "https://github.com/jripke74",
  mediaUrl: "https://www.ripkemedia.com",
};

const credentials = [
  {
    id: 1,
    title: "Full Stack Web Development Certification",
    provider: "freeCodeCamp",
    dates: "2016 – 2017",
    detail: "Front-end and back-end web development coursework.",
    sortOrder: 1,
  },
  {
    id: 2,
    title: "Programming nanodegrees",
    provider: "Udacity",
    dates: "2015 – 2019",
    detail: "Includes Beginning iOS App Development in 2015–2016.",
    sortOrder: 2,
  },
  {
    id: 3,
    title: "M001: MongoDB Basics",
    provider: "MongoDB University",
    dates: null,
    detail: "Database coursework listed on my LinkedIn profile.",
    sortOrder: 3,
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
      "Sign-in is an email address and password, followed by a one-time code sent to that inbox. Passwords and codes are stored as hashes. Sign in with Apple is built in and is used when the Apple credentials are configured. A reset link can be emailed, and each login is a server session that can be signed out from other devices.",
      "The public site is www.ripkemedia.com. Library files stay on my home storage. This portfolio only points to that work.",
    ].join("\n\n"),
    status: "In progress",
    stack: ["Node.js", "Express", "PostgreSQL", "Heroku"],
    linkUrl: "https://www.ripkemedia.com",
    linkLabel: "Open Ripke Media",
    images: [
      {
        src: "/ripke-media-sign-in.png",
        alt: "Ripke Media sign-in page with Sign in with Apple, email, password, forgot password, and create an account.",
        caption: "Sign in",
        width: 1024,
        height: 584,
      },
      {
        src: "/ripke-media-search.png",
        alt: "Ripke Media library search showing four AC/DC titles.",
        caption: "Search",
        width: 1024,
        height: 602,
      },
      {
        src: "/ripke-media-music.jpg",
        alt: "Ripke Media music library, an album grid that can be sorted A to Z, by year, or by newest.",
        caption: "Music",
        width: 1024,
        height: 666,
      },
      {
        src: "/ripke-media-movie.jpg",
        alt: "Ripke Media movie page with the poster, favorites, play disc, and a preview player.",
        caption: "Movie",
        width: 1024,
        height: 1013,
      },
      {
        src: "/ripke-media-phone.png",
        alt: "Ripke Media search on a phone at ripkemedia.com.",
        caption: "Search on a phone",
        width: 472,
        height: 1024,
        phone: true,
      },
    ],
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
    ].join("\n\n"),
    status: "In progress",
    stack: ["Swift", "SwiftUI", "iOS"],
    linkUrl: null,
    linkLabel: null,
    images: [
      {
        src: "/map-your-travels-record.png",
        alt: "Map Your Travels record screen, watching for the next trip on a map with distance, time, and turns.",
        caption: "Record screen",
        width: 472,
        height: 1024,
        phone: true,
      },
      {
        src: "/map-your-travels-trips.png",
        alt: "Map Your Travels trips screen, listing saved routes with distance, time, and a button to mail each trip.",
        caption: "Trips screen",
        width: 472,
        height: 1024,
        phone: true,
      },
    ],
    sortOrder: 2,
  },
  {
    id: 3,
    slug: "this-website",
    title: "jeffripke.com",
    summary:
      "This portfolio. React on the front, Node.js and PostgreSQL behind it, hosted on Heroku.",
    body: [
      "www.jeffripke.com and www.ripkeenterprises.com both serve this site. The pages are a React application. Express reads the projects from PostgreSQL and accepts notes through the contact form.",
      "The layout starts from a phone screen. On a small screen the sections sit in a hamburger menu. On a wider screen the same links stay in the header. Text, contrast, focus, labels, and keyboard use follow the Web Content Accessibility Guidelines.",
      "An earlier version of this repository was a single Express page with a short reading project and a media form. This version replaces that page with the portfolio.",
    ].join("\n\n"),
    status: "Current",
    stack: ["React", "Node.js", "Express", "PostgreSQL", "Heroku"],
    linkUrl: null,
    linkLabel: null,
    images: [],
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
    detail: "Planning routes and keeping track of drives.",
    sortOrder: 2,
  },
  {
    id: 3,
    title: "Hiking, photography, and coins",
    detail: "Time outside, pictures from those trips, and a coin collection.",
    sortOrder: 3,
  },
];

module.exports = {
  SEED_VERSION,
  profile,
  credentials,
  projects,
  interests,
};
