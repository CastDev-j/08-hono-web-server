## Environment Variables in Cloudflare Workers with Hono

copy `.template.vars.env ` and rename it to `.dev.vars` and add your environment variables in the format `KEY="VALUE"`.

## Installing dependencies

```txt
bun install
```

## Initializing the database

```txt

bunx create-db // copy and paste the conection string to your .dev.vars file


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
bun run dev
```

## Deploying to Cloudflare Workers

```txt
bun run deploy
```
