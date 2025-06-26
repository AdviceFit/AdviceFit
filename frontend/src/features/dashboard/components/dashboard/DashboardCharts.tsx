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

type ChartData = {
  name: string;
  [key: string]: string | number;
};

type Props = {
  data?: ChartData[]; // Optional to test fallback
};

const DashboardCharts = ({ data }: Props) => {
  // Fallback dummy data for testing
  const fallbackData: ChartData[] = [
    { name: "Today", Members: 30, Visitors: 12 },
    { name: "Yesterday", Members: 20, Visitors: 10 },
    { name: "2 Days Ago", Members: 15, Visitors: 8 },
  ];

  const chartData = data && data.length > 0 ? data : fallbackData;

  // Normalize numeric values
  const normalizedData = chartData.map((item) => {
    const normalizedItem: ChartData = { name: item.name };
    Object.keys(item).forEach((key) => {
      if (key !== "name") {
        const value = item[key];
        normalizedItem[key] = typeof value === "string" ? Number(value) : value;
      }
    });
    return normalizedItem;
  });

  const dataKeys =
    normalizedData.length > 0
      ? Object.keys(normalizedData[0]).filter(
          (key) => key !== "name" && typeof normalizedData[0][key] === "number"
        )
      : [];

  if (!normalizedData || normalizedData.length === 0 || dataKeys.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">
        No data available to display.
      </div>
    );
  }

  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7f50",
    "#ffb347",
    "#91e3b1",
    "#a28ad6",
    "#c38ec7",
    "#e06666",
    "#6fa8dc",
  ];

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
