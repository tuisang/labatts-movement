import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data-athlete");

const FOLDERS = ["programs", "policies", "safety"];

const FOLDER_KEYWORDS: Record<string, string[]> = {
  programs: [
    "program", "session", "class", "training", "vertical", "jump", "plyo",
    "plyometric", "agility", "sprint", "speed", "balance", "coordination",
    "consultation", "custom", "price", "cost", "duration", "how long",
    "equipment", "age", "kids", "children",
  ],
  policies: [
    "policy", "book", "booking", "pay", "payment", "fee", "mpesa", "m-pesa",
    "cash", "cancel", "cancellation", "reschedule", "refund", "confirm",
    "confirmation", "school", "institution", "partnership", "contract",
  ],
  safety: [
    "safety", "safe", "injury", "hurt", "pain", "warm up", "warmup",
    "surface", "risk", "danger", "supervise", "supervision", "age appropriate",
  ],
};

function readFile(folder: string, file: string): string {
  const filePath = path.join(DATA_DIR, folder, file);
  if (!fs.existsSync(filePath)) return "";
  const content = fs.readFileSync(filePath, "utf-8").trim();
  const label = file.replace(".md", "").replace(/-/g, " ");
  return `## ${label}\n${content}`;
}

function getAllFilesInFolder(folder: string): string[] {
  const folderPath = path.join(DATA_DIR, folder);
  if (!fs.existsSync(folderPath)) return [];
  return fs.readdirSync(folderPath).filter((f) => f.endsWith(".md"));
}

function matchesQuery(filename: string, query: string): boolean {
  const name = filename.replace(".md", "").replace(/-/g, " ").toLowerCase();
  const words = name.split(" ");
  return words.some((w) => w.length > 3 && query.includes(w));
}

export function loadRelevantAthleteData(userMessage: string): string {
  const query = userMessage.toLowerCase();
  const sections: string[] = [];

  const relevantFolders = FOLDERS.filter((folder) => {
    const keywords = FOLDER_KEYWORDS[folder] ?? [];
    return keywords.some((kw) => query.includes(kw.toLowerCase()));
  });

  const foldersToSearch = relevantFolders.length > 0 ? relevantFolders : ["programs", "policies"];

  for (const folder of foldersToSearch) {
    const files = getAllFilesInFolder(folder);
    let matched = files.filter((f) => matchesQuery(f, query));
    if (matched.length === 0) matched = files;

    const content = matched
      .map((f) => readFile(folder, f))
      .filter(Boolean)
      .join("\n\n");

    if (content) {
      sections.push(`# ${folder.toUpperCase()}\n\n${content}`);
    }
  }

  return sections.join("\n\n---\n\n");
}

export function loadAllAthleteData(): string {
  return FOLDERS.map((folder) => {
    const files = getAllFilesInFolder(folder);
    const content = files
      .map((f) => readFile(folder, f))
      .filter(Boolean)
      .join("\n\n");
    if (!content) return "";
    return `# ${folder.toUpperCase()}\n\n${content}`;
  })
    .filter(Boolean)
    .join("\n\n---\n\n");
}
