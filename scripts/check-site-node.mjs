const version = process.versions.node;
if (Number(version.split('.')[0]) < 24) {
  console.error(`The website requires Node.js 24 or later; found ${version}. Use fnm use 26.`);
  process.exit(1);
}
