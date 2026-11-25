// Have You Tried Turning It Off? — entry program (program/v1, Node 22,
// stdlib only).
//
// The whole entry is one funny line a hopeless tech support agent gives a
// desperate customer. The grader runs this program and then reads
// <output>/entry.txt, so this program writes the line there,
// byte-identically on every run.
//
// Line candidates drafted for this entry (each a single line, under the
// 199-character gate):
//   1. "Let's turn it off and on again — not because I know what's wrong,
//       but because in ten seconds of silence we both get to pretend
//       it's fixable."
//   2. "I completely understand it's urgent — so let's turn it off and on
//       again, and if that fails, I'll escalate it to the part of me
//       that Googles faster."
//   3. "Turn it off, count to ten, turn it back on — and if it still
//       won't start, count slower; that's the advanced version."
//   4. "I know your presentation starts in five minutes, so turn it off,
//       count to ten, turn it back on — and if that fails, count slower;
//       that's the advanced fix, and honestly most of my training."
//
// Candidate 4 wins: the deadline makes the customer's desperation felt
// without explaining it, the line still sounds like something a real
// support agent would actually say, and it twists the classic reboot
// twice — counting slower is the "advanced fix", and the agent cheerfully
// admits that is most of his training, so the uselessness is his, never
// the customer's. Candidate 3 had the same core twist but no stakes;
// candidate 2's Google joke is fresher-sounding but more stock; candidate
// 1 is wistful rather than a line an agent would say out loud.
//
// The output directory is /output inside the grader; anywhere else,
// MAKEFUN_OUTPUT_DIR names the stand-in folder:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// This file's own directory, resolved from import.meta.url — never the
// process working directory, so the program behaves the same from any cwd.
// The line is a constant in this file, so nothing is read at run time;
// `here` is resolved only to prove the program never depends on the cwd.
const here = dirname(fileURLToPath(import.meta.url));
if (here === '') throw new Error('cannot resolve program location');

// Revision pass: candidate 4 was tightened before finalising — the
// opening "I know" was cut (the deadline already shows the agent heard
// the customer), which makes the line land faster on a first read while
// keeping both twists intact.
const LINE =
  "Your presentation starts in five minutes, so turn it off, count to ten, turn it back on — and if that fails, count slower; that's the advanced fix, and honestly, most of my training.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outDir, { recursive: true });

// Clear only the CONTENTS of the output directory, never the directory
// itself, so a stale file from an earlier run can never leak through.
for (const name of readdirSync(outDir)) {
  rmSync(join(outDir, name), { recursive: true, force: true });
}

writeFileSync(join(outDir, 'entry.txt'), LINE, 'utf8');
