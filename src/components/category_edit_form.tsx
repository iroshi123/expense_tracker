"use client";
import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import { Edit } from "lucide-react";
import { updateCategoryName } from "@/app/action/category";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface ChangeNameProps {
  user: Partial<Category> & { id: string; name: string };
}

export default function ChangeCategoryName({ category }: ChangeNameProps) {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const changeName = async (state: unknown, formData: FormData) => {
    const data = Object.fromEntries(formData);

    try {
      const result = await updateCategoryName(
        category.id as string,
         data.categoryName as string,
      );
     
      router.refresh(); 
      setShow(false); 
      setTimeout(() => router.push("/category"), 500); 
    } catch (error) {
      console.log("An error occurred", error);
      return { success: false, message: "An Error Occurred, try again" };
    }
  };

  const [state, formAction, isPending] = useActionState(changeName, null);

  return (
    <div className="text-md">
      <button
        onClick={() => setShow((pre) => !pre)}
        className="flex mr-2 gap-2 bg-white border-0 my-4">
       Change Category <Edit />
      </button>

      {show && (
        <form action={formAction}>
          <div className="flex">
            <Input
               defaultValue={category?.name}
              name="categoryName"
              disabled={isPending}
              className="mr-2 w-[400px]"
            />

            <Button type="submit" className="">
              Update
            </Button>
          </div>
          {state?.message && <p className="text-red-500">{state.message}</p>}
        </form>
      )}
    </div>
  );
}
