import { Hono } from "hono";
import { renderer } from "./lib/renderer";
import authors from "./api/authors";
import books from "./api/books";
import home from "./pages/home";
import todos from "./api/todos";
import env from "./api/env";
import notFoundPage from "./pages/not-found";

const app = new Hono();
app.use(renderer);

app.route("/api/authors", authors);
app.route("/api/todos", todos);
app.route("/api/books", books);
app.route("/api/env", env);

app.route("/", home);

app.notFound(notFoundPage);
export default app;
