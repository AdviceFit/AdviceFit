"use client";

import Dropdown from "@/components/shared/Dropdown";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { REPORT_FORMATS, REPORT_TYPES } from "@/constants/constant";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { getReport } from "../../actions/report.action";

type Props = {
  centers: CenterParams[];
};

const DownloadReports = (props: Props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const formSchema = z.object({
    reportName: z
      .string({
        required_error: "Report name is required",
      })
      .nonempty({ message: "Report name cannot be empty" }),
    dateSpan: z.object({
      from: z.date({
        required_error: "Start date is required",
      }),
      to: z.date({
        required_error: "End date is required",
      }),
    }),
    center: z
      .string({
        required_error: "Center value is required",
      })
      .nonempty({ message: "Center value cannot be empty" }),
    format: z.enum(["pdf", "excel"], {
      required_error: "Format is required",
      invalid_type_error: "Format must be either PDF or Excel",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dateSpan: {
        from: new Date(),
        to: new Date(),
      },
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    await getReport(values);
    setIsLoading(false);
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full mx-auto grid grid-cols-3 gap-3 py-2"
      >
        <Dropdown
          label="Report"
          fieldName={"reportName"}
          form={form}
          options={REPORT_TYPES}
        />
        <FormField
          control={form.control}
          name="dateSpan"
          render={({ field }) => (
            <FormItem className="flex flex-col mt-2">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        " pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value.from ?? new Date(), "PPP") +
                        " to " +
                        format(field.value.to ?? new Date(), "PPP")
                      ) : (
                        <span>Select date span</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={{ from: field.value?.from, to: field.value?.to }}
                    onSelect={field.onChange}
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />
        <Dropdown
          label="Center"
          fieldName={"center"}
          form={form}
          options={props.centers.map((center) => ({
            label: center.name,
            value: center.name,
          }))}
        />
        <Dropdown
          label="Format"
          fieldName={"format"}
          form={form}
          options={REPORT_FORMATS}
        />
        <div className="flex items-end">
          <Button disabled={isLoading}>
            {isLoading ? "Loading ..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default DownloadReports;
