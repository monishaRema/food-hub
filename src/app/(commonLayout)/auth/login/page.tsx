import { LoginForm } from "@/features/auth/components/LoginForm";

export default function loginPage() {
    return (
       <div className="flex w-full items-center justify-center px-6 py-25">
             <div className="w-full max-w-md">
               <LoginForm></LoginForm>
             </div>
        </div>
    );
}