"use client";

import Dropdown from "@/components/shared/Dropdown";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
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
import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import DashboardCountCard from "./DashboardCountCard";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
const chartData = [
  { name: "Mon", Members: 5, Visitors: 8, Expenses: 200, Collected: 300, BalanceDue: 100, Renewed: 3 },
  { name: "Tue", Members: 7, Visitors: 4, Expenses: 180, Collected: 400, BalanceDue: 150, Renewed: 4 },
  { name: "Wed", Members: 3, Visitors: 6, Expenses: 220, Collected: 250, BalanceDue: 120, Renewed: 2 },
  { name: "Thu", Members: 9, Visitors: 10, Expenses: 300, Collected: 500, BalanceDue: 200, Renewed: 5 },
  { name: "Fri", Members: 4, Visitors: 5, Expenses: 150, Collected: 280, BalanceDue: 90, Renewed: 1 },
  { name: "Sat", Members: 6, Visitors: 7, Expenses: 240, Collected: 350, BalanceDue: 160, Renewed: 3 },
];

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

type DashboardData = {
  newMembers?: number;
  newMembersLabel?: string;
  newVisitors?: number;
  newVisitorsLabel?: string;
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
};

const Dashboard = ({ centers }: { centers: any[] }) => {
  const filterButtonLabels = [
    "Today",
    "Yesterday",
    "Last Week",
    "This Week",
    "Last Month",
    "This Month",
  ];

  const [selectedFilter, setSelectedFilter] = useState("Today");
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  const centerOptions = useMemo(
    () => [
      { label: "All Centers", value: "all" },
      ...(centers ?? []).map((center) => ({
        label: center?.name,
        value: center?.name,
      })),
    ],
    [centers]
  );

  const formSchema = z.object({
    center: z.string().nonempty("Center value cannot be empty"),
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

  const fetchDashboardData = async () => {
    try {
      const values = form.getValues();
      const fromDate = values.dateRange?.from ?? new Date();
      const toDate = values.dateRange?.to ?? new Date();

     const token = localStorage.getItem("token"); // or sessionStorage depending on your auth

const response = await axios.get(`${BASE_URL}/dashboard`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
  params: {
    center: values.center,
    dateFilter: selectedFilter.toLowerCase().replace(" ", ""),
    startDate: fromDate.toISOString().split("T")[0],
    endDate: toDate.toISOString().split("T")[0],
  },
});
console.log("Dashboard data fetched:", response.data);
      setDashboardData(response.data);
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [selectedFilter, form.watch("center"), form.watch("dateRange")]);

  return (
    <Form {...form}>
      <form className="w-full h-full">
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
              options={centerOptions}
            />
          </div>
        </div>

        <div className="bg-gray-100 p-4">
          <div className="h-12 flex items-center justify-end gap-1">
            {filterButtonLabels.map((label) => (
              <Button
                key={label}
                type="button"
                className={
                  selectedFilter === label
                    ? "bg-white text-blue-600 text-xs rounded-none hover:bg-white"
                    : "bg-white text-gray-600 text-xs rounded-none hover:bg-white"
                }
                onClick={() => setSelectedFilter(label)}
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
              label={dashboardData?.newMembersLabel}
              newMembersCount={dashboardData?.newMembers || 0}
              icon={Users}
              title="New Members"
              redirectUrl="/dashboard/members"
            />
            <DashboardCountCard
              label={dashboardData?.newVisitorsLabel}
              newMembersCount={dashboardData?.newVisitors || 0}
              icon={UserRoundPlus}
              title="New Visitors"
              redirectUrl="/dashboard/visitors"
            />
            <DashboardCountCard
              label={dashboardData?.balanceDueLabel}
              newMembersCount={dashboardData?.balanceDue || 0}
              icon={Banknote}
              title="Balance Due"
            />
            <DashboardCountCard
              newMembersCount={dashboardData?.expiredMembership || 0}
              icon={UserX}
              title="Expired Membership"
            />
            <DashboardCountCard
              newMembersCount={dashboardData?.expenses || 0}
              icon={Wallet}
              title="Expenses"
              redirectUrl="/dashboard/expenses"
            />
            <DashboardCountCard
              newMembersCount={dashboardData?.collected || 0}
              icon={HandCoins}
              title="Collected"
            />
            <DashboardCountCard
              newMembersCount={dashboardData?.sale || 0}
              icon={CirclePercent}
              title="Sale"
            />
            <DashboardCountCard
              newMembersCount={dashboardData?.renewedSubscription || 0}
              icon={Receipt}
              title="Renewed Subscription"
            />
            <DashboardCountCard
              label={dashboardData?.renewalFollowUpLabel}
              newMembersCount={dashboardData?.renewalFollowUp || 0}
              icon={Receipt}
              title="Renewal Follow Up"
            />
            <DashboardCountCard
              label={dashboardData?.visitorFollowUpLabel}
              newMembersCount={dashboardData?.visitorFollowUp || 0}
              icon={UserPlus}
              title="Visitor Follow Up"
            />
            <DashboardCountCard
              newMembersCount={dashboardData?.balanceFollowUp || 0}
              icon={BriefcaseIcon}
              title="Balance Follow Up"
            />
            <DashboardCountCard
              newMembersCount={dashboardData?.nonLiveFollowUp || 0}
              icon={UserPlus}
              title="Non-live Follow Up"
            />
            <DashboardCountCard
              newMembersCount={dashboardData?.greeting || 0}
              icon={Cake}
              title="Greeting"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
  {/* Chart 1 */}
  <div className="bg-white p-4 rounded shadow">
    <h3 className="text-base font-semibold mb-2">New Members</h3>
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Members" stroke="#4F46E5" />
      </LineChart>
    </ResponsiveContainer>
  </div>

  {/* Chart 2 */}
  <div className="bg-white p-4 rounded shadow">
    <h3 className="text-base font-semibold mb-2">New Visitors</h3>
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Visitors" stroke="#22C55E" />
      </LineChart>
    </ResponsiveContainer>
  </div>

  {/* Chart 3 */}
  <div className="bg-white p-4 rounded shadow">
    <h3 className="text-base font-semibold mb-2">Expenses</h3>
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Expenses" fill="#F97316" />
      </BarChart>
    </ResponsiveContainer>
  </div>

  {/* Chart 4 */}
  <div className="bg-white p-4 rounded shadow">
    <h3 className="text-base font-semibold mb-2">Collected</h3>
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Collected" fill="#10B981" />
      </BarChart>
    </ResponsiveContainer>
  </div>

  {/* Chart 5 */}
  <div className="bg-white p-4 rounded shadow">
    <h3 className="text-base font-semibold mb-2">Balance Due</h3>
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="BalanceDue" stroke="#EF4444" />
      </LineChart>
    </ResponsiveContainer>
  </div>

  {/* Chart 6 */}
  <div className="bg-white p-4 rounded shadow">
    <h3 className="text-base font-semibold mb-2">Renewed Subscriptions</h3>
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Renewed" stroke="#8B5CF6" />
      </LineChart>
    </ResponsiveContainer>
  </div>
</div>

        </div>
      </form>
    </Form>
  );
};

export default Dashboard;
