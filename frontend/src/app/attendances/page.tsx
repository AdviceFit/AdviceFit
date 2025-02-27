"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/ui/header";
import Sidebar from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { AttendanceDialog } from "./addAttendanceModal";
import { BASE_URL } from "@/constants/constant";

interface Member {
    _id: string;
    name: string;
    email: string;
}

interface Attendance {
    _id: string;
    member: Member;
    time_in: string; // ISO date string
    time_out: string; // ISO date string
}

const AttendanceRoute: React.FC = () => {
    const [attendances, setAttendances] = useState<Attendance[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const router = useRouter();

    // Fetch attendances data
    const fetchAttendances = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `${BASE_URL}/attendance/user?page=${currentPage}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch attendance data");
            }

            const result = await response.json();

            if (result.success && Array.isArray(result.data)) {
                setAttendances(result.data);
                setTotalPages(result.totalPages || 1);
            } else {
                setAttendances([]);
                setError("Unexpected data format from the server");
            }
        } catch (err) {
            console.error("Error fetching attendances:", err);
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAttendances();
    }, [currentPage])

    // Handle delete attendance
    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`${BASE_URL}/attendance/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error("Failed to delete attendance");
            }

            // Remove deleted attendance from state
            setAttendances((prevAttendances) =>
                prevAttendances.filter((attendance) => attendance._id !== id)
            );
            toast.success("Attendance deleted successfully!");
        } catch (err) {
            console.error("Error deleting attendance:", err); // Log error details
            setError(err instanceof Error ? err.message : "An error occurred");
            toast.error("Failed to delete the attendance!");
        }
    };

    // Handle update attendance (future implementation)
    const handleUpdate = async (id: string) => {
        router.push(`/attendances/update-attendance/${id}`);
    };

    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex flex-grow">
                <Sidebar />
                <div className="attendances-list p-6 overflow-y-auto">
                    {loading && <p className="text-center text-lg">Loading...</p>}
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    {!loading && !error && attendances.length === 0 && (
                        <p className="text-center text-lg">No attendances found.</p>
                    )}
                    <div className="flex flex-col">
                        {/* Add Member Button */}
                        <div className="w-10/12 absolute">
                            <div className="float-right">
                                <AttendanceDialog refetch={fetchAttendances} />
                            </div>
                        </div>
                        {/* Attendance Table */}
                        <div className="flex flex-col mt-12 w-10/12 absolute">
                            <div className="py-2">
                                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Member</TableHead>
                                                <TableHead>Email</TableHead>
                                                <TableHead>Time In</TableHead>
                                                <TableHead>Time Out</TableHead>
                                                <TableHead>Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {attendances.map((attendance) => (
                                                <TableRow key={attendance._id}>
                                                    <TableCell>{attendance.member.name ?? (attendance as any).name}</TableCell>
                                                    <TableCell>{attendance.member.email ?? (attendance as any).member}</TableCell>
                                                    {/* Format time_in and time_out */}
                                                    <TableCell>{new Date(attendance.time_in).toLocaleString()}</TableCell>
                                                    <TableCell>{new Date(attendance.time_out).toLocaleString()}</TableCell>
                                                    <TableCell>
                                                        {/* Dropdown Menu for Edit/Delete */}
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                                    •••
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuItem
                                                                    onClick={() => handleUpdate(attendance._id)}
                                                                >
                                                                    Edit
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem
                                                                    onClick={() => handleDelete(attendance._id)}
                                                                    className="text-red-500"
                                                                >
                                                                    Delete
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                            {/* Pagination Controls */}
                            <div className="flex items-center justify-between mt-6">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                >
                                    Previous
                                </Button>
                                <div className="hidden md:flex items-center gap-x-3">
                                    {[...Array(totalPages)].map((_, i) => (
                                        <Button
                                            key={i}
                                            variant='default'
                                            size="sm"
                                            onClick={() => setCurrentPage(i + 1)}
                                        >
                                            {i + 1}
                                        </Button>
                                    ))}
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttendanceRoute;
