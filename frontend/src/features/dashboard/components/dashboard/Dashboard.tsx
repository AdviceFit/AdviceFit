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
import { cn, handleFileDownload } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Banknote,
  BriefcaseIcon,
  Cake,
  CalendarIcon,
  ChevronsUpDown,
  CirclePercent,
  HandCoins,
  Receipt,
  UserPlus,
  UserRoundPlus,
  Users,
  UserX,
  Wallet,
} from "lucide-react";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import DashboardCountCard from "./DashboardCountCard";
import DashboardCharts from "./DashboardCharts";

type Props = {
  centers: CenterParams[];
};

const data = [
  {
    name: "Page A",
    data: { bar1: 4000, bar2: 2000 },
    amt: 2400,
  },
  {
    name: "Page B",
    data: { bar1: 8000, bar2: 9000 },
    amt: 2400,
  },
  {
    name: "Page A",
    data: { bar1: 4000, bar2: 2000 },
    amt: 2400,
  },
  {
    name: "Page B",
    data: { bar1: 8000, bar2: 9000 },
    amt: 2400,
  },
];

const Dashboard = (props: Props) => {
  const filterButtonLabels: string[] = [
    "Today",
    "Yesterday",
    "Last Week",
    "This Week",
    "Last Month",
    "This Month",
  ];

  const chartFilterButtonLabels: string[] = ["Daily", "Weekly", "Monthly"];

  const centers = useMemo(
    () => [
      { label: "All Centers", value: "all" },
      ...(props.centers ?? []).map((center) => ({
        label: center?.name,
        value: center?.name,
      })),
    ],
    [props.centers]
  );
  const [selectedFilter, setSelectedFilter] = useState<string>("Today");
  const [selectedChartFilter, setSelectedChartFilter] =
    useState<string>("Daily");
  const [isLoading, setIsLoading] = useState(false);
  const formSchema = z.object({
    center: z
      .string({
        required_error: "Center value is required",
      })
      .nonempty({ message: "Center value cannot be empty" }),
    dateRange: z.object({
      from: z.date({
        required_error: "Start date is required",
      }),
      to: z.date({
        required_error: "End date is required",
      }),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      center: "all",
      dateRange: {
        from: new Date(),
        to: new Date(),
      },
    },
  });

  // const onSubmit = async (values: z.infer<typeof formSchema>) => {
  //   try {
  //     setIsLoading(true);
  //     const response = await getReport(values);
  //     handleFileDownload(response, values);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <>
      <Form {...form}>
        <form
          // onSubmit={form.handleSubmit(onSubmit)}
          className="w-full h-full"
        >
          <div className="bg-white dark:bg-gray-900 h-16 flex items-center justify-between p-4">
            <h4 className="text-xl font-semibold text-gray-800 dark:text-white">
              Dashboard
            </h4>
            <div>
              <Dropdown
                label="Center"
                hideTopLabel={true}
                fieldName={"center"}
                form={form}
                options={centers}
              />
            </div>
          </div>
          <div className="bg-gray-100 p-4">
            <div className="h-12 flex items-center justify-end">
              {filterButtonLabels.map((label) => (
                <Button
                  key={label}
                  type="button"
                  className={`${
                    selectedFilter === label
                      ? "bg-white text-blue-600"
                      : "bg-white text-gray-600"
                  } text-xs rounded-none hover:bg-white`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFilter(label);
                  }}
                >
                  {label}
                </Button>
              ))}

              <FormField
                control={form.control}
                name="dateRange"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              " pl-3 text-left font-normal rounded-none",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value.from ?? new Date(), "PPP") +
                              " to " +
                              format(field.value.to ?? new Date(), "PPP")
                            ) : (
                              <span>Select date range</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="range"
                          selected={{
                            from: field.value?.from,
                            to: field.value?.to,
                          }}
                          onSelect={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full mx-auto grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 py-4">
              <DashboardCountCard
                label="M-0 / FE-0"
                newMembersCount={10}
                icon={Users}
                title="New Members"
                redirectUrl="/dashboard/members"
              />
              <DashboardCountCard
                label="M-1 / FE-1"
                newMembersCount={5}
                icon={UserRoundPlus}
                title="New Visitors"
                redirectUrl="dashboard/visitors"
              />
              <DashboardCountCard
                label="D-0 / OD-0"
                newMembersCount={8}
                icon={Banknote}
                title="Balance Due"
              />
              <DashboardCountCard
                newMembersCount={8}
                icon={UserX}
                title="Expired Membership"
              />
              <DashboardCountCard
                newMembersCount={8}
                icon={Wallet}
                title="Expenses"
                redirectUrl="dashboard/expenses"
              />
              <DashboardCountCard
                newMembersCount={8}
                icon={HandCoins}
                title="Collected"
              />
              <DashboardCountCard
                newMembersCount={8}
                icon={CirclePercent}
                title="Sale"
              />
              <DashboardCountCard
                newMembersCount={8}
                icon={Receipt}
                title="Renewed Subscription"
              />
              <DashboardCountCard
                label="M-0 / FE-0"
                newMembersCount={10}
                icon={Receipt}
                title="Renewal Follow Up"
              />
              <DashboardCountCard
                label="M-1 / FE-1"
                newMembersCount={5}
                icon={UserPlus}
                title="Visitor Follow Up"
              />
              <DashboardCountCard
                newMembersCount={5}
                icon={BriefcaseIcon}
                title="Balance Follow Up"
              />
              <DashboardCountCard
                newMembersCount={5}
                icon={UserPlus}
                title="Non-live Follow Up"
              />
              <DashboardCountCard
                newMembersCount={5}
                icon={Cake}
                title="Greeting"
              />
            </div>

            <div className="w-full mx-auto grid xs:grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
              <div className="w-full h-[450px]">
                <div className="flex items-center justify-between h-[10%] pb-4">
                  <h2
                    className="text-sm font-semibold p-0"
                    style={{ color: "#424242" }}
                  >
                    Upcoming Payments
                  </h2>
                  <div className="flex items-center">
                    {chartFilterButtonLabels.map((label) => (
                      <Button
                        key={label}
                        type="button"
                        className={`${
                          selectedChartFilter === label
                            ? "bg-white text-blue-600"
                            : "bg-white text-gray-600"
                        } text-xs rounded-none hover:bg-white p-2 h-7`}
                        onClick={() => setSelectedChartFilter(label)}
                      >
                        {label}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="w-full h-[90%]">
                  <div className="w-full h-full flex items-center justify-center bg-white">
                    <DashboardCharts data={data} />
                  </div>
                </div>
              </div>

              <div className="w-full h-[450px]">
                <div className="flex items-center justify-between h-[10%] pb-4">
                  <h2
                    className="text-sm font-semibold p-0"
                    style={{ color: "#424242" }}
                  >
                    Collection vs Expenses
                  </h2>
                  <div className="flex items-center">
                    {chartFilterButtonLabels.map((label) => (
                      <Button
                        key={label}
                        type="button"
                        className={`${
                          selectedChartFilter === label
                            ? "bg-white text-blue-600"
                            : "bg-white text-gray-600"
                        } text-xs rounded-none hover:bg-white p-2 h-7`}
                        onClick={() => setSelectedChartFilter(label)}
                      >
                        {label}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="w-full h-[90%]">
                  <div className="w-full h-full flex items-center justify-center bg-white">
                    <DashboardCharts data={data} />
                  </div>
                </div>
              </div>

              <div className="w-full h-[450px]">
                <div className="flex items-center justify-between h-[10%] pb-4">
                  <h2
                    className="text-sm font-semibold p-0"
                    style={{ color: "#424242" }}
                  >
                    New vs Expired Member
                  </h2>
                  <div className="flex items-center">
                    {chartFilterButtonLabels.map((label) => (
                      <Button
                        key={label}
                        type="button"
                        className={`${
                          selectedChartFilter === label
                            ? "bg-white text-blue-600"
                            : "bg-white text-gray-600"
                        } text-xs rounded-none hover:bg-white p-2 h-7`}
                        onClick={() => setSelectedChartFilter(label)}
                      >
                        {label}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="w-full h-[90%]">
                  <div className="w-full h-full flex items-center justify-center bg-white">
                    <DashboardCharts data={data} />
                  </div>
                </div>
              </div>

              <div className="w-full h-[450px]">
                <div className="flex items-center justify-between h-[10%] pb-4">
                  <h2
                    className="text-sm font-semibold p-0"
                    style={{ color: "#424242" }}
                  >
                    Collection Mode
                  </h2>
                  <div className="flex items-center">
                    {chartFilterButtonLabels.map((label) => (
                      <Button
                        key={label}
                        type="button"
                        className={`${
                          selectedChartFilter === label
                            ? "bg-white text-blue-600"
                            : "bg-white text-gray-600"
                        } text-xs rounded-none hover:bg-white p-2 h-7`}
                        onClick={() => setSelectedChartFilter(label)}
                      >
                        {label}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="w-full h-[90%]">
                  <div className="w-full h-full flex items-center justify-center bg-white">
                    <DashboardCharts data={data} />
                  </div>
                </div>
              </div>

              <div className="w-full h-[450px]">
                <div className="flex items-center justify-between h-[10%] pb-4">
                  <h2
                    className="text-sm font-semibold p-0"
                    style={{ color: "#424242" }}
                  >
                    Visitor vs Converted
                  </h2>
                  <div className="flex items-center">
                    {chartFilterButtonLabels.map((label) => (
                      <Button
                        key={label}
                        type="button"
                        className={`${
                          selectedChartFilter === label
                            ? "bg-white text-blue-600"
                            : "bg-white text-gray-600"
                        } text-xs rounded-none hover:bg-white p-2 h-7`}
                        onClick={() => setSelectedChartFilter(label)}
                      >
                        {label}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="w-full h-[90%]">
                  <div className="w-full h-full flex items-center justify-center bg-white">
                    <DashboardCharts data={data} />
                  </div>
                </div>
              </div>

              <div className="w-full h-[450px]">
                <div className="flex items-center justify-between h-[10%] pb-4">
                  <h2
                    className="text-sm font-semibold p-0"
                    style={{ color: "#424242" }}
                  >
                    Business Source
                  </h2>
                  <div className="flex items-center">
                    {chartFilterButtonLabels.map((label) => (
                      <Button
                        key={label}
                        type="button"
                        className={`${
                          selectedChartFilter === label
                            ? "bg-white text-blue-600"
                            : "bg-white text-gray-600"
                        } text-xs rounded-none hover:bg-white p-2 h-7`}
                        onClick={() => setSelectedChartFilter(label)}
                      >
                        {label}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="w-full h-[90%]">
                  <div className="w-full h-full flex items-center justify-center bg-white">
                    <DashboardCharts data={data} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default Dashboard;
