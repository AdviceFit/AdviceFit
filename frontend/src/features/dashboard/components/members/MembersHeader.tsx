import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import AddAndEditMembers from "./AddAndEditMembers";

const MembersHeader = () => {
  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button variant="default">Add members</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[765px] lg:h-3/4 h-5/6 overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Add Members</DialogTitle>
      </DialogHeader>
        <AddAndEditMembers/>
    </DialogContent>
  </Dialog>
  )
}

export default MembersHeader
