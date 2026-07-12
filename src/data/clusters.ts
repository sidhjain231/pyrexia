export type Cluster = {
  name: string;
  tag: string;
};

// The eleven event clusters of PYREXIA, from the 2025 brochure.
// The 2026 lineup swaps in here once the team confirms it.
export const clusters: Cluster[] = [
  { name: "Fahrenheit", tag: "The opening ceremony" },
  { name: "Chorea", tag: "Dance extravaganza" },
  { name: "Sinfonia", tag: "The vocal symphony" },
  { name: "Thespians", tag: "The theatre syndicate" },
  { name: "Littmania", tag: "The storytellers' guild" },
  { name: "Kalakriti", tag: "The artistry alliance" },
  { name: "Velocity", tag: "Epic sports showdown" },
  { name: "Alfresco", tag: "The informals fun frenzy" },
  { name: "Thunderbolt", tag: "The e-gaming galore" },
  { name: "Chronos", tag: "Mr & Ms Pyrexia" },
  { name: "Auriga", tag: "The star nights" },
];
