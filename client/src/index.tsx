import { Hono } from 'hono';
import { jsxRenderer } from 'hono/jsx-renderer';
import App from './App.jsx';

const app = new Hono();

app.use('*', jsxRenderer());

app.get('/', () => {
  return <App />
});

export default app;
