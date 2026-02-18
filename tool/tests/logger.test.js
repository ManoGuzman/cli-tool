import { test } from 'node:test';
import assert from 'node:assert';
import createLogger from '../src/logger.js';

test('logger should output messages correctly', () => {
  const logger = createLogger('test-module');
  
  // Spy on console.log to capture output
  const originalConsoleLog = console.log;
  const logCalls = [];
  console.log = (...args) => logCalls.push(args);

  try {
    logger.log('test message');
    logger.warning('warning message');
    logger.highlight('highlight message');
    logger.debug('debug message');
  } finally {
    console.log = originalConsoleLog;
  }

  // Flatten all arguments to a single array of strings for easier searching
  const flatLogCalls = logCalls.flat().map(String);

  // Assert that console.log was called with expected messages
  assert.ok(flatLogCalls.some(msg => msg.includes('test message')), 'log should output test message');
  assert.ok(flatLogCalls.some(msg => msg.includes('warning message')), 'warning should output warning message');
  assert.ok(flatLogCalls.some(msg => msg.includes('highlight message')), 'highlight should output highlight message');
  assert.ok(flatLogCalls.some(msg => msg.includes('debug message')), 'debug should output debug message');
});

test('createLogger should create logger with given name', () => {
  const logger = createLogger('test-module');
  
  // Test that logger methods exist and can be called
  assert.doesNotThrow(() => {
    logger.log('test message');
    logger.warning('warning message');
    logger.highlight('highlight message');
    logger.debug('debug message');
  });
});