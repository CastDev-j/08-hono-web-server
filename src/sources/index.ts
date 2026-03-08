import { html } from "hono/html";

interface SiteData {
  title: string;
  description: string;
  children?: any;
}

export const Layout = ({ description, title, children }: SiteData) => html`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${title}</title>
      <meta name="description" content="${description}" />
      <link rel="stylesheet" href="static/style.css" />
    </head>

    <body>
      ${children}

      <script src="static/app.js"></script>
    </body>
  </html>
`;

export const Content = () => html`
  <h1>Hello Hono!</h1>

  <p>
    this is a simple example of a web page served by Hono, a small and fast web
    framework for Cloudflare Workers. You can customize this page by editing the
    HTML and CSS files in the public directory. Enjoy building with Hono!
  </p>
`;
