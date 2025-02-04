"use server";

import { cookies } from "next/headers";

const API_URL = "http://localhost:5000/visitors";

// Create a new visitor (POST request)
export const createVisitor = async (data: VisitorParams) => {
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

// Update an existing visitor (PUT request)
export const updateVisitor = async (id: string, data: Partial<VisitorParams>) => {
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

    return res.json();
};

// Delete a visitor (DELETE request)
export const deleteVisitor = async (id: string) => {
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


// Fetch a single visitor by ID (GET request)
export const getVisitorById = async (id: string) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken");

    const res = await fetch(`${API_URL}/${id}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token?.value}`,
        },
        cache: "no-cache",
    });

    return res.json();
};
