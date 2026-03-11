import { Hono } from 'hono';
import { jsxRenderer } from 'hono/jsx-renderer';

const app = new Hono();

app.use('*', jsxRenderer());

app.get('/', (c) => {
  return c.html('<div id="root"></div>');
});

export default app;
