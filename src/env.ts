import { createEnv } from "@t3-oss/env-nextjs";

import * as z from "zod";

export const env = createEnv({
  server: {
   
    BACKEND_API: z.url(),
    FRONTEND_API: z.url(),
    API_URL: z.url(),
    AUTH_API_URL: z.url(),
  },
  client: {
     NEXT_PUBLIC_BASE_URL:z.url(),
  },


  runtimeEnv: {
    NEXT_PUBLIC_BASE_URL:process.env.NEXT_PUBLIC_BASE_URL,
    BACKEND_API: process.env.BACKEND_API,
    FRONTEND_API: process.env.FRONTEND_API,
    API_URL: process.env.API_URL,
    AUTH_API_URL: process.env.AUTH_API_URL,
  },
});