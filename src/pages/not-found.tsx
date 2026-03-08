import type { NotFoundHandler } from "hono";

const notFoundPage: NotFoundHandler = (c) => {
  return c.html(
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>404 Not Found</title>
        <link rel="stylesheet" href="/static/style.css" />
      </head>
      <body>
        <section>
          <h1>404 Not Found</h1>
          <p>The page you are looking for does not exist.</p>
        </section>
      </body>
    </html>,
    404,
  );
};

export default notFoundPage;
