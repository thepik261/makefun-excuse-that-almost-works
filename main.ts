// The Excuse That Almost Works — make.fun entry.
//
// Writes one line, at most 140 characters: the excuse a gamer texts the
// boss to skip work on GTA 6 launch week. The joke grows out of the
// excuse's own boring detail — a lift replacement trapping the sender
// on the 14th floor — instead of a stock excuse like a dead grandmother
// or a sudden fever. Pure Node standard library; deterministic;
// no network, no input.
//
// Verified: 17 words, 88 characters, one line, ends with a full stop —
// inside the gate (1–140 characters, at most 20 words) with room to spare.
import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

const EXCUSE =
  "Sorry, our building is replacing the lift today and I'm stuck on the 14th floor until 4.";

if ([...EXCUSE].length < 1 || [...EXCUSE].length > 140) {
  throw new Error(
    `excuse must be 1-140 characters, got ${[...EXCUSE].length}`,
  );
}
if (EXCUSE.split(/\s+/).filter(Boolean).length > 20) {
  throw new Error("excuse must be at most 20 words");
}
if (EXCUSE.includes("\n")) {
  throw new Error("excuse must be a single line");
}
if (!/\S/.test(EXCUSE)) {
  throw new Error("excuse must not be only white space");
}
if (EXCUSE !== EXCUSE.trim()) {
  throw new Error("excuse must not start or end with white space");
}
if (!/[.!?]$/.test(EXCUSE)) {
  throw new Error(
    "excuse must end with terminal punctuation so it lands as one line",
  );
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", EXCUSE, "utf8");
chmodSync("/output/entry.txt", 0o644);

// Read back what was written: the gate rejects anything that is not
// 1-140 characters of UTF-8 text, so fail loudly here instead.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== EXCUSE) {
  throw new Error("entry.txt does not match the excuse");
}
