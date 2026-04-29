"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { env } from "@/env";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";
import Link from "next/link";
import { useAuth } from "@/providers/AuthProvider";

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const { setUser } = useAuth();

  const loginSchema = z.object({
    email: z.string().trim().pipe(z.email("Invalid email address")),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  type LoginType = z.infer<typeof loginSchema>;

  const defaultLogin: LoginType = {
    email: "",
    password: "",
  };

  const form = useForm({
    defaultValues: defaultLogin,

    validators: {
      onSubmit: loginSchema,
    },

    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Logging in");

      try {
        const payload: LoginType = {
          email: value.email.trim(),
          password: value.password.trim(),
        };

        const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(payload),
        });

        const result = await res.json();

        if (!res.ok || !result.success) {
          const errorMessage =
            result?.errorDetails?.[0]?.message ||
            result.message ||
            "Login failed";

          throw new Error(errorMessage);
        }
      
        setUser(result.data);

        toast.success("Login successful", { id: toastId });
        router.push("/");
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Something went wrong";

        toast.error(message, { id: toastId });
      }
    },
  });

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          Login to your account
        </CardTitle>
        <CardDescription>
          Enter your email and password below to login
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      type="email"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter your email"
                      autoComplete="email"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      type="password"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-5">
        <Button form="login-form" type="submit" className="w-full py-5">
          Login
        </Button>
        <div className="flex justify-center gap-2">
          <span>Do not have account?</span>
          <Link href={"/auth/signup"} className="text-orange-500">
            Create Account
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
