import { test } from 'node:test';
import assert from 'node:assert';
import start from '../../src/commands/start.js';

test('start command should execute without errors', () => {
  const config = { port: 3000 };
  
  assert.doesNotThrow(() => {
    start(config);
  });
});

test('start command should handle different config values', () => {
  const configs = [
    { port: 8080 },
    { port: 3000 },
    { port: 9999 }
  ];
  
  configs.forEach(config => {
    assert.doesNotThrow(() => {
      start(config);
    });
  });
});