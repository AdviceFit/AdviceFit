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
          className="sm:max-w-[765px] lg:h-3/4 h-5/6 overflow-y-auto"
        >
          <DialogHeader>
            <DialogTitle>Add Members</DialogTitle>
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
