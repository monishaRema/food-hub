import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    BACKEND_BASE_URL: z.url(),
    FRONTEND_BASE_URL: z.url(),
    API_URL: z.url(),
  },

  client: {
    NEXT_PUBLIC_BASE_URL: z.url(),
    NEXT_PUBLIC_API_URL: z.url(),
  },

  runtimeEnv: {
    BACKEND_BASE_URL: process.env.BACKEND_BASE_URL,
    FRONTEND_BASE_URL: process.env.FRONTEND_BASE_URL,
    API_URL: process.env.API_URL,

    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
});