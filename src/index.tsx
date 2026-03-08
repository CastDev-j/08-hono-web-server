import { Hono } from "hono";
import { renderer } from "./renderer";
import authors from "./api/authors";
import books from "./api/books";
import home from "./pages/home";
import notFoundPage from "./pages/not-found";

const app = new Hono();

app.use(renderer);

app.route("/", home);
app.route("/authors", authors);
app.route("/books", books);

app.notFound(notFoundPage);

export default app;
