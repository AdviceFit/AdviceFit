"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import axios from "axios";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Banknote,
  BriefcaseIcon,
  Cake,
  CalendarIcon,
  CirclePercent,
  HandCoins,
  Receipt,
  UserPlus,
  UserRoundPlus,
  Users,
  UserX,
  Wallet,
} from "lucide-react";

import DashboardCountCard from "./DashboardCountCard";
import DashboardCharts from "./DashboardCharts";
import Dropdown from "@/components/shared/Dropdown";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

type DashboardData = {
  newMembers?: number;
  newMembersMale?: number;
  newMembersFemale?: number;
  newVisitors?: number;
  newVisitorsMale?: number;
  newVisitorsFemale?: number;
  balanceDue?: number;
  balanceDueLabel?: string;
  expiredMembership?: number;
  expenses?: number;
  collected?: number;
  sale?: number;
  renewedSubscription?: number;
  renewalFollowUp?: number;
  renewalFollowUpLabel?: string;
  visitorFollowUp?: number;
  visitorFollowUpLabel?: string;
  balanceFollowUp?: number;
  nonLiveFollowUp?: number;
  greeting?: number;
  chartData?: {
    [key: string]: {
      [key: string]: any[];
    };
  };
};

type CenterParams = {
  _id: string;
  name: string;
};

type Props = {
  centers: CenterParams[];
};

