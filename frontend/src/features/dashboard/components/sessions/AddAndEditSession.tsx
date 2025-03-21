"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  createSession,
  getSessionById,
  updateSession,
} from "../../actions/sessions.action";
import { getCenters } from "../../actions/centers.action";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

const formSchema = z.object({
  _id: z.string().optional(),
  title: z.string().min(1, "Session title is required"),
  center: z.string().min(1, "Center is required"),
  session_date: z.coerce.date(),
  start_time: z.string().min(1, "Start time is required"),
  end_time: z.string().min(1, "End time is required"),
  member_capacity: z.number().min(1, "Member capacity must be at least 1"),
});

export default function AddAndEditSession({
  id,
  onClose,
}: {
  id?: string;
  onClose?: () => void;
}) {
  const [centers, setCenters] = useState<{ _id: string; name: string }[]>([]);
  const router = useRouter();

  const formatSessionData = (data: any): z.infer<typeof formSchema> => ({
    _id: data._id || "",
    title: data.title || "",
    center: data.center._id || "",
    session_date: data.session_date || "",
    start_time: data.start_time || "",
    end_time: data.end_time || "",
    member_capacity: data.member_capacity || 0,
  });

  useEffect(() => {
    const fetchSessionDetails = async () => {
      if (!id) return;
      try {
        const data = await getSessionById(id);
        form.reset(formatSessionData(data.session));
      } catch (error) {
        toast.error("Failed to fetch session details.");
      }
    };

    fetchSessionDetails();
  }, [id]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      center: "",
      session_date: new Date(),
      start_time: "",
      end_time: "",
      member_capacity: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const payload = {
        ...values,
        center: {
          _id: values.center,
          name: "",
          centerCode: "",
        },
      };
      let response;
      if (id) {
        response = await updateSession(id, payload);
        if (response.session) {
          toast.success("Session updated successfully!");
        } else {
          toast.error("Failed to update the session.");
        }
      } else {
        response = await createSession(payload);
        if (response.session) {
          toast.success("Session created successfully!");
        } else {
          toast.error("Failed to create the session.");
        }
      }
      router.replace("/dashboard/sessions");
      onClose?.();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  }

  useEffect(() => {
    async function fetchCenters() {
      try {
        const data = await getCenters();
        setCenters(data?.centers || []);
      } catch (error) {
        toast.error("Failed to load centers.");
      }
    }
    fetchCenters();
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full mx-auto py-2"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Session Title</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Session Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="center"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Center</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a center" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {centers.map((center) => (
                    <SelectItem key={center._id} value={center._id}>
                      {center.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField control={form.control} name="session_date" render={({ field }) => (
          <FormItem>
            <FormLabel required>Session Date</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} /> */}

        <FormField
          control={form.control}
          name="session_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel required>Session Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="start_time"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Start Time</FormLabel>
              <FormControl>
                <Input type="time" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="end_time"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>End Time</FormLabel>
              <FormControl>
                <Input type="time" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="member_capacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Member Capacity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Capacity"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full sm:w-auto float-end">
          Submit
        </Button>
      </form>
    </Form>
  );
}
