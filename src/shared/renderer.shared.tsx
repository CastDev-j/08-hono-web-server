import { jsxRenderer } from "hono/jsx-renderer";
import { Link, ViteClient } from "vite-ssr-components/hono";

declare module "hono" {
  interface ContextRenderer {
    (content: string | Promise<string>, props: { title: string }): Response;
  }
}

export const renderer = jsxRenderer(({ children, title }) => {
  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title || "Hono Web Server"}</title>
        <ViteClient />
        <Link href="/style.css" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
});
