import type { Metadata } from "next";

import { SignupForm } from "@/features/auth/components/SignupForm";

export const metadata: Metadata = {
  title: "Create account",
  description: "Create a FoodHub account to order meals, review providers, and manage your dashboard experience.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function signupPage() {
  return (
    <div className="flex w-full items-center justify-center px-6 py-25">
      <div className="w-full max-w-2xl">
        <SignupForm></SignupForm>
      </div>
    </div>
  );
}
