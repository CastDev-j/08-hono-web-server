import { Hono } from "hono";
import authors from "./api/authors";
import books from "./api/books";
import home from "./pages/home";
import notFoundPage from "./pages/not-found";
import { renderer } from "./renderer";

const app = new Hono();
app.use(renderer);

app.route("/", home);
app.route("/authors", authors);
app.route("/books", books);

app.notFound(notFoundPage);

export default app;
