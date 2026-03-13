import { Hono } from "hono";
import { env } from "hono/adapter";
import { PrismaClient } from "../../../generated/prisma/client";

type ContextWithPrisma = {
  Variables: {
    prisma: PrismaClient;
  };
  Bindings: {
    NAME: string;
    ENV: string;
    API_URL: string;
    MI_API_SECRETA: string;
  };
};

const app = new Hono<ContextWithPrisma>();

app.get("/", (c) => {
  const { ENV, NAME, API_URL, MI_API_SECRETA } = env(c);

  const hasRequiredEnvVars = ENV && NAME && API_URL && MI_API_SECRETA;

  if (!hasRequiredEnvVars) {
    return c.json(
      {
        error: "Environment variables are not set properly.",
        missing: {
          ENV: !ENV,
          NAME: !NAME,
          API_URL: !API_URL,
          MI_API_SECRETA: !MI_API_SECRETA,
        },
      },
      500,
    );
  }

  return c.json({
    environment: ENV,
    name: NAME,
    apiUrl: API_URL,
    secret: MI_API_SECRETA,
  });
});

export default app;
