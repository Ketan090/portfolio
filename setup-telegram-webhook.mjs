#!/usr/bin/env node
// Registers the Telegram webhook for the portfolio update bot.
// Usage: node setup-telegram-webhook.mjs
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import readline from 'node:readline/promises';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function loadEnv() {
  const envPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '.env.local');
  if (!existsSync(envPath)) return {};
  const out = {};
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.trim().match(/^([A-Z0-9_]+)="?([^"]*)"?$/);
    if (m) out[m[1]] = m[2];
  }
  return out;
}

async function requiredValue(env, name, question) {
  const existing = env[name] || process.env[name];
  if (existing) {
    console.log(`${name}: (already set)`);
    return existing;
  }
  const val = String(await rl.question(question)).trim();
  return val;
}

const env = loadEnv();
let token = await requiredValue(env, 'TELEGRAM_BOT_TOKEN', 'TELEGRAM_BOT_TOKEN: ');
let secret = await requiredValue(env, 'TELEGRAM_WEBHOOK_SECRET', 'TELEGRAM_WEBHOOK_SECRET: ');

let baseUrl = await rl.question('Webhook base URL (e.g. https://your-project.vercel.app): ');
baseUrl = String(baseUrl).trim().replace(/\/+$/, '');
if (!/^https?:\/\//.test(baseUrl)) {
  console.error('Invalid URL. Must start with http:// or https://');
  process.exit(1);
}

const webhookUrl = baseUrl + '/api/telegram-webhook.js';

try {
  const res = await fetch('https://api.telegram.org/bot' + token + '/setWebhook', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: webhookUrl, secret_token: secret, allowed_updates: ['message'] })
  });
  const data = await res.json().catch(() => ({}));
  console.log('Status:', res.status);
  console.log('Response:', JSON.stringify(data));
  if (data.ok) {
    console.log('\nWebhook registered successfully!');
    console.log('Webhook URL:', webhookUrl);
    console.log('Check with: getWebhookInfo (see TELEGRAM_SETUP.md)');
  } else {
    console.error('\nRegistration failed:', data.description || data.error || 'Unknown error');
    process.exitCode = 1;
  }
} catch (err) {
  console.error('Network error calling Telegram API:', err.message);
  process.exitCode = 1;
} finally {
  rl.close();
}
