import { Hono } from "hono";
import { env } from "hono/adapter";

const app = new Hono();

app.get("/", (c) => {
  const environments = env<{ NAME: string; ENV: string; API_URL: string }>(c);

  return c.text(
    `Environment Variables: 
    - The current environment is ${environments.ENV}.
    - Your name is ${environments.NAME}.
    - The API URL is ${environments.API_URL}
    `,
  );
});

export default app;
