import app from "./app";

console.log("App running on port " + (Bun.env.PORT || 3500))

Bun.serve({
  fetch: app.fetch,
  port: Bun.env.PORT || 3500,
});