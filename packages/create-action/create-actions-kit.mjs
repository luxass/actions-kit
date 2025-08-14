#!/usr/bin/env node

// eslint-disable-next-line node/prefer-global/process
const currentVersion = process.versions.node;
const requiredMajorVersion = Number.parseInt(currentVersion.split(".")[0], 10);
const minimumMajorVersion = 18;

if (requiredMajorVersion < minimumMajorVersion) {
  console.error(`Node.js v${currentVersion} is out of date and unsupported!`);
  console.error(`Please use Node.js v${minimumMajorVersion} or higher.`);
  // eslint-disable-next-line node/prefer-global/process
  process.exit(1);
}

import("./dist/index.mjs");
