"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

export function ProviderOrderStatusSubmitButton({
  label,
}: {
  label: string;
}) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="sm" disabled={pending}>
      {pending ? "Updating..." : label}
    </Button>
  );
}
