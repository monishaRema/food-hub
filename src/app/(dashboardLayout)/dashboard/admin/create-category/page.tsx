import { CreateCategoryForm } from "@/features/admin/createCategoryForm";

export default function CreateCategoryPage() {
  return (
    <div className="flex w-full items-center justify-center px-6 py-10">
      <div className="w-full max-w-4xl">
        <CreateCategoryForm />
      </div>
    </div>
  );
}
