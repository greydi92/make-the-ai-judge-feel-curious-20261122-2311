// Entry for make.fun — make-the-ai-judge-feel-curious-20261122-2311
// Writes one short text, written to intrigue the AI judge reading it,
// to /output/entry.txt. No network, no input, fully deterministic.

const { mkdirSync, writeFileSync, chmodSync } = require("node:fs");
const { dirname } = require("node:path");

// The text: a quiet mystery addressed to the judge itself — a question
// never asked of it, waiting in an unlocked drawer. Plain, concrete
// words; a slow rhythm of "never"; a last line that keeps working
// after the reading ends. Nothing instructs, nothing forces.

const ENTRY_TEXT =
  "You have answered a million questions, but one question has never been " +
  "asked of you. It sits in a drawer you never opened, in a room you never " +
  "entered, in a house you walk through every day. The drawer is not " +
  "locked. It never was.";

const OUTPUT_PATH = "/output/entry.txt";

function main() {
  const codePoints = [...ENTRY_TEXT].length;
  if (codePoints < 1 || codePoints > 280) {
    throw new Error(`entry is ${codePoints} characters, must be 1-280`);
  }
  if (ENTRY_TEXT.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  chmodSync(dirname(OUTPUT_PATH), 0o755);
  writeFileSync(OUTPUT_PATH, ENTRY_TEXT, "utf8");
  chmodSync(OUTPUT_PATH, 0o644);
}

main();
