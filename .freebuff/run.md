# Preview Run Doc — Portfolio

## How to reproduce artifacts

No build step needed — this is a static site (HTML, CSS, JS). The only dependency
is `@vercel/blob` which is only used by the `api/` serverless functions (not needed
for local preview).

No `.env.local` copy required — the workspace IS the main checkout.

## How to run the server

The server is a simple Node.js static file server at `.freebuff/serve.js` (or
`C:\Users\Asus\.freebuff-serve.js` for paths without spaces).

```bash
node "C:\Users\Asus\.freebuff-serve.js"
```

Serves all static files (index.html, style.css, script.js, profile/, resume/) on
port 8080. The `api/` directory endpoints are Vercel serverless functions and will
NOT work locally — the frontend handles this gracefully with fallbacks.

### Windows detach recipe

```powershell
Start-Process -FilePath "C:\Program Files\nodejs\node.exe" -ArgumentList "C:\Users\Asus\.freebuff-serve.js" -RedirectStandardOutput "<log>" -RedirectStandardError "<log>.err" -WindowStyle Hidden -PassThru
```
Note: The serve.js script lives at `C:\Users\Asus\.freebuff-serve.js` to avoid
spaces in the path. The PORT is hardcoded to 8080.
