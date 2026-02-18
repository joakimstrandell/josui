import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/smoke',
  use: {
    baseURL: 'http://127.0.0.1:4599',
  },
  webServer: {
    command: 'node dist/cli.js --port 4599 --no-open',
    port: 4599,
    reuseExistingServer: !process.env.CI,
    cwd: '.',
  },
});
