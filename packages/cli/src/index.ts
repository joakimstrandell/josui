#!/usr/bin/env node

import { select } from "@inquirer/prompts";
import { linkSkills } from "./commands/link-skills.js";

const args = process.argv.slice(2);

async function main(): Promise<void> {
  console.log("\n  josui cli\n");

  const command = args[0];
  const subcommand = args[1];

  if (command === "link" && subcommand === "skills") {
    await linkSkills();
    return;
  }

  if (command === "link") {
    await linkSkills();
    return;
  }

  // No command - show main menu
  const action = await select({
    message: "What would you like to do?",
    choices: [
      { value: "link-skills", name: "Link skills - Symlink Claude Code skills from josui" },
    ],
  });

  if (action === "link-skills") {
    await linkSkills();
  }
}

main().catch((err) => {
  if (err.name === "ExitPromptError") {
    console.log("\nCancelled.");
    process.exit(0);
  }
  console.error("Error:", err.message);
  process.exit(1);
});
