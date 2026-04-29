"use client";

import { Store, MapPinHouse, ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

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
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { registerProvider } from "@/features/provider/actions/register-provider";
import {
  registerProviderSchema,
  type RegisterProviderValues,
} from "@/features/provider/schemas/register-provider-schema";
import { useAuth } from "@/providers/AuthProvider";

const defaultValues: RegisterProviderValues = {
  shopName: "",
  address: "",
  shopImage: "",
};

export function BecomeProviderForm({
  ...props
}: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const { refetchUser } = useAuth();

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: registerProviderSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Submitting provider application");

      try {
        await registerProvider({
          shopName: value.shopName.trim(),
          address: value.address.trim(),
          ...(value.shopImage?.trim()
            ? { shopImage: value.shopImage.trim() }
            : {}),
        });

        await refetchUser();
        router.refresh();
        router.push("/dashboard/provider");

        toast.success("You are now a provider on FoodHub", { id: toastId });
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Unable to register provider profile";

        toast.error(message, { id: toastId });
      }
    },
  });

  return (
    <Card
      {...props}
      className="overflow-hidden rounded-[32px] border border-[#eadfd2] bg-[#f7f1e9] shadow-sm"
    >
      <CardHeader className="space-y-4 bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.16),_transparent_38%),linear-gradient(135deg,_rgba(255,255,255,0.72),_rgba(247,241,233,0.96))]">
        <div className="space-y-2">
          <CardTitle className="text-2xl font-semibold tracking-tight text-stone-900">
            Become a provider
          </CardTitle>
          <CardDescription className="max-w-2xl text-sm leading-6 text-stone-600">
            Set up your shop profile so customers can discover your meals.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <form
          id="become-provider-form"
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            form.handleSubmit();
          }}
        >
          <FieldGroup className="gap-6">
            <form.Field
              name="shopName"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Shop name</FieldLabel>
                    <div className="relative">
                      
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        placeholder="Enter your shop name"
                        className="h-11 border-[#eadfd2] bg-white pl-10 focus-visible:ring-[#f97316]/20"
                        autoComplete="organization"
                      />
                    </div>

                    {isInvalid ? (
                      <FieldError errors={field.state.meta.errors} />
                    ) : null}
                  </Field>
                );
              }}
            />

            <form.Field
              name="address"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Shop address</FieldLabel>
                    <div className="relative">
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        placeholder="Enter your shop address"
                        className="h-11 border-[#eadfd2] bg-white pl-10 focus-visible:ring-[#f97316]/20"
                        autoComplete="street-address"
                      />
                    </div>
                 
                    {isInvalid ? (
                      <FieldError errors={field.state.meta.errors} />
                    ) : null}
                  </Field>
                );
              }}
            />

            <form.Field
              name="shopImage"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Shop image URL</FieldLabel>
                    <div className="relative">
                      <Input
                        id={field.name}
                        name={field.name}
                        type="url"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        placeholder="https://example.com/your-shop-image.jpg"
                        className="h-11 border-[#eadfd2] bg-white pl-10 focus-visible:ring-[#f97316]/20"
                        autoComplete="url"
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

      <CardFooter className="flex flex-col items-stretch gap-3 border-t border-[#eadfd2] bg-white/70">
        <Button
          form="become-provider-form"
          type="submit"
          className="h-11 w-full bg-[#f97316] text-white hover:bg-[#ea6b12]"
        >
          Submit request
        </Button>
       
      </CardFooter>
    </Card>
  );
}
