#! /usr/bin/env bun

import { GithubService } from "./lib/utils";

import { Tui } from "./lib/ui";

async function main() {
  const githubService = new GithubService();
  const username = "mnsdojo";
  console.log(Tui.colorize("loading..."));

  try {
    const [repoInfo, totalStars, figletText] = await Promise.all([
      githubService.getRepoInfo(username),
      githubService.getTotalStars(username),
      Tui.headerText(username),
    ]);

    let emoji = totalStars === 0 ? "🥲" : "😁";
    const content = `
      
    ${figletText}


      ${Tui.colorize("-".repeat(40), "cyan")}\n


      Stars ${Tui.colorize(totalStars.toString(), "blueBright")} ${emoji}\n
      Repositories ${Tui.colorize(
        repoInfo.totalRepositories.toString(),
        "blueBright"
      )}\n
      Followers ${Tui.colorize(repoInfo.followers.toString(), "blueBright")}\n
      Following ${Tui.colorize(repoInfo.following.toString(), "blueBright")}\n
      Location ${Tui.colorize(repoInfo.location || "N/A", "blueBright")}\n
      Bio ${Tui.colorize(repoInfo.bio || "N/A", "blueBright")}\n
      
      ${Tui.colorize("-".repeat(40), "grey")}\n
      
      
    `;
    Tui.box(content);
  } catch (error) {
    console.error("Error fetching data", error);
  }
}

main();
