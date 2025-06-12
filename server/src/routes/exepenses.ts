import { Hono } from "hono";
import prisma from "../db";

const expensesRoute = new Hono();

// GET /expenses - fetch all expenses
expensesRoute.get("/", async (c) => {
  const expenses = await prisma.expense.findMany({
    orderBy: { createdAt: "desc" },
  });
  return c.json(expenses);
});

// POST /expenses - add a new expense
expensesRoute.post("/", async (c) => {
  const data = await c.req.json();
  const { title, amount } = data;

  if (!title || !amount) {
    return c.json({ error: "Title and amount are required" }, 400);
  }

  const expense = await prisma.expense.create({
    data: {
      title,
      amount: parseFloat(amount),
    },
  });

  return c.json(expense);
});
// DELETE /expenses/:id - Delete an expense
expensesRoute.delete("/:id", async (c) => {
  const id = Number(c.req.param("id"));

  if (isNaN(id)) {
    return c.json({ error: "Invalid ID" }, 400);
  }

  try {
    await prisma.expense.delete({
      where: { id },
    });
    return c.json({ success: true });
  } catch (err) {
    return c.json({ error: "Expense not found or could not be deleted" }, 404);
  }
});

// PUT /expenses/:id - Update an expense
expensesRoute.put("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const body = await c.req.json();

  const { title, amount } = body;

  if (!title || !amount || isNaN(id)) {
    return c.json({ error: "Missing title, amount, or invalid ID" }, 400);
  }

  try {
    const updated = await prisma.expense.update({
      where: { id },
      data: {
        title,
        amount: parseFloat(amount),
      },
    });

    return c.json(updated);
  } catch (err) {
    return c.json({ error: "Expense not found or update failed" }, 404);
  }
});

export default expensesRoute;
