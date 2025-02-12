// sessions.action.ts
"use server";
import { cookies } from "next/headers";

const API_URL = "http://localhost:5000/sessions";

export const getSessions = async (): Promise<SessionDataParams> => {
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

export const createSession = async (data: SessionParams) => {
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

export const updateSession = async (id: string, data: Partial<SessionParams>) => {    
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

export const deleteSession = async (id: string) => {
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



export const getSessionById = async (id: string): Promise<SessionDataParams> => {
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
