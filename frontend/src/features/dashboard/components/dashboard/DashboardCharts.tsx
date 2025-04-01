import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";

interface DashboardChartsProps {
  data: Array<{ name: string; data: Record<string, number> }>;
}

const DEFAULT_COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#d88884"];

const DashboardCharts: React.FC<DashboardChartsProps> = ({ data }) => {
  const [activeSeries, setActiveSeries] = React.useState<Array<string>>([]);

  const handleLegendClick = (dataKey: string) => {
    setActiveSeries((prev) =>
      prev.includes(dataKey)
        ? prev.filter((key) => key !== dataKey)
        : [...prev, dataKey]
    );
  };

  const transformedData = data.map((entry) => ({
    name: entry.name,
    ...entry.data,
  }));
  const barKeys = Object.keys(data[0]?.data || {});

  return (
    <div className="w-full h-full px-4 pt-8 pb-2">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={transformedData}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="name" tickLine={false} tickMargin={10} />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip cursor={false} wrapperStyle={{ border: "2px solid #000" }} />
          <Legend
            iconType="circle"
            wrapperStyle={{ cursor: "pointer" }}
            onClick={(props) => handleLegendClick(props.dataKey)}
          />
          {barKeys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              fill={DEFAULT_COLORS[index % DEFAULT_COLORS.length]}
              barSize={12}
              radius={10}
              hide={activeSeries.includes(key)}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardCharts;
