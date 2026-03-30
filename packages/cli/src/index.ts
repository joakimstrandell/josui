#!/usr/bin/env node

import { select } from '@inquirer/prompts';
import { watchPackages } from './commands/watch.js';
import { linkSkills } from './commands/link-skills.js';

const args = process.argv.slice(2);

async function main(): Promise<void> {
  console.log('\n  josui cli\n');

  const command = args[0];

  if (command === 'watch') {
    await watchPackages();
    return;
  }

  if (command === 'link') {
    const subcommand = args[1];

    if (subcommand === 'skills') {
      await linkSkills();
      return;
    }

    // "link" without subcommand or "link packages" -> point to watch
    console.log('  `josui link packages` has been replaced by `josui watch`.\n');
    console.log('  Run `josui watch` to copy and watch packages instead of symlinking.\n');
    return;
  }

  // No command - show main menu
  const action = await select({
    message: 'What would you like to do?',
    choices: [
      { value: 'watch', name: 'Watch packages - Copy & watch @josui/* src files' },
      { value: 'link-skills', name: 'Link skills - Link Claude Code skills' },
    ],
  });

  if (action === 'watch') {
    await watchPackages();
  } else {
    await linkSkills();
  }
}

main().catch((err) => {
  if (err.name === 'ExitPromptError') {
    console.log('\nCancelled.');
    process.exit(0);
  }
  console.error('Error:', err.message);
  process.exit(1);
});
