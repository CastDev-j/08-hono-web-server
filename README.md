## Environment Variables in Cloudflare Workers with Hono

copy `.template.vars.env ` and rename it to `.dev.vars` and add your environment variables in the format `KEY="VALUE"`.

## Initializing the database

```txt

bunx create-db

bunx --bun prisma migrate dev --name init

bunx --bun prisma generate

```

## Seeding the database

```txt
bunx --bun prisma db seed
```

## Prisma Studio

```txt
bunx --bun prisma studio
```

## Running the project

```txt
bun install
bun run dev
```

## Deploying to Cloudflare Workers

```txt
bun run deploy
```
