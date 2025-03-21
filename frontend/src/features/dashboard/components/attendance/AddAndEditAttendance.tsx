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
// import { Period } from "@/lib/time-picker-utils";
// import { Label } from "@/components/ui/label";
// import { TimePickerInput } from "@/components/ui/TimePickerInput";
// import { TimePeriodSelect } from "@/components/ui/period-select";
import {
  createAttendance,
  getAttendanceById,
  updateAttendance,
} from "../../actions/attendance.action";
import { getAllMembers } from "../../actions/members.action";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

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

  // const [timeOut, setTimeOut] = useState("10:00");
  // const [timeIn, setTimeIn] = useState<string>(
  //   new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  // );
  // const [period, setPeriod] = useState<Period>("PM");

  // const [date, setDate] = useState<Date>(new Date());
  // const minuteRef = useRef<HTMLInputElement>(null);
  // const hourRef = useRef<HTMLInputElement>(null);
  // const secondRef = useRef<HTMLInputElement>(null);
  // const periodRef = useRef<HTMLButtonElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      member: "",
      time_in: "",
      time_out: "",
    },
  });

  useEffect(() => {
    async function fetchMembers() {
      try {
        const response = await getAllMembers();
        setMembers(response.members);
      } catch (error) {
        toast.error("Failed to load members.");
      }
    }
    fetchMembers();
  }, []);

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
  }, [id]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formattedData = {
        member: values.member,
        time_in: new Date(
          `1970-01-01T${values.time_in.replace(/ /g, "")}:00`
        ).toISOString(),
        time_out: new Date(
          `1970-01-01T${values.time_out.replace(/ /g, "")}:00`
        ).toISOString(),
      };

      if (id) {
        const response = await updateAttendance(id, formattedData);
        if (response.success) {
          toast.success("Attendance updated successfully!");
        } else {
          toast.error("Attendance to update Attendance.");
        }
      } else {
        const response = await createAttendance(formattedData);
        if (response.attendance) {
          toast.success("Attendance created successfully!");
        } else {
          toast.error("Failed to create Attendance.");
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Member Dropdown */}
        <FormField
          control={form.control}
          name="member"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Member</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
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
              <FormLabel required>Time In</FormLabel>
              <FormControl>
                <Input placeholder="Enter In Time" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="time_out"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Time Out</FormLabel>
              <FormControl>
                <Input placeholder="Enter Out Time" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* <div className="flex items-end gap-2">
          <div className="grid gap-1 text-center">
            <Label htmlFor="hours" className="text-xs">Hours</Label>
            <TimePickerInput
              picker="12hours"
              period={period}
              date={date}
              setDate={setDate}
              ref={hourRef}
              onRightFocus={() => minuteRef.current?.focus()}
            />
          </div>
          <div className="grid gap-1 text-center">
            <Label htmlFor="minutes" className="text-xs">Minutes</Label>
            <TimePickerInput
              picker="minutes"
              id="minutes12"
              date={date}
              setDate={setDate}
              ref={minuteRef}
              onLeftFocus={() => hourRef.current?.focus()}
              onRightFocus={() => secondRef.current?.focus()}
            />
          </div>
          <div className="grid gap-1 text-center">
            <Label htmlFor="seconds" className="text-xs">Seconds</Label>
            <TimePickerInput
              picker="seconds"
              id="seconds12"
              date={date}
              setDate={setDate}
              ref={secondRef}
              onLeftFocus={() => minuteRef.current?.focus()}
              onRightFocus={() => periodRef.current?.focus()}
            />
          </div>
          <div className="grid gap-1 text-center">
            <Label htmlFor="period" className="text-xs">Period</Label>
            <TimePeriodSelect
              period={period}
              setPeriod={setPeriod}
              date={date}
              setDate={setDate}
              ref={periodRef}
              onLeftFocus={() => secondRef.current?.focus()}
            />
          </div>
        </div> */}

        {/* Time Out */}

        {/* Submit Button */}
        <div className="w-full flex justify-end space-x-3">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
