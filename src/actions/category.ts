"use server";

import { db } from "@/src/lib/db";
import { currentRole, currentUser } from "@/src/lib/auth";

import { UserRole } from "@prisma/client";
import { getPartybyId, getPartybyName } from "../data/party";
import { getAllCategory, getCategoryByID, getCategorybyName } from "../data/category";

interface partyAddtionProps {
    name: string
}

export const categoryAddition = async (
    data: partyAddtionProps
) => {
    const user = await currentUser();
    const role = await currentRole();

    const { name } = data;
    if(name.length === 0) {
        return { error: "Category Can't be empty" }
    }
    const lowercaseName = name.toLowerCase();

    const dbCategory = await getCategorybyName(lowercaseName);
    let code = lowercaseName.toUpperCase().substring(0,3);
    const allCategory: any[] = await getAllCategory() || [];
    let arr: any[] = [];
    for (let i = 0; i < allCategory?.length; i++) {
        arr.push(allCategory[i].code);
    }
    let cnt = 0;
    while(arr.includes(code)) {
        cnt++;
        if(cnt === 10) {
            break;
        }
        code = code.substring(0,2).concat(String(cnt));
    } 
    if (dbCategory || cnt === 10) {
        return { error: "Category Already Exist" }
    }

    await db.category.create({
        data: {
            normalizedLowerCase: lowercaseName,
            name,
            code
        },
    });


    const dbCategoryFetch = await getCategorybyName(lowercaseName);
    return { success: "category Added!", data: dbCategoryFetch }
}


export const categoryDelete = async (
    id: string
) => {
    const user = await currentUser();

    const role = await currentRole();

    const dbparty = await getCategoryByID(id);


    if (!dbparty) {
        return { error: "party does not exist" }
    }

    const deletedCategory = await db.category.delete({
        where: { id: id },
    });

    return { success: "Deletion Success!", deletedCategory }
}