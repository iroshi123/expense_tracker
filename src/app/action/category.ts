"use server"

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";



const prisma = new PrismaClient();



export async function insertCategory(state: unknown, formData: FormData) {
  
    try {
      const categorySchema = z.object({
        name: z.string().min(1, { message: "Category Name cannot be empty" }),
       
      });

      const result = categorySchema.safeParse(Object.fromEntries(formData));

      if (!result.success) {
  
        console.log(result.error.flatten());
  
        return {
          sucess: false,
          message: "Error in your input data",
          error: result.error.flatten(),
        };
      }
    
    
    const category = await prisma.category.create({
      data: {
        name: formData.get("name") as string,
        
      },
    });

    console.log("Category created successfully:", category);
    return { success: true, message: "Category created successfully!", category };
  } catch (error) {
    console.error("Error adding category:", error);
    return { success: false, message: "Failed to add category." };
  } finally {
    await prisma.$disconnect();
  }
}



export async function getAllCategories() {
  return await prisma.category.findMany({
    orderBy: {
      id: "desc",
    },
  });
}


export async function updateCategoryName(categoryId: string, name: string) {
    try {
      
  
      // Update the user role in the database
      const category = await prisma.category.update({
        where: {
          id: categoryId as unknown as number, // Find the user by their ID
        },
        data: {
          name: name, // Set the new role
        },
      });

      return { success: true, category };
    } catch (error) {
      console.error("Error updating category name:", error);
      throw new Error("Error updating category name");
    }
  }
  

  export async function deleteCategory(id: string) {
    try {
      await prisma.category.delete({ where: { id : id as unknown as number } });
      revalidatePath("/");
      return { success: true, message: "Category deleted successfully!" };
    } catch (error) {
      console.error("Error deleting category:", error);
      return { success: false, message: "Failed to delete category." };
    }
  
  }