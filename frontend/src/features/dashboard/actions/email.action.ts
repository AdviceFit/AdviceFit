"use server";

import { BASE_URL } from "@/constants/constant";
import { cookies } from "next/headers";

const API_URL = `${BASE_URL}/email`;

const sendEmail = async (payload: unknown) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken");

    const response = await fetch(`${API_URL}`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token?.value}`,
        },
    });

    //chat-gpt handle error-code (to-do)
    const text = await response.text(); 

    try {
        const data = text ? JSON.parse(text) : null; 

        if (!response.ok) {
            return { error: data?.error ?? "Failed to send email" };
        }

        return data;
    } catch (error) {
        console.error("Failed to parse JSON:", error);
        return { error: "Invalid server response" };
    }
};

const getEmails = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken");

    const response = await fetch(`${API_URL}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token?.value}`,
        },
        cache: "no-cache",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch emails");
    }

    return response.json();
};

export { sendEmail, getEmails };
