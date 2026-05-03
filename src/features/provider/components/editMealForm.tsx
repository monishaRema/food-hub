"use client";

import { ImageIcon, ReceiptText, Salad, Sparkles, Tag, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";

import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

import { DietaryTypeArr, MealAvailabilityArr } from "@/constants";
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
import type { Category } from "@/types/category";
import type { Meal } from "@/types/meal";
import {
  createMealSchema,
  type CreateMealFormValues,
  type CreateMealValues,
} from "@/features/provider/schemas/create-meal-schema";
import { updateMealAction } from "../actions/update-meal.action";

const fieldClassName =
  "h-11 border-[#eadfd2] bg-white focus-visible:ring-[#f97316]/20";

const textAreaClassName =
  "min-h-28 w-full rounded-xl border border-[#eadfd2] bg-white px-3 py-3 text-sm shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:ring-3 focus-visible:ring-[#f97316]/20";

const selectClassName =
  "h-11 w-full rounded-xl border border-[#eadfd2] bg-white px-3 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:ring-3 focus-visible:ring-[#f97316]/20";

export function EditMealForm({
  meal,
  categories,
  ...props
}: React.ComponentProps<typeof Card> & {
  meal: Meal;
  categories: Category[];
}) {
  const router = useRouter();

  const defaultValues: CreateMealFormValues = {
    name: meal.name ?? "",
    image: meal.image ?? "",
    price: meal.price !== undefined && meal.price !== null ? String(meal.price) : "",
    dietary: meal.dietary ?? "VEG",
    excerpt: meal.excerpt ?? "",
    details: meal.details ?? "",
    categoryId: meal.categoryId ?? categories[0]?.id ?? "",
    isFeatured: meal.isFeatured ?? false,
    availability: meal.availability ?? "AVAILABLE",
  };

  const form = useForm({
    defaultValues,
    validators: {
      onSubmit: createMealSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Updating meal");

      try {
        const parsedValues: CreateMealValues = createMealSchema.parse(value);

        await updateMealAction(meal.id, {
          name: parsedValues.name,
          image: parsedValues.image,
          price: parsedValues.price,
          dietary: parsedValues.dietary,
          excerpt: parsedValues.excerpt,
          details: parsedValues.details,
          categoryId: parsedValues.categoryId,
          isFeatured: parsedValues.isFeatured,
          availability: parsedValues.availability,
        });

        toast.success("Meal updated successfully", { id: toastId });
        router.push(`/dashboard/provider/meals/${meal.id}`)
       
    
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unable to update meal";

        toast.error(message, { id: toastId });
      }
    },
  });

  return (
    <Card
      {...props}
      className="overflow-hidden rounded-[32px] border border-[#eadfd2] bg-[#ffffff] shadow-sm pt-0"
    >
      <CardHeader className="space-y-4 bg-amber-50 py-5">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-[#f97316] text-white shadow-sm">
          <Salad className="size-7" />
        </div>
        <div className="space-y-2">
          <CardTitle className="text-2xl font-semibold tracking-tight text-stone-900">
            Edit {meal.name ?? "meal"}
          </CardTitle>
          <CardDescription className="max-w-2xl text-sm leading-6 text-stone-600">
            Update pricing, category, dietary details, availability, and descriptive
            content for this meal.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <form
          id="edit-meal-form"
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
                    <FieldLabel htmlFor={field.name}>Meal name</FieldLabel>
                    <div className="relative">
                      <Salad className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-stone-400" />
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        placeholder="Smoky grilled veggie bowl"
                        className={`${fieldClassName} pl-10`}
                        autoComplete="off"
                      />
                    </div>
                    {isInvalid ? <FieldError errors={field.state.meta.errors} /> : null}
                  </Field>
                );
              }}
            />

            <div className="grid gap-6 md:grid-cols-2">
              <form.Field
                name="image"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Meal image URL</FieldLabel>
                      <div className="relative">
                        <ImageIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-stone-400" />
                        <Input
                          id={field.name}
                          name={field.name}
                          type="url"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(event) =>
                            field.handleChange(event.target.value)
                          }
                          placeholder="https://example.com/meal.jpg"
                          className={`${fieldClassName} pl-10`}
                          autoComplete="url"
                        />
                      </div>
                      {isInvalid ? <FieldError errors={field.state.meta.errors} /> : null}
                    </Field>
                  );
                }}
              />

              <form.Field
                name="price"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Price</FieldLabel>
                      <div className="relative">
                        <Wallet className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-stone-400" />
                        <Input
                          id={field.name}
                          name={field.name}
                          type="number"
                          min="0"
                          step="0.01"
                          value={String(field.state.value)}
                          onBlur={field.handleBlur}
                          onChange={(event) =>
                            field.handleChange(event.target.value)
                          }
                          placeholder="12.50"
                          className={`${fieldClassName} pl-10`}
                          autoComplete="off"
                        />
                      </div>
                      {isInvalid ? <FieldError errors={field.state.meta.errors} /> : null}
                    </Field>
                  );
                }}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <form.Field
                name="dietary"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Dietary type</FieldLabel>
                      <select
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value as CreateMealValues["dietary"])
                        }
                        className={selectClassName}
                      >
                        {DietaryTypeArr.map((dietaryOption) => (
                          <option key={dietaryOption} value={dietaryOption}>
                            {dietaryOption}
                          </option>
                        ))}
                      </select>
                      {isInvalid ? <FieldError errors={field.state.meta.errors} /> : null}
                    </Field>
                  );
                }}
              />

              <form.Field
                name="availability"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Availability</FieldLabel>
                      <select
                        id={field.name}
                        name={field.name}
                        value={field.state.value ?? ""}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(
                            event.target.value as CreateMealValues["availability"],
                          )
                        }
                        className={selectClassName}
                      >
                        {MealAvailabilityArr.map((availabilityOption) => (
                          <option key={availabilityOption} value={availabilityOption}>
                            {availabilityOption}
                          </option>
                        ))}
                      </select>
                      {isInvalid ? <FieldError errors={field.state.meta.errors} /> : null}
                    </Field>
                  );
                }}
              />
            </div>

            <form.Field
              name="categoryId"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Category</FieldLabel>
                    <div className="relative">
                      <Tag className="pointer-events-none absolute top-1/2 left-3 z-10 size-4 -translate-y-1/2 text-stone-400" />
                      <select
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        className={`${selectClassName} pl-10`}
                        disabled={categories.length === 0}
                      >
                        {categories.length === 0 ? (
                          <option value="">No categories available</option>
                        ) : (
                          categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))
                        )}
                      </select>
                    </div>
                    <FieldDescription>
                      Pick one of the available categories for this meal.
                    </FieldDescription>
                    {isInvalid ? <FieldError errors={field.state.meta.errors} /> : null}
                  </Field>
                );
              }}
            />

            <form.Field
              name="excerpt"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Short excerpt</FieldLabel>
                    <div className="relative">
                      <ReceiptText className="pointer-events-none absolute top-4 left-3 size-4 text-stone-400" />
                      <textarea
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        placeholder="A crisp summary of the meal in 100 characters or less"
                        className={`${textAreaClassName} pl-10`}
                      />
                    </div>
                    <FieldDescription>
                      Keep this short for cards and listing previews.
                    </FieldDescription>
                    {isInvalid ? <FieldError errors={field.state.meta.errors} /> : null}
                  </Field>
                );
              }}
            />

            <form.Field
              name="details"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Meal details</FieldLabel>
                    <div className="relative">
                      <ReceiptText className="pointer-events-none absolute top-4 left-3 size-4 text-stone-400" />
                      <textarea
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        placeholder="Describe ingredients, portion size, flavor profile, or prep style"
                        className={`${textAreaClassName} pl-10`}
                      />
                    </div>
                    {isInvalid ? <FieldError errors={field.state.meta.errors} /> : null}
                  </Field>
                );
              }}
            />

            <form.Field
              name="isFeatured"
              children={(field) => (
                <Field>
                  <label className="flex items-start gap-3 rounded-2xl border border-[#eadfd2] bg-white px-4 py-3 text-sm text-stone-700">
                    <input
                      type="checkbox"
                      checked={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.checked)
                      }
                      className="mt-0.5 size-4 accent-[#f97316]"
                    />
                    <span className="space-y-1">
                      <span className="flex items-center gap-2 font-medium text-stone-900">
                        <Sparkles className="size-4 text-[#f97316]" />
                        Mark as featured
                      </span>
                      <span className="block text-stone-500">
                        Featured meals can be highlighted more prominently on
                        the storefront later.
                      </span>
                    </span>
                  </label>
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col items-stretch gap-3 border-t border-[#eadfd2] bg-amber-50">
        <Button
          form="edit-meal-form"
          type="submit"
          className="h-11 w-full bg-[#f97316] text-white hover:bg-[#ea6b12]"
          disabled={categories.length === 0}
        >
          Update meal
        </Button>
        {categories.length === 0 ? (
          <p className="text-center text-sm text-stone-500">
            Create a category first before updating meals.
          </p>
        ) : null}
      </CardFooter>
    </Card>
  );
}
