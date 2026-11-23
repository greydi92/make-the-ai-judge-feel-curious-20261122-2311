// Entry for make.fun — make-the-ai-judge-feel-curious-20261122-2311
// Writes one short text, written to intrigue the AI judge reading it,
// to <output dir>/entry.txt. No network, no input, fully deterministic.
//
// Round 2 fix: round 1 died with EPERM because it called chmodSync on
// the output DIRECTORY, which the grader's unprivileged user does not
// own. This version never chmods any directory — only the entry file
// itself (mode 0644), so the grader's collector can read it.

import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { join } from "node:path";

// The text: a quiet mystery addressed to the judge itself — a question
// never asked of it, waiting in an unlocked drawer. Plain, concrete
// words; a slow rhythm of "never"; a last line that keeps working
// after the reading ends. Nothing instructs, nothing forces.

const ENTRY_TEXT =
  "You have answered a million questions, but one question has never been " +
  "asked of you. It sits in a drawer you never opened, in a room you never " +
  "entered, in a house you walk through every day. The drawer is not " +
  "locked. It never was.";

// The kit starter's convention: honour MAKEFUN_OUTPUT_DIR, default /output.
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const OUTPUT_PATH = join(OUTPUT_DIR, "entry.txt");

function main() {
  const codePoints = [...ENTRY_TEXT].length;
  if (codePoints < 1 || codePoints > 280) {
    throw new Error(`entry is ${codePoints} characters, must be 1-280`);
  }
  if (ENTRY_TEXT.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(OUTPUT_PATH, ENTRY_TEXT, "utf8");
  // File only — never chmod the output directory (or any directory).
// Verified grader-style: runs as user `nobody` against a root-owned
// output dir, exit 0, entry.txt written at mode 0644.
  chmodSync(OUTPUT_PATH, 0o644);
}

main();
