"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AddAndEditPackage from "./AddAndEditPackage";
import { deletePackage } from "../../actions/packages.action";

const PackageActionDropdown = ({ id }: { id: string }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleOpen = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent dropdown from closing
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsDeleting(true);
        try {
            await deletePackage(id);
            toast.success("Package deleted successfully!");
            router.push("/dashboard/packages");
        } catch (error) {
            toast.error("Failed to delete package.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="text-center">
                <Button variant="ghost">•••</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Button variant="ghost" onClick={()=> router.push(`/dashboard/update-package?id=${id}&action=edit`)}>
                            Edit Package
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Button variant="ghost" onClick={handleDelete} disabled={isDeleting}>
                            {isDeleting ? "Deleting..." : "Delete Package"}
                        </Button>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>

            {/* Controlled Dialog Component */}
            <Dialog open={isOpen} onOpenChange={handleClose}>
                <DialogContent className="sm:max-w-[765px] lg:h-3/4 h-5/6 overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Edit Package</DialogTitle>
                    </DialogHeader>
                    <AddAndEditPackage id={id} onClose={handleClose} />
                </DialogContent>
            </Dialog>
        </DropdownMenu>
    );
};

export default PackageActionDropdown;
