import { cors } from "hono/cors";

const isProduction = process.env.NODE_ENV === "production";

const PROD_ORIGINS = ["https://app.yourdomain.com"];

export const corsMiddleware = cors({
  origin: (origin) => {
    if (!isProduction) {
      if (!origin || origin.startsWith("http://localhost") || origin === "http://localhost") {
        return origin || "http://localhost";
      }
    }

    if (isProduction && origin && PROD_ORIGINS.includes(origin)) {
      return origin;
    }

    return null;
  },
  credentials: true,
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
});
