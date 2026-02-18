// Add documentation for running integration tests
import { test } from 'node:test';
import assert from 'node:assert';
import { spawn } from 'node:child_process';
import { writeFileSync, unlinkSync } from 'fs';
import { join } from 'path';

// add a new integration test to verify CLI behavior
test('CLI should execute start command successfully', async () => {
  const configPath = join(process.cwd(), 'tool.config.js');
  try {
    writeFileSync(configPath, `export default {
      port: 3000
    };`);
  
    const child = spawn('node', ['bin/index.js', 'start'], {
      stdio: 'pipe'
    });
    
    let output = '';
    child.stdout.on('data', (data) => {
      output += data.toString();
    });
    
    await new Promise((resolve) => {
      child.on('close', resolve);
    });
    
    assert.ok(output.includes('Starting the app'));
  } finally {
    // Cleanup
    unlinkSync(configPath);
  }
});