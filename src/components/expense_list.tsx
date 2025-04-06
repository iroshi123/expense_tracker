

import { getAllCategories } from "@/app/action/category";
import { Category, Expense } from "@prisma/client";
import ChangeCategoryName from "./category_edit_form";
import { DeleteCategoryButton } from "./delete_category_button";
import { getAllExpenses } from "@/app/action/expense";

interface ExpenseListTableProps {
  Expenses: Expense[];
}


export default async function ExpenseListTable() {

    const expenses = await getAllExpenses();

  return (
    <div className="mt-6 overflow-x-auto border rounded-lg">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50 text-gray-700">
          <tr>            
            <th className="px-6 py-3 text-left font-semibold">Created At</th>
            <th className="px-6 py-3 text-left font-semibold">Updated At</th>
            <th className="px-6 py-3 text-left font-semibold">Category</th>
            <th className="px-6 py-3 text-left font-semibold">Amount</th>
            <th className="px-6 py-3 text-left font-semibold">Description</th>
            <th className="px-6 py-3 text-left font-semibold">Expense date</th>
            
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td className="px-6 py-4">
                {new Date(expense.CreateAt).toLocaleString()}
              </td>
              <td className="px-6 py-4">
                {new Date(expense.UpdateAt).toLocaleString()}
              </td>
              <td className="px-6 py-4">
                {expense.CategoryId}
                  </td>
                  <td className="px-6 py-4">
                {expense.amount}
                  </td>
                  <td className="px-6 py-4">
                {expense.description}
                  </td>
                  <td className="px-6 py-4">
                {expense.date.toLocaleString()}
                  </td>
              {/* <td className="flex gap-2">
                {expense ? <ChangeCategoryName expense={expense} /> : <></>}
                {category ? <DeleteCategoryButton id={category?.id} /> : <></>}
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
