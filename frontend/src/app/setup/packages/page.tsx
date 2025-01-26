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
import { Center } from "../centers/add-center/page";

export interface Package {
    _id: string;
    packageName: string;
    price: number;
    center: Center;
    productType: string;
    noOfDays: number;
    packageTiming: string;
    trainingType: string;
    packageType: string;
    freezeSubscription: {
        enabled: boolean;
        maxFreezeDuration?: number;
    };
    showAtAdviceFit: boolean;
}

const PackageRoute: React.FC = () => {
    const [packages, setPackages] = useState<Package[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const router = useRouter();

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const response = await fetch("http://localhost:5000/packages", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch packages");
                }

                const data = await response.json();
                setPackages(data.packages);
                setTotalPages(data.totalPages || 1);
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchPackages();
    }, []);

    // Handle delete package
    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:5000/packages/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("Failed to delete package");
            }

            setPackages((prev) => prev.filter((pkg) => pkg._id !== id));
            toast.success("Package deleted successfully!");
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "An error occurred");
        }
    };

    // Handle update package
    const handleUpdate = (id: string) => {
        router.push(`/setup/packages/update-package/${id}`);
    };

    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex flex-grow" style={{ height: "calc(100vh - 64px)" }}>
                <Sidebar />
                <div className="packages-list p-6 overflow-y-auto" style={{ width: "calc(100vw - 64px)" }}>
                    {loading && <p className="text-center text-lg">Loading...</p>}
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    {!loading && !error && packages.length === 0 && (
                        <p className="text-center text-lg">No packages found.</p>
                    )}
                    <div className="flex flex-col">
                        <div className="w-10/12 absolute">
                            <Button
                                onClick={() => router.push("/setup/packages/add-package")}
                                className="float-right"
                            >
                                Add Package
                            </Button>
                        </div>
                        <div className="flex flex-col mt-12 w-10/12 absolute">
                            <div className="py-2">
                                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Package Name</TableHead>
                                                <TableHead>Gym Name</TableHead>
                                                <TableHead>Training Type</TableHead>
                                                <TableHead>Package Timimg</TableHead>
                                                <TableHead>Package Type</TableHead>
                                                <TableHead>Product Type</TableHead>
                                                <TableHead>Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {packages.map((pkg) => (
                                                <TableRow key={pkg._id}>
                                                    <TableCell>
                                                        <div className="flex  flex-col space-y-1">
                                                            <span>
                                                                {pkg.packageName}
                                                            </span>
                                                            <span>
                                                            ₹ {pkg.price} for {pkg.noOfDays} days
                                                            </span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>{pkg.center.name}</TableCell>
                                                    <TableCell>{pkg.trainingType}</TableCell>
                                                    <TableCell>{pkg.packageTiming}</TableCell>
                                                    <TableCell>{pkg.packageType}</TableCell>
                                                    <TableCell>{pkg.productType}</TableCell>
                                                    <TableCell>
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                                    <span className="sr-only">Open menu</span>•••
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end">
                                                                <DropdownMenuItem onClick={() => handleUpdate(pkg._id)}>
                                                                    Edit
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem
                                                                    onClick={() => handleDelete(pkg._id)}
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
                                            variant="default"
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

export default PackageRoute;
