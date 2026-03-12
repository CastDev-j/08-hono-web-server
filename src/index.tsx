import { Hono } from "hono";
import { renderer } from "./lib/renderer.lib";
import home from "./pages/home.page";
import notFoundPage from "./pages/not-found.page";
import todos from "./api/todos.api";
import env from "./api/env.api";

const app = new Hono();
app.use(renderer);

app.route("/api/todos", todos);
app.route("/api/env", env);

app.route("/", home);

app.notFound(notFoundPage);
export default app;
