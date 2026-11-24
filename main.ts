// The Funniest Toaster Error Message — make.fun entry.
// Writes one line (the toaster's error message) to /output/entry.txt.
// Output dir comes from $MAKEFUN_OUTPUT_DIR, default /output.

import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE = "Heating element unresponsive. It knows what it did.";

// Gate self-check: the sealed scorer only judges UTF-8 text of
// 1-120 characters that is not only whitespace. Fail loudly here
// rather than ship an entry the gate would silently zero.
const chars = [...LINE].length;
if (chars < 1 || chars > 120 || LINE.trim().length === 0) {
  throw new Error(`entry text fails the gate: ${chars} characters`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });

// Clear only the CONTENTS of the output dir, never the dir itself:
// the grader may hand us a read-only parent with a fixed /output.
for (const name of readdirSync(outDir)) {
  rmSync(join(outDir, name), { recursive: true, force: true });
}

writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
