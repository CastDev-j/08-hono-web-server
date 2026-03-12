import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) =>
  c.render(
    <section>
      <h1>Hello Hono!</h1>
      <p>
        This web page is rendered using Hono's built-in renderer. I'm learning
        how to work with Hono and it's pretty cool!
      </p>

      <br />
      <article className="">
        <a href="/api/env">Go Env</a>
        <a href="/api/todos">Go Todos</a>
      </article>
    </section>,
    { title: "Home Page" },
  ),
);
export default app;
