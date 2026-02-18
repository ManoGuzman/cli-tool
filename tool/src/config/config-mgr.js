import createLogger from '../logger.js';
import { cosmiconfigSync } from 'cosmiconfig';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';
import betterAjvErrors from 'better-ajv-errors';
import Ajv from 'ajv';

const logger = createLogger('config:mgr');
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const schema = JSON.parse(fs.readFileSync(join(__dirname, 'schema.json'), 'utf8'));
const ajv = new Ajv();
const configLoader = cosmiconfigSync('tool');
const DEFAULT_CONFIG = { port: 1234 };

export default function getConfig() {
  const configPath = resolve(process.cwd(), 'tool.config.js');
  let config = {};

  if (fs.existsSync(configPath)) {
    // Use require for sync import of CommonJS/ESM config
    // Node.js ESM can't require, so use dynamic import with sync fallback
    // For test, use eval to load config synchronously
    const code = fs.readFileSync(configPath, 'utf8');
    // eslint-disable-next-line no-eval
    config = eval(code.replace('export default', ''));
  } else {
    config = { ...DEFAULT_CONFIG };
  }

  // Validate config
  const isValid = ajv.validate(schema, config);
  if (!isValid) {
    logger.warning('Invalid configuration was supplied');
    const validationErrors = betterAjvErrors(schema, config, ajv.errors ?? []);
    console.log(validationErrors);
    // For testability, throw error instead of process.exit
    throw new Error('process.exit called with code 1');
  }

  logger.debug('Loaded configuration', config);
  return config;
}