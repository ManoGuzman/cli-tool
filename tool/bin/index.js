#!/usr/bin/env node
import createLogger from '../src/logger.js';
import arg from 'arg';
import chalk from 'chalk';
import getConfig from '../src/config/config-mgr.js';
import start from '../src/commands/start.js';

const logger = createLogger('index');

try {
  const args = arg({
    '--start': Boolean,
    '--build': Boolean,
    '--password': String, // Add this line if password support is intended
  });

  // Redact sensitive arguments before logging
  const safeArgs = { ...args };
  if (safeArgs['--password']) safeArgs['--password'] = '[REDACTED]';
  logger.debug('Received args', safeArgs);

  if (args['--start']) {
    const config = getConfig();
    start(config);
  }

  // if (args['--build']) {
  //   const config = getConfig();
  //   build(config);
  // }
} catch (e) {
  logger.error(e);
  console.log(chalk.redBright('Error:'), e.message);
  console.log(chalk.yellowBright('Please check your command and try again.'));
  usage();
}

function usage() {
  console.log(`${chalk.whiteBright('tool [CMD]')}
  ${chalk.greenBright('--start')}\tStarts the app
  ${chalk.greenBright('--build')}\tBuilds the app`);
}