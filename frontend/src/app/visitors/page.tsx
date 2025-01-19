"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/ui/header";
import Sidebar from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Visitor {
    _id: string;
    name: string;
    mobile: number;
    visiting_date: string;
    tentative_visiting_date: string;
    email: string;
    visiting_center: string,
    gender: string;
    source: string;
    occupation: string;
    dob: string;
    health_conditions: string;
    marital_status: string;
    remarks: string,
    enquire_mode: string,
}

const VisitorRoute: React.FC = () => {
    const [visitors, setVisitors] = useState<Visitor[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        const fetchVisitors = async () => {
            try {
                const token = localStorage.getItem("authToken");
                if (!token) {
                    throw new Error("Authentication token is missing");
                }
                const response = await fetch("http://localhost:5000/visitors", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                }); if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                console.log("🚀 ~ fetchVisitors ~ data:", data)
                setVisitors(data.visitors);
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchVisitors();
    }, []);

    // Handle delete visitor
    const handleDelete = async (id: string) => {
        try {
            const token = localStorage.getItem("authToken");

            const response = await fetch(`http://localhost:5000/visitors/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to delete visitor");
            }

            // Remove deleted visitor from state
            setVisitors((prevVisitors) => prevVisitors.filter((visitor) => visitor._id !== id));
            toast.success("Visitor Deleted Successfully!"); // Show success message
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
            toast.error("Failed to Delete the Visitor!"); // Show success message
        }
    };

    // Handle update visitor (Dummy example for now)
    const handleUpdate = async (id: string) => {
        router.push(`/visitors/update-visitor/${id}`);
    };

    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex flex-grow">
                <Sidebar />
                <div className="visitors-list p-6 overflow-y-auto">
                    {loading && <p className="text-center text-lg">Loading...</p>}
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    {!loading && !error && visitors.length === 0 && (
                        <p className="text-center text-lg">No vvisitors found.</p>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {!loading &&
                            !error &&
                            visitors.map((visitor) => (
                                <div
                                    key={visitor._id}
                                    className="visitor-card border border-gray-300 rounded-lg shadow-md p-4 bg-white hover:bg-gray-50 transition duration-200 ease-in-out"
                                >
                                    <h2 className="text-xl font-semibold mb-2">{visitor.name}</h2>
                                    <p>
                                        <strong>Mobile:</strong> {visitor.mobile}
                                    </p>
                                    <p>
                                        <strong>Visiting Date:</strong>{" "}
                                        {new Date(visitor.visiting_date).toLocaleDateString()}
                                    </p>
                                    <p>
                                        <strong>Tentative Visiting Date:</strong>{" "}
                                        {new Date(visitor.tentative_visiting_date).toLocaleDateString()}
                                    </p>
                                    <p>
                                        <strong>Email:</strong> {visitor.email}
                                    </p>
                                    <p>
                                        <strong>Visiting Center:</strong> {visitor.visiting_center}
                                    </p>
                                    <p>
                                        <strong>Gender:</strong> {visitor.gender}
                                    </p>
                                    <p>
                                        <strong>Source:</strong> {visitor.source}
                                    </p>
                                    <p>
                                        <strong>Occupation:</strong> {visitor.occupation}
                                    </p>
                                    <p>
                                        <strong>Date of Birth:</strong>{" "}
                                        {new Date(visitor.dob).toLocaleDateString()}
                                    </p>
                                    <p>
                                        <strong>Health Conditions:</strong> {visitor.health_conditions}
                                    </p>
                                    <p>
                                        <strong>Marital Status:</strong> {visitor.marital_status}
                                    </p>
                                    <p>
                                        <strong>Remarks:</strong> {visitor.remarks}
                                    </p>
                                    <p>
                                        <strong>Enquiry Mode:</strong> {visitor.enquire_mode}
                                    </p>
                                    <div className="flex gap-4 mt-4">
                                        <button
                                            onClick={() => router.push("visitors/add-visitor")}
                                            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                        >
                                            Add Visitor
                                        </button>
                                        <button
                                            onClick={() => handleUpdate(visitor._id)}
                                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        >
                                            Update
                                        </button>

                                        <button
                                            onClick={() => handleDelete(visitor._id)}
                                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VisitorRoute;
