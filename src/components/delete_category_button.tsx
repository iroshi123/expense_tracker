"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { deleteCategory } from "@/app/action/category";

export function DeleteCategoryButton({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    await deleteCategory(id);
    setOpen(false);
    setMessage("Caregory has been successfully deleted.");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon" className="text-black">
            <Trash />
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to permanently delete this category? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {message && (
        <div className="mt-4 p-3 bg-green-500 text-white rounded-lg text-center">
          {message}
        </div>
      )}
    </div>
  );
}
