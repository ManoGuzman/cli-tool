import createLogger from '../logger.js';

const logger = createLogger('commands:start');

/**
 * Starts the application with the given configuration.
 *
 * The exact shape of {@link config} depends on the caller, but it is expected
 * to contain any options required to initialize and start the app. This
 * function logs a highlighted "Starting the app" message and the full
 * configuration object for debugging purposes.
 *
 * @param {Object} config - Configuration options used to start the app.
 * @returns {void}
 */
export default function start(config) {
  logger.highlight('  Starting the app  ');
  logger.debug(
    'Received configuration keys',
    config && typeof config === 'object' ? Object.keys(config) : config
  );
}