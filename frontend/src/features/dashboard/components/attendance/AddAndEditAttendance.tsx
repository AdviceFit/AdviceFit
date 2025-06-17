"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  createAttendance,
  getAttendanceById,
  updateAttendance,
} from "../../actions/attendance.action";
import { getAllMembers } from "../../actions/members.action";

type Member = {
  _id: string;
  name: string;
};

const formSchema = z.object({
  member: z.string().nonempty("Please select a member"),
  time_in: z.string().nonempty("Time-in is required"),
  time_out: z.string().nonempty("Time-out is required"),
});

export default function AddAndEditAttendance({
  id,
  onClose,
}: {
  id?: string;
  onClose?: () => void;
}) {
  const [members, setMembers] = useState<Member[]>([]);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      member: "",
      time_in: "",
      time_out: "",
    },
  });

  // Fetch all members
  useEffect(() => {
    async function fetchMembers() {
      try {
        const response = await getAllMembers();
        if (response?.members && Array.isArray(response.members)) {
          setMembers(response.members);
        } else {
          setMembers([]);
        }
      } catch (error) {
        toast.error("Failed to load members.");
        setMembers([]);
      }
    }
    fetchMembers();
  }, []);

  // Fetch attendance details for edit
  useEffect(() => {
    async function fetchAttendanceDetails() {
      if (!id) return;
      try {
        const response = await getAttendanceById(id);

        if (response?.attendance) {
          const { member, time_in, time_out } = response.attendance;
          form.reset({
            member: member._id,
            time_in: new Date(time_in).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }),
            time_out: new Date(time_out).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }),
          });
        } else {
          toast.error("Attendance record not found.");
        }
      } catch (error) {
        toast.error("Failed to fetch attendance details.");
      }
    }

    fetchAttendanceDetails();
  }, [id, form]);

  // Submit handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formattedData = {
        member: values.member,
        time_in: new Date(`1970-01-01T${values.time_in}:00`).toISOString(),
        time_out: new Date(`1970-01-01T${values.time_out}:00`).toISOString(),
      };

      if (id) {
        const response = await updateAttendance(id, formattedData);
        if (response.success) {
          toast.success("Attendance updated successfully!");
        } else {
          toast.error("Failed to update attendance.");
        }
      } else {
        const response = await createAttendance(formattedData);
        if (response.attendance) {
          toast.success("Attendance created successfully!");
        } else {
          toast.error("Failed to create attendance.");
        }
      }

      router.replace("/dashboard/attendance");
    } catch (error) {
      toast.error("Failed to submit attendance.");
    } finally {
      onClose && onClose();
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full h-full"
      >
        {/* Member Dropdown */}
        <FormField
          control={form.control}
          name="member"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Member</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a member" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {members.length > 0 ? (
                    members.map((member) => (
                      <SelectItem key={member._id} value={member._id}>
                        {member.name}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="text-muted-foreground px-4 py-2 text-sm">
                      No members found
                    </div>
                  )}
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
                <Input type="time" {...field} />
              </FormControl>
              <FormMessage />
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
                <Input type="time" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="w-full flex justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
