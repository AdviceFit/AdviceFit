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
} from "@/components/ui/dialog";
import AddAndEditCenters from './AddAndEditCenters';
import { deleteCenter } from '../../actions/centers.action';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const CenterrActionDropdown = ({ id }: { id: string }) => {
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
        setIsDeleting(true);
        try {
            await deleteCenter(id);
            toast.success("Center deleted successfully!");
            router.push("/dashboard/centers");
        } catch (error) {
            toast.error("Failed to delete attendance.");
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
                        <Button
                            variant="ghost"
                            onClick={() => router.push(`/dashboard/update-center?id=${id}&action=edit`)}
                        >
                            Edit Center
                        </Button>

                    </DropdownMenuItem>
                    <DropdownMenuItem >
                        <Button variant="ghost" onClick={handleDelete} disabled={isDeleting}>
                            {isDeleting ? "Deleting..." : "Delete Center"}
                        </Button>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>

            {/* Controlled Dialog Component */}
            <Dialog open={isOpen} onOpenChange={handleClose}>
                <DialogContent className="sm:max-w-[765px] lg:h-3/4 h-5/6 overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Edit Center</DialogTitle>
                    </DialogHeader>
                    <AddAndEditCenters id={id} onClose={handleClose} />
                </DialogContent>
            </Dialog>
        </DropdownMenu>
    );
}

export default CenterrActionDropdown;
