import type { Metadata } from "next";

import { LoginForm } from "@/features/auth/components/LoginForm";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to your FoodHub account to manage orders, providers, and dashboard tools.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function loginPage() {
    return (
       <div className="flex w-full items-center justify-center px-6 py-25">
             <div className="w-full max-w-2xl">
               <LoginForm></LoginForm>
             </div>
        </div>
    );
}
