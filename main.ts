import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Entry for make.fun bounty "Invent a Word We Need".
// A single new English word plus a one-line definition (1-140 chars).
const ENTRY = "Doorlapse: walking into a room and forgetting why you went in.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

const length = [...ENTRY].length;
if (length < 1 || length > 140) {
  throw new Error(`entry must be 1-140 characters, got ${length}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}

mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

const roundTrip = readFileSync(outPath, "utf8");
if (roundTrip !== ENTRY) {
  throw new Error("round-trip check failed: entry.txt does not match");
}
console.log(`Wrote entry.txt (${length} chars)`);
