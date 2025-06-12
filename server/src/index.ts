import { Hono } from "hono";
import { cors } from "hono/cors";
import expensesRoute from "./routes/exepenses";

const app = new Hono();

// Enable CORS for frontend dev
app.use("*", cors());

// Health check
app.get("/", (c) => c.text("Expense Tracker API is running 🚀"));

// Mount expenses route
app.route("/expenses", expensesRoute);

export default {
  port: 3000,
  fetch: app.fetch,
};
