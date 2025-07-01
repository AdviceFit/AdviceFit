"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format, parseISO } from "date-fns";

type ChartData = {
  name: string;
  [key: string]: string | number;
};

type Props = {
  data?: ChartData[];
};

const DashboardCharts = ({ data }: Props) => {
  const fallbackData: ChartData[] = [
    { name: "2024-06-23", Members: 30, Visitors: 12 },
    { name: "2024-06-24", Members: 20, Visitors: 10 },
    { name: "2024-06-25", Members: 15, Visitors: 8 },
    { name: "2024-06-26", Members: 18, Visitors: 9 },
    { name: "2024-06-27", Members: 25, Visitors: 13 },
  ];

  const chartData = data && data.length > 0 ? data : fallbackData;

  const isDate = (str: string) => /^\d{4}-\d{2}-\d{2}$/.test(str);
  const isWeek = (str: string) => str.includes("–") || str.includes("-");
  const isMonth = (str: string) => /^[A-Za-z]{3,}$/.test(str);

  const formatLabel = (name: string) => {
    if (isDate(name)) return format(parseISO(name), "MMM d");
    if (isWeek(name)) return name.replace("-", " to ");
    if (isMonth(name)) return name;
    return name;
  };

  const normalizedData = chartData.map((item) => {
    const normalizedItem: ChartData = {
      name: formatLabel(item.name),
    };
    Object.keys(item).forEach((key) => {
      if (key !== "name") {
        const value = item[key];
        normalizedItem[key] = typeof value === "string" ? Number(value) : value;
      }
    });
    return normalizedItem;
  });

  const dataKeys = normalizedData.length
    ? Object.keys(normalizedData[0]).filter((key) => key !== "name")
    : [];

  const colors = [
    "#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#ffb347",
    "#91e3b1", "#a28ad6", "#c38ec7", "#e06666", "#6fa8dc",
  ];

  if (!normalizedData.length || !dataKeys.length) {
    return (
      <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">
        No data available to display.
      </div>
    );
  }

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={normalizedData}
          margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          {dataKeys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              fill={colors[index % colors.length]}
              radius={[4, 4, 0, 0]}
              barSize={30}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardCharts;
