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

interface Center {
  _id: string;
  name: string;
  centerCode: string;
  centerEmail: string;
  mobileNo: string;
  workPhone?: string;
  gstNumber?: string;
  agency?: string;
  biometricSerialNumber?: string;
  address: {
    addressLine1: string;
    addressLine2: string;
    state: string;
    city: string;
    pincode: string;
  };
  aboutUs?: string;
  termsAndConditions?: string;
  createdBy: string;
}

const CenterPage: React.FC = () => {
  const [centers, setCenters] = useState<Center[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const router = useRouter();

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("Authentication token is missing");
        }
        const response = await fetch("http://localhost:5000/center/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCenters(data.data); // Assuming the API returns centers in `data.data`
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCenters();
  }, []);

  // Handle delete center
  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(`http://localhost:5000/centers/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete center");
      }

      // Remove deleted center from state
      setCenters((prevCenters) => prevCenters.filter((center) => center._id !== id));
      toast.success("Center Deleted Successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      toast.error("Failed to Delete the Center!");
    }
  };

  // Handle update center
  const handleUpdate = async (id: string) => {
    router.push(`/centers/update-center/${id}`);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-grow">
        <Sidebar />
        <div className="centers-list p-6 overflow-y-auto">
          {loading && <p className="text-center text-lg">Loading...</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}
          {!loading && !error && centers.length === 0 && (
            <p className="text-center text-lg">No centers found.</p>
          )}
          <div className="flex flex-col">
            <div className="w-10/12 absolute">
              <Button
                onClick={() => router.push("/centers/add-center")}
                className="float-right"
              >
                Add Center
              </Button>
            </div>
            <div className="flex flex-col mt-12 w-10/12 absolute">
              <div className="py-2">
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Center Code</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Mobile</TableHead>
                        <TableHead>Biometric Serial Number</TableHead>
                        <TableHead>City</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {centers.map((center) => (
                        <TableRow key={center._id}>
                          <TableCell>{center.name}</TableCell>
                          <TableCell>{center.centerCode}</TableCell>
                          <TableCell>{center.centerEmail}</TableCell>
                          <TableCell>{center.biometricSerialNumber}</TableCell>
                          <TableCell>{center.mobileNo}</TableCell>
                          <TableCell>{center.address.city}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>•••
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleUpdate(center._id)}>
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleDelete(center._id)}
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

export default CenterPage;
