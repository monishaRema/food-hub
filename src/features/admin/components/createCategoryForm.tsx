"use client";

import Link from "next/link";
import { startTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert, Tag } from "lucide-react";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

import { UserRole } from "@/constants";
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
import { buildLoginRedirectPath } from "@/lib/auth/login-redirect";
import { useAuth } from "@/providers/AuthProvider";
import {
  type CreateCategoryPayload,
  createCategorySchema,
} from "@/lib/schema/category.schema";
import { createCategoryAction } from "@/features/admin/actions/create-category-action";

const defaultValues: CreateCategoryPayload = {
  name: "",
};

const inputClassName =
  "h-11 border-[#eadfd2] bg-white pl-10 focus-visible:ring-[#f97316]/20";

export function CreateCategoryForm({
  ...props
}: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!user) {
      router.replace(buildLoginRedirectPath("/dashboard/admin/create-category"));
    }
  }, [isLoading, router, user]);

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: createCategorySchema,
    },
    onSubmit: async ({ value }) => {
      if (!user) {
        router.replace(buildLoginRedirectPath("/dashboard/admin/create-category"));
        return;
      }

      if (user.role !== UserRole.ADMIN) {
        toast.error("Only admins can create categories.");
        return;
      }

      const toastId = toast.loading("Creating category");

      try {
        const result = await createCategoryAction(value);

        if (!result.success) {
          if (result.reason === "unauthorized") {
            router.replace(buildLoginRedirectPath("/dashboard/admin/create-category"));
            return;
          }

          toast.error(result.message, { id: toastId });
          return;
        }

        form.reset();
        startTransition(() => {
          router.push("/dashboard/admin/categories");
        });
        toast.success("Category created successfully", { id: toastId });
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Unable to create category right now.";

        toast.error(message, { id: toastId });
      }
    },
  });

  if (isLoading) {
    return (
      <Card
        {...props}
        className="max-w-2xl overflow-hidden rounded-[32px] border border-[#eadfd2] bg-[#ffffff] pt-0 shadow-sm"
      >
        <CardHeader className="bg-amber-50 py-5">
          <CardTitle className="text-2xl font-semibold tracking-tight text-stone-900">
            Loading admin access
          </CardTitle>
          <CardDescription className="max-w-2xl text-sm leading-6 text-stone-600">
            Checking your dashboard session before opening category tools.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (user && user.role !== UserRole.ADMIN) {
    return (
      <Card
        {...props}
        className="max-w-2xl overflow-hidden rounded-[32px] border border-[#eadfd2] bg-[#ffffff] pt-0 shadow-sm"
      >
        <CardHeader className="space-y-4 bg-amber-50 py-5">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-red-700 text-white shadow-sm">
            <ShieldAlert className="size-7" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-semibold tracking-tight text-stone-900">
              Admin access required
            </CardTitle>
            <CardDescription className="max-w-2xl text-sm leading-6 text-stone-600">
              Only admin accounts can create meal categories for the platform.
            </CardDescription>
          </div>
        </CardHeader>
        <CardFooter className="border-t border-[#eadfd2] bg-amber-50">
          <Button asChild variant="outline" className="w-full">
            <Link href="/dashboard/admin/categories">Back to categories</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card
      {...props}
      className="max-w-2xl overflow-hidden rounded-[32px] border border-[#eadfd2] bg-[#ffffff] pt-0 shadow-sm"
    >
      <CardHeader className="bg-amber-50 py-5">
        <div className="space-y-2">
          <CardTitle className="text-2xl font-semibold tracking-tight text-stone-900">
            Create a category
          </CardTitle>
          <CardDescription className="max-w-2xl text-sm leading-6 text-stone-600">
            Add a clean category name that admins can use to organize meals
            across the FoodHub catalog.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <form
          id="create-category-form"
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            form.handleSubmit();
          }}
        >
          <FieldGroup className="gap-6">
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Category name</FieldLabel>
                    <div className="relative">
                      <Tag className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-stone-400" />
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        placeholder="Desserts"
                        className={inputClassName}
                        autoComplete="off"
                      />
                    </div>

                    {isInvalid ? (
                      <FieldError errors={field.state.meta.errors} />
                    ) : null}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col items-stretch gap-3 border-t border-[#eadfd2] bg-amber-50">
        <Button
          form="create-category-form"
          type="submit"
          className="h-11 w-full bg-[#f97316] text-white hover:bg-[#ea6b12]"
        >
          Create category
        </Button>
      </CardFooter>
    </Card>
  );
}
