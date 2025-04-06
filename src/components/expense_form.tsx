"use client";

import { getAllCategories } from "@/app/action/category";
import { insertExpense } from "@/app/action/expense";
import { Router } from "lucide-react";
import { useRouter } from "next/router";

import { useActionState, useEffect, useState } from "react";

export function ExpenseForm() {
  // const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);


  const [message, action, isPending] = useActionState(insertExpense, null);
  useEffect(() => {
    if (message?.success) {
      // router.refresh();
    }
  }, [message, Router]);

  return (
     <form action={action}>
       <div className="py-4">
         <label htmlFor="category" className="text-left font-bold block mb-2">
         Category 
         </label>
         <div className="flex items-center gap-4">
           <input
             id="category"
             name="category"
             className="w-80 border border-gray-300 rounded-md p-2"
             disabled={isPending}
           />
           </div>
           <div>
              {message?.error?.fieldErrors.category && (
                <p className="text-xs text-red-500">
                  {message?.error?.fieldErrors.category}
                </p>
              )}
            </div> 

            <label htmlFor="tags" className="text-left font-bold block mb-2">
        Tags
        </label>
        <div className="flex items-center gap-4">
          <textarea
            id="tags"
            name="tags"
            className="w-80 border border-gray-300 rounded-md p-2"
            disabled={isPending}
          />
          </div>  
          <div>
              {message?.error?.fieldErrors.tags && (
                <p className="text-xs text-red-500">
                  {message?.error?.fieldErrors.tags}
                </p>
              )}
            </div> 
      
        <label htmlFor="amount" className="text-left font-bold block mb-2">
        Amount
        </label>
        <div className="flex items-center gap-4">
          <input
            id="amount"
            name="amount"
            className="w-80 border border-gray-300 rounded-md p-2"
            disabled={isPending}
          />
          </div>
          <div>
              {message?.error?.fieldErrors.amount && (
                <p className="text-xs text-red-500">
                  {message?.error?.fieldErrors.amount}
                </p>
              )}
            </div>

        <label htmlFor="description" className="text-left font-bold block mb-2">
        Description
        </label>
        <div className="flex items-center gap-4">
          <textarea
            id="description"
            name="description"
            className="w-80 border border-gray-300 rounded-md p-2"
            disabled={isPending}
          />
          </div>
          <div>
              {message?.error?.fieldErrors.description && (
                <p className="text-xs text-red-500">
                  {message?.error?.fieldErrors.description}
                </p>
              )}
            </div>

            
        <label htmlFor="date" className="text-left font-bold block mb-2">
        Expense Date
        </label>
        <div className="flex items-center gap-4">
          <input
            id="date"
            name="date"
            className="w-80 border border-gray-300 rounded-md p-2"
            disabled={isPending}
            type="date"
          />
          </div> 
          <div>
              {message?.error?.fieldErrors.date && (
                <p className="text-xs text-red-500">
                  {message?.error?.fieldErrors.date}
                </p>
              )}
            </div>   
          

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            {isPending ? "Saving..." : "Save"}
          </button>
          </div>   
       
    </form>
  );
}
