export type Cluster = {
  slug: string;
  name: string;
  domain: string;
  tag: string;
  hue: string;
  image?: string;
  imageAlt?: string;
};

// The eleven event clusters of PYREXIA, from the 2025 brochure.
// The 2026 lineup swaps in here once the team confirms it.
export const clusters: Cluster[] = [
  {
    slug: "fahrenheit",
    name: "Fahrenheit",
    domain: "Opening ceremony",
    tag: "Where the fever officially begins",
    hue: "#f2c14e",
  },
  {
    slug: "chorea",
    name: "Chorea",
    domain: "Dance",
    tag: "Classical, street, western. The floor never cools",
    hue: "#ff4d6d",
    image: "/images/gallery-05.jpg",
    imageAlt: "Nritya Sangam folk dancers in full colour on the Pyrexia stage",
  },
  {
    slug: "sinfonia",
    name: "Sinfonia",
    domain: "Music",
    tag: "Battle of bands, rap battles, the vocal symphony",
    hue: "#b3a6ff",
    image: "/images/hero-stage.jpg",
    imageAlt: "Live band performing under stage lights and flames",
  },
  {
    slug: "thespians",
    name: "Thespians",
    domain: "Theatre",
    tag: "Stand-up, mime, nukkad natak. The theatre syndicate",
    hue: "#e0405e",
    image: "/images/gallery-02.jpg",
    imageAlt: "Theatre performers in black, mid-act by candlelight",
  },
  {
    slug: "velocity",
    name: "Velocity",
    domain: "Sports",
    tag: "Cricket to chess. The epic sports showdown",
    hue: "#e05299",
    image: "/images/gallery-04.jpg",
    imageAlt: "Volleyball spike at the net in front of a packed crowd",
  },
  {
    slug: "littmania",
    name: "Littmania",
    domain: "Literary",
    tag: "Debates, poetry, quizzes. The storytellers' guild",
    hue: "#8b5cf6",
  },
  {
    slug: "kalakriti",
    name: "Kalakriti",
    domain: "Fine arts",
    tag: "Paint, clay, coffee and canvas. The artistry alliance",
    hue: "#ff8fa3",
  },
  {
    slug: "alfresco",
    name: "Alfresco",
    domain: "Informals",
    tag: "Squid game to date nights. The fun frenzy",
    hue: "#f7b2ad",
    image: "/images/gallery-01.jpg",
    imageAlt: "Canopy of transparent umbrellas over the fest entrance",
  },
  {
    slug: "thunderbolt",
    name: "Thunderbolt",
    domain: "E-gaming",
    tag: "BGMI, FIFA, Tekken. The e-gaming galore",
    hue: "#7c5cff",
  },
  {
    slug: "chronos",
    name: "Chronos",
    domain: "Personality",
    tag: "The hunt for Mr & Ms Pyrexia",
    hue: "#ff5fa2",
  },
  {
    slug: "auriga",
    name: "Auriga",
    domain: "Star nights",
    tag: "The headliners. The big stage. The reason you stay",
    hue: "#ffd166",
  },
];
