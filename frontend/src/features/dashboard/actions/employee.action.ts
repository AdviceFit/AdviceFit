"use server";

import { cookies } from "next/headers";

const API_URL = "http://localhost:5000/employee";


export const getEmployees = async (): Promise<EmployeesDataParams> => {
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


// Create a new employee (POST request)
export const createEmployee = async (data: EmployeeParams) => {
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

// Update an existing employee (PATCH request)
export const updateEmployee = async (id: string, data: Partial<EmployeeParams>) => {
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

// Delete a employee (DELETE request)
export const deleteEmployee = async (id: string) => {
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
