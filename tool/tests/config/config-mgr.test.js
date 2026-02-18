import { test } from 'node:test';
import assert from 'node:assert';
import { writeFileSync, unlinkSync, existsSync } from 'fs';
import { join } from 'path';
import getConfig from '../../src/config/config-mgr.js';

test('getConfig should return default config when no config file exists', () => {
  // Ensure no config file exists in test directory
  const configPath = join(process.cwd(), 'tool.config.js');
  if (existsSync(configPath)) {
    try {
      unlinkSync(configPath);
    } catch (err) {
      // Ignore errors during cleanup
    }
  }
  
  const config = getConfig();
  
  assert.strictEqual(typeof config, 'object');
  assert.strictEqual(config.port, 1234);
});

test('getConfig should validate config against schema', () => {
  const validConfigPath = join(process.cwd(), 'tool.config.js');
  
  // Create valid config file as a valid JS object for eval
  writeFileSync(validConfigPath, `({ port: 8080 })`);

  const config = getConfig();

  assert.strictEqual(typeof config, 'object');
  assert.strictEqual(config.port, 8080);

  // Cleanup
  try {
    unlinkSync(validConfigPath);
  } catch (err) {
    // Ignore errors during cleanup
  }
});

test('getConfig should handle invalid config', () => {
  const invalidConfigPath = join(process.cwd(), 'tool.config.js');
  
  // Create invalid config file (port out of range)
  writeFileSync(invalidConfigPath, 'export default { port: 99999 };');

  // Stub process.exit
  const originalExit = process.exit;
  let exitCalled = false;
  process.exit = (code) => {
  // Cleanup
  try {
    unlinkSync(invalidConfigPath);
  } catch (err) {
    // Ignore errors during cleanup
  }
  };

  assert.throws(() => {
    getConfig();
  }, /process\.exit called with code 1/);

  // Restore process.exit
  process.exit = originalExit;
  
  // Cleanup
  unlinkSync(invalidConfigPath);
});