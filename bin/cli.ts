#!/usr/bin/env node

import { execSync } from 'child_process';
import { existsSync, rmSync } from 'fs';

function runCommand(command: string): boolean {
  try {
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (e) {
    console.error(`Failed to execute ${command}`, e);
    return false;
  }
}

const repoName = process.argv[2];

if (!repoName) {
  console.error('Please provide a project name: npx ts-express-kit my-backend-app');
  process.exit(1);
}

// GitHub repository URL
const GITHUB_REPO_URL = 'https://github.com/nazmulhasannasim333/ts-express-kit';

const gitCheckoutCommand = `git clone --depth 1 ${GITHUB_REPO_URL} ${repoName}`;
const installDepsCommand = `cd ${repoName} && npm install`;

console.log(`Cloning the repository with name ${repoName}`);
const checkedOut = runCommand(gitCheckoutCommand);
if (!checkedOut) process.exit(-1);

// Remove .git folder so it's not a git repo
const gitDir = `${repoName}/.git`;
if (existsSync(gitDir)) {
  rmSync(gitDir, { recursive: true, force: true });
  console.log('.git folder removed from cloned project.');
}

// Remove bin folder so user project is clean
const binDir = `${repoName}/bin`;
if (existsSync(binDir)) {
  rmSync(binDir, { recursive: true, force: true });
  console.log('bin folder removed from cloned project.');
}

console.log(`Installing dependencies for ${repoName}`);
const installedDeps = runCommand(installDepsCommand);
if (!installedDeps) process.exit(-1);

console.log('Congratulations! You are ready. Follow the next steps:');
console.log(`1. cd ${repoName}`);
console.log('2. npm run dev');