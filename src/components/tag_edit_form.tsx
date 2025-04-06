"use client";

import { Tag } from "@prisma/client";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { updateTagName } from "@/app/action/tag";


interface ChangeNameProps {
  user: Partial<Tag> & { id: string; name: string };
}

export default function ChangeTagName({ tag }: ChangeNameProps) {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const changeName = async (state: unknown, formData: FormData) => {
    const data = Object.fromEntries(formData);

    try {
      const result = await updateTagName(
        tag.id as string,
         data.tagName as string,
      );
     
      router.refresh(); 
      setShow(false); 
      setTimeout(() => router.push("/tag"), 500); 
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
       Change Tag <Edit />
      </button>

      {show && (
        <form action={formAction}>
          <div className="flex">
            <Input
               defaultValue={tag?.name}
              name="tagName"
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
