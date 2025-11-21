import { Hono } from "hono";
import prisma from "../db";

const authRoute = new Hono();

// Register a new user
authRoute.post("/register", async (c) => {
  const { email, password } = await c.req.json();

  if (!email || !password) {
    return c.json({ error: "Email and password are required" }, 400);
  }

  //hash password before saving (omitted for brevity)
  const hashedPassword = await Bun.password.hash(password, {
    algorithm: "bcrypt",
    cost: 12,
  });

  const user = await prisma.user.create({
    data: { email, password: hashedPassword },
  });

  return c.json({ id: user.id, email: user.email });
});

// Sign in a user
authRoute.post("/login", async (c) => {
  const { email, password } = await c.req.json();

  if (!email || !password) {
    return c.json({ error: "Email and password are required" }, 400);
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return c.json({ error: "Invalid email or password" }, 401);
  }

  const isValidPassword = await Bun.password.verify(
    password,
    user.hashedPassword
  );

  if (!isValidPassword) {
    return c.json({ error: "Invalid email or password" }, 401);
  }

  // Generate a token (for simplicity, using a random string here)
  const token = crypto.randomUUID();

  // In a real app, you'd save this token in a database or in-memory store
  // For this example, we'll skip that step

  return c.json({ token });
});
