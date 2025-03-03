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
import AddAndEditMembers from "./AddAndEditMembers";
import { deleteMembers, getAllMembers } from '../../actions/members.action';

const MemberActionDropdown = ({ columnData , centers , setMemberState }: { columnData: Record<string , unknown> , centers : CenterParams[] , setMemberState : any }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent dropdown from closing
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleDeleteMember = async (id: string) => {
        await deleteMembers(id)
        const { members } = await getAllMembers();
        setMemberState((prev : any) =>  ({ ...prev , members }))
    }


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
                        <Button variant="ghost" onClick={() => handleDeleteMember(columnData._id as string)}>
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
                    <AddAndEditMembers centers={centers} columnData={columnData} setOpenState={setIsOpen} setMemberState={setMemberState}  />
                </DialogContent>
            </Dialog>
        </DropdownMenu>
    );
}

export default MemberActionDropdown;
