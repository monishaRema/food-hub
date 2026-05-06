import z from "zod";

  export const registerSchema = z.object({
    name: z.string().trim().min(1, "Name is required"),

    email: z.string().trim().email("Invalid email address"),

    password: z.string().min(6, "Password must be at least 6 characters"),

    phone: z
      .string()
      .trim()
      .regex(/^\d{8}$/, "Phone must be 8 digits")
      .optional()
      .or(z.literal("")),

    image: z
      .string()
      .trim()
      .pipe(z.url("Invalid image URL"))
      .optional()
      .or(z.literal("")),
  });

  export type RegisterUser = z.infer<typeof registerSchema>


    export const loginSchema = z.object({
      email: z.string().trim().pipe(z.email("Invalid email address")),
      password: z.string().min(6, "Password must be at least 6 characters"),
    });
  
    export type LoginType = z.infer<typeof loginSchema>;

