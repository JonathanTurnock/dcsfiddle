const { readFileSync } = require("fs");
const { resolve } = require("path");

const importRegex =
  /--\[\[{{(\d+|[a-z$_][a-z\d$_]*?(?:\.[a-z\d$_]*?)*?)}}]]--/gi;

let base = readFileSync(resolve(__dirname, "httpd.lua")).toString();

if (importRegex.test(base)) {
  base = base.replace(importRegex, (match, key, ...args) => {
    const full = args[1].split("\n");

    const indentation = full
      .find((it) => it.includes(match))
      .replace(match, "");

    let result = readFileSync(resolve(__dirname, key))
      .toString()
      .split("\n")
      .join(`\n${indentation}`);
    return String(result);
  });
}

console.log(base);
