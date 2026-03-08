import { Hono } from "hono";
import { renderer } from "./renderer";
import { Layout, Content } from "./sources";

const app = new Hono();

app.use(renderer);

app.get("/", (c) => {
  const props = {
    title: "My Website",
    description: "A simple website built with Hono",
  };

  return c.html(
    <Layout {...props}>
      <Content />
    </Layout>,
  );
});

export default app;
