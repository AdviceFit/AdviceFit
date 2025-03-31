import React from "react";
import { useRouter } from "next/navigation";

interface DashboardCountCardProps {
  label?: string;
  newMembersCount: number;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  redirectUrl?: string;
}
const DashboardCountCard: React.FC<DashboardCountCardProps> = ({
  label,
  newMembersCount,
  icon: Icon,
  title,
  redirectUrl,
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (redirectUrl) {
      router.push(redirectUrl);
    }
  };
  return (
    <div
      className="bg-white hover:bg-white h-24 rounded cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex items-center justify-end h-[20%] px-2">
        <label className={`text-xs text-gray-500 ${label ? "" : "invisible"}`}>
          {label}
        </label>
      </div>
      <div className="flex justify-center items-center h-[80%] w-full py-2 px-4">
        <div className="h-full mr-4 flex items-center">
          <Icon
            width={40}
            height={40}
            style={{
              background: "#cfcfcf",
              borderRadius: "50%",
              padding: "8px",
            }}
          />
        </div>
        <div className="w-full h-full flex flex-col justify-center">
          {title && (
            <h3 className="text-xl font-medium" style={{ color: "#424242" }}>
              {newMembersCount}
            </h3>
          )}
          <h4
            className="text-sm font-medium uppercase"
            style={{ color: "#424242" }}
          >
            {title}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default DashboardCountCard;
