# Fabi-wallet-webapp

### Deployment requirements

- `.well-known` folder to be served (you can test with `curl -v mysite.com/.well-known/apple-app-site-association`)
- It must be served with a `Content-Type: application/json` header.
- There cannot be any redirects; i.e. must work without adding -L to your curl command.
- sensitive info (or may change later), so needs to be set via environment variables:
  - `appIDs`, `apps` in `apple-app-site-association`
  - `sha256_cert_fingerprints` in `assetlinks.json`
  - `<meta http-equiv="Refresh"..../>` in index.html

### CloudFlare test

- deploy worker `cloudflare.worker.js`
- on mobile device open link like this [https://example.com/auth/email-verification?hash=test_hash](https://summer-dust-4acc.dmprilipko.workers.dev/auth/email-verification?hash=test_hash)
