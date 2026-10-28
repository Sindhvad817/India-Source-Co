// Loads site-content.js (a plain browser-style script) as build-time data,
// so it stays the single file to edit for homepage content.
import { readFileSync } from "node:fs";
import vm from "node:vm";

export default function () {
  const file = new URL("../site-content.js", import.meta.url);
  const code = readFileSync(file, "utf8");
  return vm.runInNewContext(`${code}\n;SITE_CONTENT;`, {}, { filename: "site-content.js" });
}
