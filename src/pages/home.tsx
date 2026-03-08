import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) =>
  c.html(
    <>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Hello Hono!</title>
          <link rel="stylesheet" href="static/style.css" />
        </head>
        <body>
          <section>
            <h1>Hello Hono!</h1>
            <p>
              this is a simple example of a web page served by Hono, a small and
              fast web framework for Cloudflare Workers. You can customize this
              page by editing the HTML and CSS files in the public directory.
              Enjoy building with Hono!
            </p>
          </section>

          <article>
            <a href="/authors">
              <button>View Authors</button>
            </a>

            <a href="/books">
              <button>View Books</button>
            </a>

            <a href="/not-found">
              <button>View Not Found</button>
            </a>
          </article>
        </body>
      </html>
    </>,
  ),
);
export default app;
