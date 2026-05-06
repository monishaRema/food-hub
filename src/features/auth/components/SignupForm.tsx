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

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import Link from "next/link";
import { registerSchema } from "@/lib/schema/auth.schema";
import { registerUserAction } from "../action/auth.action";
import type { RegisterUser } from "@/lib/schema/auth.schema";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const defaultUser: RegisterUser = {
    name: "",
    email: "",
    password: "",
    phone: "",
    image: "",
  };

  const router = useRouter();

  const form = useForm({
    defaultValues: defaultUser,
    validators: {
      onSubmit: registerSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating user");
      try {
        const payload: RegisterUser = {
          name: value.name.trim(),
          email: value.email.trim(),
          password: value.password.trim(),
        };

        if (value.phone?.trim()) {
          payload.phone = value.phone.trim();
        }
        if (value.image?.trim()) {
          payload.image = value.image.trim();
        }

        const user = await registerUserAction(payload);
        
        if (!user.data) {
          throw new Error("Register Failed");
        }

        toast.success("User created successfully", { id: toastId });
        router.push("/auth/login");
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Something went wrong";

        toast.error(message, { id: toastId });
      }
    },
  });

  return (
    <Card
      {...props}
      className="overflow-hidden rounded-[32px] border border-[#eadfd2] bg-[#ffffff] shadow-sm max-w-2xl pt-0"
    >
      <CardHeader className="bg-amber-50 py-5">
        <CardTitle className="text-xl font-bold">Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form
          id="signup-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter your name"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
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
                      autoComplete="off"
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
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            <form.Field
              name="phone"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                    <Input
                      type="password"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter your phone"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            <form.Field
              name="image"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Image</FieldLabel>
                    <Input
                      type="password"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Paste your profile image url"
                      autoComplete="off"
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
      <CardFooter className="flex flex-col items-stretch gap-3 border-t border-[#eadfd2] bg-amber-50">
        <Button form="signup-form" type="submit" className="w-full py-5">
          Signup
        </Button>
        <div className="flex justify-center gap-2">
          <span>Already have account?</span>
          <Link href={"/auth/login"} className="text-orange-500">
            Login
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
