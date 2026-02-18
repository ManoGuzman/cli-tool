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

    // Assert that console.log was called with expected messages
    assert.ok(logCalls.some(call => call.includes('test message')), 'log should output test message');
    assert.ok(logCalls.some(call => call.includes('warning message')), 'warning should output warning message');
    assert.ok(logCalls.some(call => call.includes('highlight message')), 'highlight should output highlight message');
    assert.ok(logCalls.some(call => call.includes('debug message')), 'debug should output debug message');
  } finally {
    console.log = originalConsoleLog;
  }
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