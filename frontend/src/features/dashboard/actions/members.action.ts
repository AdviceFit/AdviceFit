"use server"

const editMembers = async (id: string) => {
    const response = await fetch(`http://localhost:5000/members/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error("Failed to edit member");
    }

    return response.json();
};

const deleteMembers = async (id: string) => {
    const response = await fetch(`http://localhost:5000/members/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error("Failed to delete member");
    }

    return response.json();
};

export { editMembers, deleteMembers };