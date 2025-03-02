"use client"
import { useEffect, useState } from 'react';
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
import AddAndEditMembers from "./AddAndEditMembers";

const MemberActionDropdown = ({ columnData , centers}: { columnData: Record<string , unknown> , centers : CenterParams[] }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent dropdown from closing
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="text-center">
                <Button variant="ghost">•••</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Button variant="ghost" onClick={handleOpen}>
                            Edit members
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Button variant="ghost">
                            Delete members
                        </Button>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>

            {/* Controlled Dialog Component */}
            <Dialog open={isOpen} onOpenChange={handleClose}>
                <DialogContent className="sm:max-w-[765px] lg:h-3/4 h-5/6 overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Edit Members</DialogTitle>
                    </DialogHeader>
                    <AddAndEditMembers centers={centers} columnData={columnData} setOpenState={setIsOpen}  />
                </DialogContent>
            </Dialog>
        </DropdownMenu>
    );
}

export default MemberActionDropdown;