const Dashboard = ({ centers }: Props) => {
  const [selectedFilter, setSelectedFilter] = useState("Today");
  const [isLoading, setIsLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [chartFilters, setChartFilters] = useState<{ [title: string]: string }>({});

  const filterButtonLabels = [
    "Today",
    "Yesterday",
    "Last Week",
    "This Week",
    "Last Month",
    "This Month",
  ];

  const chartFilterButtonLabels = ["Daily", "Weekly", "Monthly"];

  const centerOptions = useMemo(
    () => [
      { label: "All Centers", value: "all" },
      ...(centers ?? []).map((center) => ({
        label: center.name,
        value: center._id,
      })),
    ],
    [centers]
  );

  const formSchema = z.object({
    center: z.string().nonempty("Center is required"),
    dateRange: z.object({
      from: z.date(),
      to: z.date(),
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      center: "all",
      dateRange: {
        from: new Date(),
        to: new Date(),
      },
    },
  });

  const centerValue = form.watch("center");
  const dateRangeValue = form.watch("dateRange");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        
        
        const fromDate = format(dateRangeValue.from, "yyyy-MM-dd");
        const toDate = format(dateRangeValue.to, "yyyy-MM-dd");
        const token = localStorage.getItem("token");

        const params: any = {
          centerId: centerValue,
          dateFilter: selectedFilter.toLowerCase().replace(/\s/g, ""),
        };

        if (selectedFilter === "Custom") {
          params.startDate = fromDate;
          params.endDate = toDate;
        }

        const response = await axios.get(`${BASE_URL}/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params,
        });

        const responseData = response.data;
        setDashboardData(responseData);

        const initialChartFilters: { [key: string]: string } = {};
        Object.keys(responseData.chartData?.["Daily"] || {}).forEach((title) => {
          initialChartFilters[title] = "Daily";
        });
        setChartFilters(initialChartFilters);
      } catch (error) {
        console.error("Dashboard fetch failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [centerValue, dateRangeValue, selectedFilter]);

  const handleDateFilterClick = (label: string) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const thisWeekStart = new Date(today);
    thisWeekStart.setDate(today.getDate() - today.getDay());

    const lastWeekStart = new Date(today);
    lastWeekStart.setDate(today.getDate() - 7);

    const firstDayOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastMonth = new Date(today);
    lastMonth.setMonth(today.getMonth() - 1);
    const firstDayOfLastMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1);
    const lastDayOfLastMonth = new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0);

    switch (label) {
      case "Today":
        form.setValue("dateRange", { from: today, to: today });
        break;
      case "Yesterday":
        form.setValue("dateRange", { from: yesterday, to: yesterday });
        break;
      case "This Week":
        form.setValue("dateRange", { from: thisWeekStart, to: today });
        break;
      case "Last Week":
        form.setValue("dateRange", { from: lastWeekStart, to: today });
        break;
      case "This Month":
        form.setValue("dateRange", { from: firstDayOfThisMonth, to: today });
        break;
      case "Last Month":
        form.setValue("dateRange", { from: firstDayOfLastMonth, to: lastDayOfLastMonth });
        break;
    }

    setSelectedFilter(label);
  };

  return (
    <Form {...form}>
      <form className="w-full h-full">
        <div className="bg-white dark:bg-gray-900 h-16 flex items-center justify-between p-4 gap-10">
          <h4 className="text-xl font-semibold text-gray-800 dark:text-white">Dashboard</h4>
          <Dropdown
            label="Center"
            hideTopLabel
            fieldName="center"
            form={form}
            options={centerOptions}
          />
        </div>

        <div className="bg-gray-100 p-4">
          <div className="h-12 flex items-center justify-end gap-2">
            {filterButtonLabels.map((label) => (
              <Button
                key={label}
                type="button"
                className={`${
                  selectedFilter === label
                    ? "bg-white text-blue-600"
                    : "bg-white text-gray-600"
                } text-xs rounded-none hover:bg-white`}
                onClick={() => handleDateFilterClick(label)}
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
                          variant="outline"
                          className={cn(
                            "pl-3 text-left font-normal rounded-none",
                            !field.value?.from || !field.value?.to ? "text-muted-foreground" : ""
                          )}
                          onClick={() => setSelectedFilter("Custom")}
                        >
                          {field.value?.from && field.value?.to ? (
                            `${format(field.value.from, "PPP")} to ${format(
                              field.value.to,
                              "PPP"
                            )}`
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

          {/* Count Cards */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 py-4">
            <DashboardCountCard
              title="New Members"
              newMembersCount={dashboardData?.newMembers || 0}
              label={`M: ${dashboardData?.newMembersMale || 0} / F: ${dashboardData?.newMembersFemale || 0}`}
              icon={Users}
            />
            <DashboardCountCard
              title="New Visitors"
              newMembersCount={dashboardData?.newVisitors || 0}
              label={`M: ${dashboardData?.newVisitorsMale || 0} / F: ${dashboardData?.newVisitorsFemale || 0}`}
              icon={UserRoundPlus}
            />
            <DashboardCountCard
              title="Balance Due"
              newMembersCount={dashboardData?.balanceDue || 0}
              label={dashboardData?.balanceDueLabel}
              icon={Banknote}
            />
            <DashboardCountCard title="Expired Membership" newMembersCount={dashboardData?.expiredMembership || 0} icon={UserX} />
            <DashboardCountCard title="Expenses" newMembersCount={dashboardData?.expenses || 0} icon={Wallet} />
            <DashboardCountCard title="Collected" newMembersCount={dashboardData?.collected || 0} icon={HandCoins} />
            <DashboardCountCard title="Sale" newMembersCount={dashboardData?.sale || 0} icon={CirclePercent} />
            <DashboardCountCard title="Renewed Subscription" newMembersCount={dashboardData?.renewedSubscription || 0} icon={Receipt} />
            <DashboardCountCard title="Visitor Follow Up" newMembersCount={dashboardData?.visitorFollowUp || 0} label={dashboardData?.visitorFollowUpLabel} icon={UserPlus} />
            <DashboardCountCard title="Renewal Follow Up" newMembersCount={dashboardData?.renewalFollowUp || 0} label={dashboardData?.renewalFollowUpLabel} icon={Receipt} />
            <DashboardCountCard title="Balance Follow Up" newMembersCount={dashboardData?.balanceFollowUp || 0} icon={BriefcaseIcon} />
            <DashboardCountCard title="Non-live Follow Up" newMembersCount={dashboardData?.nonLiveFollowUp || 0} icon={UserPlus} />
            <DashboardCountCard title="Greeting" newMembersCount={dashboardData?.greeting || 0} icon={Cake} />
          </div>

          {/* Charts */}
          <div className="grid xs:grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
            {[
              "Upcoming Payments",
              "Collection vs Expenses",
              "New vs Expired Member",
              "Collection Mode",
              "Visitor vs Converted",
              "Business Source",
            ].map((title) => {
              const currentChartFilter = chartFilters[title] || "Daily";
              const chartData = dashboardData?.chartData?.[currentChartFilter]?.[title] || [];

              return (
                <div className="w-full h-[450px]" key={title}>
                  <div className="flex items-center justify-between h-[10%] pb-4">
                    <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
                    <div className="flex items-center">
                      {chartFilterButtonLabels.map((label) => (
                        <Button
                          key={label}
                          type="button"
                          className={`${
                            currentChartFilter === label
                              ? "bg-white text-blue-600"
                              : "bg-white text-gray-600"
                          } text-xs rounded-none hover:bg-white p-2 h-7`}
                          onClick={() =>
                            setChartFilters((prev) => ({ ...prev, [title]: label }))
                          }
                        >
                          {label}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="w-full h-[90%] bg-white flex items-center justify-center">
                    <DashboardCharts data={chartData} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </form>
    </Form>
  );
};

export default Dashboard;
