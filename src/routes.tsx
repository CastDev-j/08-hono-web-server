import { Hono } from "hono";
import { renderer } from "./shared/renderer.shared";
import home from "./modules/site/home.page";
import notFoundPage from "./modules/site/not-found.page";
import todos from "./modules/todo/api/todos.api";
import env from "./modules/env/api/env.api";

const app = new Hono();
app.use(renderer);

app.route("/api/todos", todos);
app.route("/api/env", env);

app.route("/", home);

app.notFound(notFoundPage);
export default app;
