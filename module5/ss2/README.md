# NestJS - 6 exercises

## Run

Node.js and npm required. Run in root directory:

```bash
npm install
npm run start
```

Second terminal:

```bash
npm run start:admin
```

## API test URLs

- http://localhost:3000/info - Bài 1 (`useValue`)
- http://localhost:3000/users/status - Bài 2 (Core logger + DB)
- http://localhost:3000/products/status - Bài 2 (Core logger + DB)
- http://localhost:3000/users/token/1 - Bài 3 (Users -> Auth)
- http://localhost:3000/auth/check/1/123456 - Bài 3 (Auth -> Users)
- http://localhost:3000/config - Bài 4 (dynamic module)
- http://localhost:3000/connection - Bài 5 (async factory)
- http://localhost:3001/admin-info - Bài 6 (shared library)

## Submission screenshots

1. Postman GET `http://localhost:3000/info`: JSON `{"appName":"MyNestApp","version":"1.0"}`
2. Terminal `npm run start`, LoggerService lines for Users/Products after GET status endpoints
3. Terminal after `npm run start`: `Nest application successfully started`
4. Code `custom-config/config.module.ts`
5. Terminal async provider: `[AsyncProvider] Connecting...`, `Connection ready after 3000ms`, then Nest started
6. VS Code explorer displaying `apps/api`, `apps/admin`, `libs/database`.

**Security:** Password and token logic are mock demonstration only; do not deploy real authentication with these examples.
