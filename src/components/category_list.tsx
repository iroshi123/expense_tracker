

import { getAllCategories } from "@/app/action/category";
import { Category } from "@prisma/client";
import ChangeCategoryName from "./category_edit_form";
import { DeleteCategoryButton } from "./delete_category_button";

interface CategoryListTableProps {
  categorys: Category[];
}


export default async function CategoryListTable() {

    const categorys = await getAllCategories();

  return (
    <div className="mt-6 overflow-x-auto border rounded-lg">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50 text-gray-700">
          <tr>            
            <th className="px-6 py-3 text-left font-semibold">Created At</th>
            <th className="px-6 py-3 text-left font-semibold">Updated At</th>
            <th className="px-6 py-3 text-left font-semibold">Category Name</th>
            <th className="px-6 py-3 text-left font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {categorys.map((category) => (
            <tr key={category.id}>
              <td className="px-6 py-4">
                {new Date(category.CreateAt).toLocaleString()}
              </td>
              <td className="px-6 py-4">
                {new Date(category.UpdateAt).toLocaleString()}
              </td>
              <td className="px-6 py-4">{category.name}</td>
              <td className="flex gap-2">
                {category ? <ChangeCategoryName category={category} /> : <></>}
                {category ? <DeleteCategoryButton id={category?.id} /> : <></>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
