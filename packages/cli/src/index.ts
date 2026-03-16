#!/usr/bin/env node

import { select } from '@inquirer/prompts';
import { linkPackages } from './commands/link-packages.js';
import { linkSkills } from './commands/link-skills.js';

const args = process.argv.slice(2);

async function main(): Promise<void> {
  console.log('\n  josui cli\n');

  // Parse command
  const command = args[0];
  const subcommand = args[1];

  if (command === 'link') {
    if (subcommand === 'packages') {
      await linkPackages();
      return;
    }

    if (subcommand === 'skills') {
      await linkSkills();
      return;
    }

    // Interactive link menu
    const linkType = await select({
      message: 'What would you like to link?',
      choices: [
        { value: 'packages', name: 'Packages - Link @josui/* packages for local development' },
        { value: 'skills', name: 'Skills - Link Claude Code skills from josui' },
      ],
    });

    if (linkType === 'packages') {
      await linkPackages();
    } else {
      await linkSkills();
    }
    return;
  }

  // No command - show main menu
  const action = await select({
    message: 'What would you like to do?',
    choices: [{ value: 'link', name: 'Link packages or skills for local development' }],
  });

  if (action === 'link') {
    const linkType = await select({
      message: 'What would you like to link?',
      choices: [
        { value: 'packages', name: 'Packages - Link @josui/* packages for local development' },
        { value: 'skills', name: 'Skills - Link Claude Code skills from josui' },
      ],
    });

    if (linkType === 'packages') {
      await linkPackages();
    } else {
      await linkSkills();
    }
  }
}

main().catch((err) => {
  if (err.name === 'ExitPromptError') {
    // User cancelled with Ctrl+C
    console.log('\nCancelled.');
    process.exit(0);
  }
  console.error('Error:', err.message);
  process.exit(1);
});
