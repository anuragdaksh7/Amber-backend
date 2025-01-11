import { Hono } from "hono";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import { cors } from "hono/cors";
import { bearerAuth } from "hono/bearer-auth";
import AuthMiddleware from "./middleware/auth.middleware";
import type { Context } from "hono/jsx";

const app = new Hono();

app.use('*', cors({
  origin: ['http://localhost:5173'],
  allowMethods: ['POST', 'GET', 'PUT', 'PATCH', 'HEAD', 'DELETE'],
}))
app.use(logger());
app.use('*', secureHeaders());

const authMiddleware = new AuthMiddleware();

app.get('/', (c) => {
  return c.html('<h1>Hello! Hono!</h1>');
});

// app.use('*', authMiddleware.authenticate);

interface User {
  id: string;
}

// Create a custom context type extending the default Context
interface CustomContext extends Context<any> {
  user?: User; // Add the user property
}

app.get('/hello', authMiddleware.authenticate, (c) => {
  console.log("User", c.get("user"));
  return c.html('<h1>Hello! Hono!</h1>');
});


export default app;