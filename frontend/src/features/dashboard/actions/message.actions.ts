"use server";
import { BASE_URL } from "@/constants/constant";
import { cookies } from "next/headers";

const API_URL = `${BASE_URL}/messages`;

// Fetch all bulk messages
export const getMessagesHistory = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken");

    const res = await fetch(API_URL, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token?.value}`,
        },
        cache: "no-cache",
    });

    return res.json();
};

// Send bulk messages

//To-do for type any
export const sendBulkMessage = async (data : any) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken");

    const res = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token?.value}`,
        },
        cache: "no-cache",
        body: JSON.stringify(data),
    });

    return res.json();
};
