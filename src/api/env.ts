import { Hono } from "hono";
import { env } from "hono/adapter";

type Bindings = {
  NAME: string;
  ENV: string;
  API_URL: string;
  MI_API_SECRETA: string;
};

const app = new Hono();

app.get("/", async (c) => {
  const environments = env<Bindings>(c);

  console.log(environments);

  return c.text(
    `Environment Variables: 
    - The current environment is ${environments.ENV}.
    - Your name is ${environments.NAME}.
    - The API URL is ${environments.API_URL}.
    - The secret is ${environments.MI_API_SECRETA}.
    `,
  );
});

export default app;
