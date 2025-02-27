'use client'

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddAndEditMembers from "./AddAndEditMembers";
import { useState } from "react";

const MembersHeader = ({ centers } : { centers : CenterParams[] }) => {
  const [openState, setOpenState] = useState(false);

  return (
    <Dialog open={openState} onOpenChange={setOpenState}>
      <DialogTrigger asChild>
        <Button variant="default" className="relative left-4" onClick={() => setOpenState(true)}>
          Add members
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[765px] lg:h-3/4 h-5/6 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Members</DialogTitle>
        </DialogHeader>
        <AddAndEditMembers setOpenState={setOpenState} centers={centers} />
      </DialogContent>
    </Dialog>
  );
};

export default MembersHeader;
