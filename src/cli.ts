#!/usr/bin/env node

import { existsSync, mkdirSync, copyFileSync, readdirSync, statSync } from "fs";
import { join, resolve } from "path";

const projectName = process.argv[2];

if (!projectName) {
  console.error("Error: Please provide a project name.\nUsage: npx ts-express-kit <project-name>");
  process.exit(1);
}

const targetDir = resolve(process.cwd(), projectName);

if (existsSync(targetDir)) {
  console.error(`Error: Directory ${projectName} already exists.`);
  process.exit(1);
}

mkdirSync(targetDir);

function copyRecursive(src: string, dest: string) {
  const entries = readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);
    if (entry.isDirectory()) {
      mkdirSync(destPath);
      copyRecursive(srcPath, destPath);
    } else if (entry.isFile()) {
      copyFileSync(srcPath, destPath);
    }
  }
}

const templateDir = join(__dirname, "../template");
copyRecursive(templateDir, targetDir);

console.log(`✔ Project created in ./${projectName}\n`);
console.log("Next steps:");
console.log(`  cd ${projectName}`);
console.log("  npm install");
console.log("  npm run dev");