# Telegram Bot Setup for Portfolio Updates

This adds a Telegram bot that can update your site's **profile photo** and **resume PDF** by simply sending the file to the bot in a private chat.

---

## 1. Create the bot in BotFather

1. Open **@BotFather** in Telegram.
2. Send `/newbot`.
3. Name it, e.g. `Ketan Portfolio Updater`.
4. Choose a username ending in `bot`, e.g. `ketan_portfolio_updater_bot`.
5. BotFather replies with a **token** that looks like:
   ```
   8123456789:AAHxyz..._abc
   ```
   Save this — it is `TELEGRAM_BOT_TOKEN`.

### Optional BotFather tweaks
- `/setdescription` — e.g. *"Send a photo to update the profile picture, or a PDF to update the resume."*
- `/setabouttext` — same, short text.
- `/setprivacy` → **Disable** (only needed if you'll use the bot in groups; a private 1-on-1 chat works either way).

## 2. Get your Telegram user ID

1. Open **@userinfobot** in Telegram.
2. Press **Start**.
3. It replies with your numeric ID, e.g. `123456789`.
   Save this — it is `TELEGRAM_OWNER_ID`. Only this chat ID is allowed to update the site.

## 3. Create a webhook secret

Pick a long random string (letters + numbers + `_-`), e.g.:
```
8fKp2vZx9QmR4tW7yB3nLc1sD5hJ
```
Save it — this is `TELEGRAM_WEBHOOK_SECRET`. It is sent to Telegram and must be sent back by Telegram on every webhook call, so only genuine Telegram requests reach your endpoint.

## 4. Add environment variables in Vercel

In the Vercel project dashboard:

**Settings → Environment Variables** (add these):

| Name                     | Value                                    | Environments         |
| ------------------------ | ---------------------------------------- | -------------------- |
| `TELEGRAM_BOT_TOKEN`     | `8123456789:AAHxyz..._abc`               | Production + Preview |
| `TELEGRAM_OWNER_ID`      | `123456789`                              | Production + Preview |
| `TELEGRAM_WEBHOOK_SECRET`| `8fKp2vZx9QmR4tW7yB3nLc1sD5hJ`           | Production + Preview |

Note: `BLOB_READ_WRITE_TOKEN` / `BLOB_STORE_ID` must already be present (it is, if the upload admin panel works).

## 5. Deploy

Push/merge to the branch connected to the Vercel project (or do a manual deploy). The new function `api/telegram-webhook.js` will be deployed automatically.

Your webhook URL will be:
```
https://YOUR_PROJECT.vercel.app/api/telegram-webhook.js
```
(If the URL 404s, use `/api/telegram-webhook` without the `.js`.)

## 6. Register the webhook

Run the helper script once, from this folder:

```
node setup-telegram-webhook.mjs
```

It posts to Telegram:
```
https://api.telegram.org/bot<TOKEN>/setWebhook?url=<WEBHOOK_URL>&secret_token=<SECRET>
```

You can also do it manually in a browser / curl:
```
https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://YOUR_PROJECT.vercel.app/api/telegram-webhook.js&secret_token=<SECRET>
```
A successful reply looks like: `{"ok":true,"result":true,"description":"Webhook was set"}`.

To check the webhook status: `getWebhookInfo`.
To remove it: `deleteWebhook`.

## 7. Use the bot

Open your bot in Telegram and press **Start**, then:

| You send...             | Result                                  |
| ----------------------- | --------------------------------------- |
| A photo (or image file) | Profile photo on the site updates within ~1 min (cache) |
| A PDF document          | Resume download updates within ~1 min   |
| Anything else           | Bot replies: *"Send me a photo to update the profile picture, or a PDF file to update the resume."* |

Any other Telegram user who messages the bot gets *"You are not authorized to update this site."* and their message is ignored.

## How it works (short)

- Telegram POSTs each message to `/api/telegram-webhook.js` (verified with the secret token + owner ID).
- The function downloads the media via the Bot API and overwrites the fixed blobs `profile_photo.jpg` / `resume.pdf` in your existing Vercel Blob store (`allowOverwrite: true`).
- The site admin panel already writes to those same paths, so both update channels stay in sync.
- The page fetches `/api/site-assets` to always serve the latest public URLs, with a 5-minute cache — hence the ~1 minute delay note above.

## Troubleshooting

- **"Unauthorized"** — wrong secret token or you called the URL directly without Telegram. Re-run the setup script and make sure the secret in Vercel matches the one you registered.
- **Webhook URL returns 404** — the deployment hasn't finished, or the URL needs the `.js` suffix (or not).
- **"Failed to update: ..." (bot reply)** — usually the blob token is missing/expired on the server, or the file exceeded 20 MB. Check the Vercel function logs.
- **Site still shows old photo** — the blob URL is cache-busted by the site polling `/api/site-assets`; also your browser/CDN may need a normal refresh (Ctrl+F5).
