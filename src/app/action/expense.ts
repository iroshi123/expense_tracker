"use server"

import { PrismaClient } from "@prisma/client";
import { z } from "zod";



const prisma = new PrismaClient();

export async function insertExpense(state: unknown, formData: FormData) {

    try {


        const expenseSchema = z.object({
            category: z.string().min(1, { message: "Category is required" }),
            tags: z.preprocess((arg) => String(arg), z.string()),
            amount: z.string().min(1, ({ message: "Amount is required" })),
            description: z.string().min(1, ({ message: "Description is required" })),
            date: z.string().date("Invalid date string!").transform((arg) => new Date(arg)),

        });


        console.log(Object.fromEntries(formData));

        const parsedData = expenseSchema.safeParse(Object.fromEntries(formData));


        if (!parsedData.success) {
            console.log(parsedData.error)
            return { success: false, message: parsedData.error.format(), error: parsedData.error.flatten() };
        }



        const categoryName = formData.get("category") as string;

        const categoryId = await getCategoryId(categoryName);

        const splitTags = (formData.get("tags") as string).split(",");


        const tagIds: string[] = [];


        for (let d of splitTags) {
            tagIds.push(await getTagId(d));
        }


        const expense = await prisma.expense.create({
            data: {

                CategoryId: parseInt(categoryId as string),
                amount: parseFloat(formData.get("amount") as string),
                description: formData.get("description") as string,
                date: new Date(formData.get("date") as string),
                tags: { connect: tagIds.map((id) => ({ id })) },
            },
        });

        console.log("Expense created successfully:", expense);
        return { success: true, message: "Expense created successfully!", expense };
    } catch (error) {
        console.error("Error adding expense:", error);
        return { success: false, message: "Failed to add expense." };
    } finally {
        await prisma.$disconnect();
    }
}

export async function getCategoryId(category: string) {

    let tmpcategory = await prisma.category.findUnique({
        where: { name: category },
    });

    if (!tmpcategory) {
        await prisma.category.create({
            data: { name: category }
        });
        tmpcategory = await prisma.category.findUnique({
            where: { name: category },
        });

    }
    if (tmpcategory)
        return tmpcategory.id
    return ""
}

export async function getTagId(tag: string) {

    let tmptag = await prisma.tag.findUnique({
        where: { name: tag },
    });

    if (!tmptag) {
        await prisma.tag.create({
            data: { name: tag }
        });
        tmptag = await prisma.tag.findUnique({
            where: { name: tag },
        });

    }
    if (tmptag)
        return tmptag.id
    return ""
}


export async function getAllExpenses() {
    return await prisma.expense.findMany({
        orderBy: {
            id: "desc",
        },
    });
}
