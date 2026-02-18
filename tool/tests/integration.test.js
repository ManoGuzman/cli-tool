// Add documentation for running integration tests
import { test } from 'node:test';
import assert from 'node:assert';
import { spawn } from 'node:child_process';
import { writeFileSync, unlinkSync, existsSync } from 'fs';
import { join } from 'path';

// add a new integration test to verify CLI behavior
test('CLI should execute start command successfully', async () => {
  const configPath = join(process.cwd(), 'tool.config.js');
  try {
    writeFileSync(configPath, `({ port: 3000 })`);
  
    const child = spawn('node', ['bin/index.js', '--start'], {
      stdio: ['ignore', 'pipe', 'pipe']
    });

    let output = '';
    child.stdout.on('data', (data) => {
      output += data.toString();
    });
    child.stderr.on('data', (data) => {
      output += data.toString();
    });

    await new Promise((resolve) => {
      child.on('close', resolve);
    });

    // Remove ANSI color codes for matching
    const cleanOutput = output.replace(/\x1b\[[0-9;]*m/g, '');
    assert.ok(cleanOutput.includes('Starting the app'), `Output was: ${cleanOutput}`);
  } finally {
    // Cleanup
    if (existsSync(configPath)) {
      unlinkSync(configPath);
    }
  }
});