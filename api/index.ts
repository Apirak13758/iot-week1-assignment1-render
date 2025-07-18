import { Hono } from "hono";
import { cors } from "hono/cors";
import apiRouter from "./routes/api.js";
import { serve } from "@hono/node-server";

const ports = process.env.PORT || 3000;

const app = new Hono().basePath("/api");

app.use(
  "*",
  cors({
    origin: "http://localhost:5173",
    allowHeaders: ["Content-Type"],
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

app.route("/v1", apiRouter);

export const config = {
  runtime: "edge",
};

serve(
  {
    fetch: app.fetch,
    port: ports,
  },
  (info) => {
    console.log(`Server is running on http://${info.address}:${info.port}`);
  }
);

