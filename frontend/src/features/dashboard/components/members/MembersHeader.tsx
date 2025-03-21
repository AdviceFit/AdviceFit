"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddAndEditMembers from "./AddAndEditMembers";
import { useState } from "react";
import { DialogAlert } from "@/components/shared/DialogAlert";
import { X } from "lucide-react";

const MembersHeader = ({
  centers,
  setMemberState,
}: {
  centers: CenterParams[];
  setMemberState: any;
}) => {
  const [openState, setOpenState] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const handleClose = () => {
    setOpenAlert(true);
  };

  const handleAlertClose = () => {
    setOpenState(false);
    setOpenAlert(false);
  };

  return (
    <>
      <Dialog open={openState} onOpenChange={handleClose}>
        <Button
          variant="default"
          className="relative w-28"
          onClick={() => setOpenState(true)}
        >
          Add members
        </Button>
        <DialogContent
          onInteractOutside={(e) => e.preventDefault()}
          className="sm:max-w-[920px] lg:h-[90%] h-5/6 overflow-y-auto py-0"
          customClose={true}
        >
          <DialogHeader className="sticky top-0 bg-white pt-4 pb-2 flex flex-row justify-between">
            <DialogTitle>Add Members</DialogTitle>
            <X className="h-4 w-4 hover:cursor-pointer" onClick={handleClose} />
          </DialogHeader>
          <AddAndEditMembers
            setOpenState={setOpenState}
            centers={centers}
            setMemberState={setMemberState}
          />
        </DialogContent>
      </Dialog>

      {/* Alert Dialog  */}

      <DialogAlert
        message="Are you sure you want to close the form !!"
        open={openAlert}
        handleConfirm={handleAlertClose}
        setOpenAlert={setOpenAlert}
      />
    </>
  );
};

export default MembersHeader;
