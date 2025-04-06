"use client";

import { insertTag } from "@/app/action/tag";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";


export function TagForm() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const [message, action, isPending] = useActionState(insertTag, null);
  useEffect(() => {
    if (message?.success) {
      router.refresh();
    }
  }, [message, router]);


  return (
    <form action={action}>
      <div className="py-4">
        <label htmlFor="name" className="text-left font-bold block mb-2">
          Tag Name
        </label>
        <div className="flex items-center gap-4">
          <input
            id="name"
            name="name"
            className="w-80 border border-gray-300 rounded-md p-2"
            disabled={isPending}
          />
            <div>
              {message?.error?.fieldErrors.name && (
                <p className="text-xs text-red-500">
                  {message?.error?.fieldErrors.name}
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
      </div>
    </form>
  );
}
