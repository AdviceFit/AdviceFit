
"use server"

import { cookies } from "next/headers";

const API_URL = "http://localhost:5000/center";


export const getCenters = async (): Promise<CentersDataParams> => {
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken")
  
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



export const createCenter = async (data: CenterParams) => {
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

export const updateCenter = async (id: string, data: Partial<{ name: string; location: string }>) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("authToken");

    const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token?.value}`,
        },
        cache: "no-cache",
        body: JSON.stringify(data),
    });

    return res.json();
};

export const deleteCenter = async (id: string) => {
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
