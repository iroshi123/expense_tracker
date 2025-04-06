import { CategoryForm } from "@/components/category_form";
import CategoryListTable from "@/components/category_list";

export default function Page() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Create Category</h1>
      <CategoryForm />
      <h2 className="text-lg font-semibold mt-10 mb-2">All Categories</h2>
      <CategoryListTable />
    </div>
  );
}
