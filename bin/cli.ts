#!/usr/bin/env node

import { execSync } from 'child_process';

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

// Replace this with your actual repo URL!
const GITHUB_REPO_URL = 'https://github.com/nazmulhasannasim333/ts-express-kit';

const gitCheckoutCommand = `git clone --depth 1 ${GITHUB_REPO_URL} ${repoName}`;
const installDepsCommand = `cd ${repoName} && npm install`;

console.log(`Cloning the repository with name ${repoName}`);
const checkedOut = runCommand(gitCheckoutCommand);
if (!checkedOut) process.exit(-1);

console.log(`Installing dependencies for ${repoName}`);
const installedDeps = runCommand(installDepsCommand);
if (!installedDeps) process.exit(-1);

console.log('Congratulations! You are ready. Follow the next steps:');
console.log(`1. cd ${repoName}`);
console.log('2. npm run dev');