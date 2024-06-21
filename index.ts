#! /usr/bin/env bun

import boxen from "boxen";
import { getTotalStars } from "./lib/utils";
import chalk from "chalk";
import { Tui } from "./lib/ui";

async function main() {
  const content = `
  Hello there: ${Tui.colorize("Stars:0")} \n
  `;
  Tui.box(content);
}

main();
