import { ExpenseForm } from "@/components/expense_form";
import ExpenseListTable from "@/components/expense_list";


export default function Page() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Create Expense</h1>
      <ExpenseForm />
      <h2 className="text-lg font-semibold mt-10 mb-2">All Expenses</h2>
      <ExpenseListTable />
    </div>
  );
}
