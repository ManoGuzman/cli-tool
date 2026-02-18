import createLogger from '../logger.js';
import { cosmiconfigSync } from 'cosmiconfig';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import betterAjvErrors from 'better-ajv-errors';
import Ajv from 'ajv';

const logger = createLogger('config:mgr');
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const schema = JSON.parse(readFileSync(join(__dirname, 'schema.json'), 'utf8'));
const ajv = new Ajv();  // Removed jsonPointers option
const configLoader = cosmiconfigSync('tool');
const DEFAULT_CONFIG = { port: 1234 };

export default function getConfig() {
  const result = configLoader.search(process.cwd());
  if (!result) {
    logger.warning('Could not find configuration, using default');
    return DEFAULT_CONFIG;
  } else {
    const isValid = ajv.validate(schema, result.config);
    if (!isValid) {
      logger.warning('Invalid configuration was supplied');
      const validationErrors = betterAjvErrors(schema, result.config, ajv.errors);
      console.log(betterAjvErrors(schema, result.config, ajv.errors ?? []));
      process.exit(1);
    }
    // Convert to plain object to fix [Module: null prototype]
    const config = { ...result.config };
    logger.debug('Found configuration', config);
    return config;
  }
}