"use client";

import { startTransition } from "react";
import { useRouter } from "next/navigation";
import { MessageSquareQuote, Star } from "lucide-react";

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
import { createReviewAction } from "@/features/meals/action/CeateReview";
import { buildLoginRedirectPath } from "@/lib/auth/login-redirect";
import { createReviewSchema } from "@/lib/schema/review.schema";

type ReviewFormValues = {
  mealId: string;
  orderId: string;
  rating: number;
  content: string;
};

const fieldClassName =
  "h-11 border-[#eadfd2] bg-white focus-visible:ring-[#f97316]/20";

const textAreaClassName =
  "min-h-32 w-full rounded-xl border border-[#eadfd2] bg-white px-3 py-3 text-sm shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:ring-3 focus-visible:ring-[#f97316]/20";

export function ReviewForm({
  mealId,
  orderId,
  ...props
}: React.ComponentProps<typeof Card> & { mealId: string; orderId: string }) {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      mealId,
      orderId,
      rating: 5,
      content: "",
    } satisfies ReviewFormValues,
    validators: {
      onSubmit: createReviewSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Submitting review");

      try {
        const result = await createReviewAction({
          mealId: value.mealId,
          orderId: value.orderId,
          rating: value.rating,
          content: value.content,
        });

        if (!result.success) {
          if (result.reason === "unauthorized") {
            router.replace(buildLoginRedirectPath(`/meals/${mealId}`));
            return;
          }

          toast.error(result.message, { id: toastId });
          return;
        }

        form.reset();
        toast.success("Review posted successfully.", { id: toastId });
        startTransition(() => {
          router.refresh();
        });
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Unable to submit your review right now.",
          { id: toastId },
        );
      }
    },
  });

  return (
    <Card
      {...props}
      className="w-full overflow-hidden rounded-[32px] border border-[#eadfd2] bg-[#ffffff] pt-0 shadow-sm"
    >
      <CardHeader className="space-y-4 bg-amber-50 py-5">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-[#f97316] text-white shadow-sm">
          <MessageSquareQuote className="size-7" />
        </div>
        <div className="space-y-2">
          <CardTitle className="text-2xl font-semibold tracking-tight text-stone-900">
            Share your review
          </CardTitle>
          <CardDescription className="max-w-2xl text-sm leading-6 text-stone-600">
            Your delivered order has already been verified by the backend. Share
            your rating and tell other customers what you thought about this meal.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <form
          id="create-review-form"
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            form.handleSubmit();
          }}
        >
          <FieldGroup className="gap-6">
            <form.Field
              name="rating"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Rating</FieldLabel>
                    <div className="relative">
                      <Star className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-stone-400" />
                      <Input
                        id={field.name}
                        name={field.name}
                        type="number"
                        min="1"
                        max="5"
                        step="1"
                        value={String(field.state.value)}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(Number(event.target.value))
                        }
                        placeholder="5"
                        className={`${fieldClassName} pl-10`}
                      />
                    </div>
                    <FieldDescription>
                      Choose a whole number from 1 to 5.
                    </FieldDescription>
                    {isInvalid ? (
                      <FieldError errors={field.state.meta.errors} />
                    ) : null}
                  </Field>
                );
              }}
            />

            <form.Field
              name="content"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Review</FieldLabel>
                    <textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                      placeholder="Tell others what stood out about the meal, taste, and delivery experience."
                      className={textAreaClassName}
                    />
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
          form="create-review-form"
          type="submit"
          className="h-11 w-full bg-[#f97316] text-white hover:bg-[#ea6b12]"
        >
          Post review
        </Button>
      </CardFooter>
    </Card>
  );
}
