"use server"

import { BASE_URL } from "@/constants/constant";
import { cookies } from "next/headers";



const API_URL = `${BASE_URL}/attendance`;

export const createAttendance = async (data: {
    member: string;
    time_in: string;
    time_out: string;
}) => {
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

    if (!res.ok) {
        throw new Error("Failed to create attendance");
    }

    return res.json();
};

export const updateAttendance = async (id: string, data: Partial<{ member: string; time_in: string; time_out: string }>) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken");
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token?.value}`,

        },
        cache: "no-cache",
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error("Failed to update attendance");
    }

    return res.json();
};

export const deleteAttendance = async (id: string) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken");
    const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token?.value}`,
        },
        cache: "no-cache",
    });
    return res.json();
};

export const getAttendanceById = async (id: string) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken");

    const res = await fetch(`${API_URL}/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token?.value}`,
        },
        cache: "no-cache",
    });

    return res.json();
};