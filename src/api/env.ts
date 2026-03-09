import { Hono } from "hono";
import { env } from "hono/adapter";

type Bindings = {
  NAME: string;
  ENV: string;
  API_URL: string;
  MI_API_SECRETA: string;
};

const app = new Hono();

app.get("/", (c) => {
  const environments = env<Bindings>(c);

  return c.json({
    environment: environments.ENV,
    name: environments.NAME,
    apiUrl: environments.API_URL,
    secret: environments.MI_API_SECRETA,
  });
});

export default app;
