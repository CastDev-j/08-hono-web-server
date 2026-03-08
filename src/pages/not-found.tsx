import type { NotFoundHandler } from "hono";

const notFoundPage: NotFoundHandler = (c) => {
  return c.render(
    <section>
      <h1>404 Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </section>,
    { title: "404 Not Found" },
  );
};

export default notFoundPage;
