import { SignupForm } from "@/features/auth/components/SignupForm";

export default function signupPage() {
  return (
    <div className="flex w-full items-center justify-center px-6 py-25">
      <div className="w-full max-w-2xl">
        <SignupForm></SignupForm>
      </div>
    </div>
  );
}
