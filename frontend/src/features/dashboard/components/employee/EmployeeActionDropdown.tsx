"use client"
import { useState } from 'react';
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
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import AddAndEditEmployee from './AddAndEditEmployee';
import { deleteEmployee } from '../../actions/employee.action';

const EmployeeActionDropdown = ({ id }: { id: string }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false);

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
            await deleteEmployee(id);
            toast.success("Employee deleted successfully!");
            router.push("/dashboard/employees");
        } catch (error) {
            toast.error("Failed to delete Employees.");
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
                        <Button variant="ghost" onClick={()=> router.push(`/dashboard/update-employee?id=${id}&action=edit`)}>
                            Edit Employee
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Button variant="ghost" onClick={handleDelete} disabled={isDeleting}>
                            {isDeleting ? "Deleting..." : "Delete Employee"}
                        </Button>
                    </DropdownMenuItem>

                </DropdownMenuGroup>
            </DropdownMenuContent>

            {/* Controlled Dialog Component */}
            <Dialog open={isOpen} onOpenChange={handleClose}>
                <DialogContent className="sm:max-w-[765px] lg:h-3/4 h-5/6 overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Edit Employee</DialogTitle>
                    </DialogHeader>
                    <AddAndEditEmployee id={id} onClose={handleClose} />
                </DialogContent>
            </Dialog>
        </DropdownMenu>
    );
}

export default EmployeeActionDropdown;
