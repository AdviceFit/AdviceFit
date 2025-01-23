"use client";

import { useState, useEffect } from "react";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

type Member = {
  _id: string;
  name: string;
};

const formSchema = z.object({
  member: z.string().nonempty("Please select a member"),
  time_in: z.string().nonempty("Time-in is required"),
  time_out: z.string().nonempty("Time-out is required"),
});


export function AttendanceDialog({refetch}:any) {
  const [members, setMembers] = useState<Member[]>([]);
  const [timeOut, setTimeOut] = useState('10:00');
  const [timeIn] = useState(() =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      member: "",
      time_in: timeIn,
      time_out: "",
    },
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  async function fetchMembers() {
    try {
      const response = await fetch("http://localhost:5000/members", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch members");
      }

      const data = await response.json();
      setMembers(data.members); // Assuming `members` is the key in the response
    } catch (error) {
      toast.error("Failed to load members.");
      console.error(error);
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("http://localhost:5000/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          member: values.member,
          time_in: new Date(`1970-01-01T${values.time_in}:00`).toISOString(),
          time_out: new Date(`1970-01-01T${values.time_out}:00`).toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit the form.");
      }
      refetch() 
      toast.success("Attendance recorded successfully!");
      setIsDialogOpen(false);
    } catch (error) {
      toast.error("Failed to submit attendance.");
      console.error(error);
    }
  }

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Add Attendance</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add Attendance</AlertDialogTitle>
          <AlertDialogDescription>Select a member and provide time details.</AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Member Dropdown */}
            <FormField
              control={form.control}
              name="member"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Member</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a member" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {members.map((member) => (
                        <SelectItem key={member._id} value={member._id}>
                          {member.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Time In */}
            <FormField
              control={form.control}
              name="time_in"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time In</FormLabel>
                  <FormControl>
                    <input {...field} className="input read-only" readOnly />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* Time Out */}
            <FormField
              control={form.control}
              name="time_out"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time Out</FormLabel>
                  <FormControl>
                    <TimePicker
                      value={field.value || timeOut} // Use the field value or fallback to state
                      onChange={(value) => {
                        setTimeOut(value || ""); // Update local state
                        field.onChange(value || ""); // Update form value
                      }}
                      format="h:mm a" // 12-hour format with AM/PM
                      disableClock={false} // Allow the clock to open
                      className="w-full p-2 border rounded-md"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Submit Button */}
            <div className="w-full flex justify-end space-x-3" >

              <Button type="submit" >
                Submit
              </Button>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
              </AlertDialogFooter>
            </div>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
