import { Hono } from "hono";
import { cors } from "hono/cors";
import expensesRoute from "./routes/exepenses";

const app = new Hono();

const ORIGIN = (Bun.env.FRONTEND_URL as string) || "http://localhost:5173";

// Enable CORS for frontend dev
app.use(
  "*",
  cors({
    origin: ORIGIN, // => "secret", // your frontend origin
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    maxAge: 600,
  })
);

// Health check
app.get("/", (c) => c.text("Expense Tracker API is running 🚀"));

// Mount expenses route
app.route("/expenses", expensesRoute);

export default {
  port: 3000,
  fetch: app.fetch,
};
