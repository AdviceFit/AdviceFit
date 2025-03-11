import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import AddAndEditSession from "./AddAndEditSession";

const SessionHeader = () => {
  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button variant="default" className="w-28">Add Session</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[765px] lg:h-3/4 h-5/6 overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Add Session</DialogTitle>
      </DialogHeader>
        <AddAndEditSession/>
    </DialogContent>
  </Dialog>
  )
}

export default SessionHeader
