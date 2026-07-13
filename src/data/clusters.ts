export type Cluster = {
  slug: string;
  name: string;
  domain: string;
  tag: string;
  hue: string;
  image?: string;
  imageAlt?: string;
  /** Longer chart entry for the cluster detail page. */
  description: string;
};

// The eleven event clusters of PYREXIA, from the 2025 brochure.
// The 2026 lineup swaps in here once the team confirms it.
export const clusters: Cluster[] = [
  {
    slug: "fahrenheit",
    description:
      "The ceremonial ignition. Lamp, oath and the first roar of the crowd — the moment the campus officially runs a temperature. Everything after this is symptomatic.",
    name: "Fahrenheit",
    domain: "Opening ceremony",
    tag: "Where the fever officially begins",
    hue: "#f2c14e",
  },
  {
    slug: "chorea",
    description:
      "Named for the involuntary movement disorder, because that is what a good beat does. Classical, contemporary, street and group formats across the week, judged loud and celebrated louder.",
    name: "Chorea",
    domain: "Dance",
    tag: "Classical, street, western. The floor never cools",
    hue: "#ff4d6d",
    image: "/images/gallery-05.jpg",
    imageAlt: "Nritya Sangam folk dancers in full colour on the Pyrexia stage",
  },
  {
    slug: "sinfonia",
    description:
      "Battle of bands, solo vocals, instrumental duels and rap cyphers. From raag to riff, Sinfonia is where the fest finds its soundtrack.",
    name: "Sinfonia",
    domain: "Music",
    tag: "Battle of bands, rap battles, the vocal symphony",
    hue: "#b3a6ff",
    image: "/images/hero-stage.jpg",
    imageAlt: "Live band performing under stage lights and flames",
  },
  {
    slug: "thespians",
    description:
      "Stage play, street play, mime and stand-up. The theatre syndicate holds up a mirror — sometimes it makes you laugh, sometimes it leaves a bruise.",
    name: "Thespians",
    domain: "Theatre",
    tag: "Stand-up, mime, nukkad natak. The theatre syndicate",
    hue: "#e0405e",
    image: "/images/gallery-02.jpg",
    imageAlt: "Theatre performers in black, mid-act by candlelight",
  },
  {
    slug: "velocity",
    description:
      "Cricket under lights, football, basketball, volleyball, badminton, chess and athletics. Med schools travel far to settle old scores here.",
    name: "Velocity",
    domain: "Sports",
    tag: "Cricket to chess. The epic sports showdown",
    hue: "#e05299",
    image: "/images/gallery-04.jpg",
    imageAlt: "Volleyball spike at the net in front of a packed crowd",
  },
  {
    slug: "littmania",
    description:
      "Debates, quizzes, JAM, poetry slams and creative writing. Sharp tongues, sharper arguments — the storytellers' guild in full session.",
    name: "Littmania",
    domain: "Literary",
    tag: "Debates, poetry, quizzes. The storytellers' guild",
    hue: "#8b5cf6",
  },
  {
    slug: "kalakriti",
    description:
      "Canvas, clay, mehendi, rangoli and coffee-paint. The artistry alliance turns corridors into galleries over five days.",
    name: "Kalakriti",
    domain: "Fine arts",
    tag: "Paint, clay, coffee and canvas. The artistry alliance",
    hue: "#ff8fa3",
  },
  {
    slug: "alfresco",
    description:
      "The informal circuit: treasure hunts, squid game, date nights, karaoke and everything that happens between the scheduled events. No trophies, maximum stories.",
    name: "Alfresco",
    domain: "Informals",
    tag: "Squid game to date nights. The fun frenzy",
    hue: "#f7b2ad",
    image: "/images/gallery-01.jpg",
    imageAlt: "Canopy of transparent umbrellas over the fest entrance",
  },
  {
    slug: "thunderbolt",
    description:
      "BGMI, Valorant, FIFA, Tekken and chess.com blitz. LAN energy, packed brackets and the only cluster played sitting down.",
    name: "Thunderbolt",
    domain: "E-gaming",
    tag: "BGMI, FIFA, Tekken. The e-gaming galore",
    hue: "#7c5cff",
  },
  {
    slug: "chronos",
    description:
      "The hunt for Mr & Ms Pyrexia — rounds of talent, wit and stage presence across the week, crowned on the final night.",
    name: "Chronos",
    domain: "Personality",
    tag: "The hunt for Mr & Ms Pyrexia",
    hue: "#ff5fa2",
  },
  {
    slug: "auriga",
    description:
      "The star nights. National headliners on the big stage, the reason half the crowd buys the pass. Lineup sealed until the reveal.",
    name: "Auriga",
    domain: "Star nights",
    tag: "The headliners. The big stage. The reason you stay",
    hue: "#ffd166",
  },
];
