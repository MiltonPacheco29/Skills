#!/usr/bin/env node
// Valida todas las skills en skills/*/SKILL.md. Sin dependencias.
// Uso: node scripts/validate.mjs

import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const skillsDir = join(root, "skills");
const readme = readFileSync(join(root, "README.md"), "utf8");

const NAME_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const SEMVER_RE = /^\d+\.\d+\.\d+(-[0-9A-Za-z.-]+)?$/;

const errors = [];
let count = 0;

// Parser mínimo de frontmatter YAML: claves de primer nivel y un nivel anidado.
function parseFrontmatter(text) {
  const m = text.replace(/^﻿/, "").match(/^---\r?\n([\s\S]*?)\r?\n---(\r?\n|$)/);
  if (!m) return null;
  const data = {};
  let parent = null;
  for (const line of m[1].split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const nested = line.match(/^\s+([\w-]+):\s*(.*)$/);
    const top = line.match(/^([\w-]+):\s*(.*)$/);
    if (top) {
      const [, k, v] = top;
      if (v === "") { data[k] = {}; parent = k; }
      else { data[k] = unquote(v); parent = null; }
    } else if (nested && parent) {
      data[parent][nested[1]] = unquote(nested[2]);
    }
  }
  return data;
}

function unquote(v) {
  v = v.trim();
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) return v.slice(1, -1);
  return v;
}

if (!existsSync(skillsDir)) {
  console.error("✗ No existe la carpeta skills/");
  process.exit(1);
}

for (const dir of readdirSync(skillsDir).sort()) {
  const full = join(skillsDir, dir);
  if (!statSync(full).isDirectory()) continue;
  count++;
  const fail = (msg) => errors.push(`skills/${dir}: ${msg}`);
  const file = join(full, "SKILL.md");

  if (!existsSync(file)) { fail("falta SKILL.md"); continue; }
  const fm = parseFrontmatter(readFileSync(file, "utf8"));
  if (!fm) { fail("SKILL.md no tiene frontmatter YAML (--- ... ---) al inicio"); continue; }

  if (!fm.name) fail("falta `name` en el frontmatter");
  else {
    if (!NAME_RE.test(fm.name)) fail(`\`name\` "${fm.name}" no está en kebab-case`);
    if (fm.name !== dir) fail(`\`name\` "${fm.name}" no coincide con la carpeta "${dir}"`);
  }

  if (!fm.description || typeof fm.description !== "string") fail("falta `description` en el frontmatter");
  else if (fm.description.length > 1024) fail(`\`description\` tiene ${fm.description.length} caracteres (máx. 1024)`);

  const version = fm.metadata && fm.metadata.version;
  if (!version) fail("falta `metadata.version`");
  else if (!SEMVER_RE.test(version)) fail(`\`metadata.version\` "${version}" no es SemVer (x.y.z)`);

  if (!readme.includes(`[\`${dir}\`](skills/${dir}/SKILL.md)`)) {
    fail("no aparece en el catálogo del README (fila con [`" + dir + "`](skills/" + dir + "/SKILL.md))");
  } else if (version) {
    const row = readme.split(/\r?\n/).find((l) => l.includes(`[\`${dir}\`](skills/${dir}/SKILL.md)`));
    if (!row.includes(`| ${version} |`)) fail(`la versión del catálogo del README no coincide con ${version}`);
  }
}

if (errors.length) {
  console.error(`✗ ${errors.length} error(es) en ${count} skill(s):\n`);
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}
console.log(`✓ ${count} skill(s) válidas`);
