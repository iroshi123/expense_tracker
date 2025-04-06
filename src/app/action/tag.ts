"use server"

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";


const prisma = new PrismaClient();



export async function insertTag(state: unknown, formData: FormData) {
       try {
         const tagSchema = z.object({
           name: z.string().min(1, { message: "Tag Name cannot be empty" }),
          
         });
   
         const result = tagSchema.safeParse(Object.fromEntries(formData));
   
         if (!result.success) {
     
           console.log(result.error.flatten());
     
           return {
             sucess: false,
             message: "Error in your input data",
             error: result.error.flatten(),
           };
         }

        const tag = await prisma.tag.create({
            data: {
                name: formData.get("name") as string,

            },
        });

        console.log("Tag created successfully:", tag);
        return { success: true, message: "Tag created successfully!", tag };
    } catch (error) {
        console.error("Error adding tag:", error);
        return { success: false, message: "Failed to add tag." };
    } finally {
        await prisma.$disconnect();
    }

}
export async function getAllTags() {
    return await prisma.tag.findMany({
        orderBy: {
            id: "desc",
        },
    });
}


export async function updateTagName(tagId: string, name: string) {
    try {


        // Update the user role in the database
        const tag = await prisma.tag.update({
            where: {
                id: tagId as unknown as number, // Find the user by their ID
            },
            data: {
                name: name, // Set the new role
            },
        });

        return { success: true, tag };
    } catch (error) {
        console.error("Error updating tag name:", error);
        throw new Error("Error updating tag name");
    }
}




export async function deleteTag(id: string) {
    try {
        await prisma.tag.delete({ where: { id: id as unknown as number } });
        revalidatePath("/");
        return { success: true, message: "Tag deleted successfully!" };
    } catch (error) {
        console.error("Error deleting tag:", error);
        return { success: false, message: "Failed to delete tag." };
    }

}
