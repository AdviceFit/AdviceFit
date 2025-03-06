import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

export const DialogAlert = ({
    message,
    open,
    handleConfirm,
    setOpenAlert,
  }: {
    message: string;
    open: boolean;
    handleConfirm: () => void;
    setOpenAlert: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    return (
      <Dialog open={open}>
        <DialogContent onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>{message}</DialogTitle>
          </DialogHeader>
          <div className="flex gap-2 flex-row">
            <Button
              type="button"
              className="w-full sm:w-auto"
              onClick={() => setOpenAlert(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="w-full sm:w-auto"
              onClick={handleConfirm}
            >
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };
  