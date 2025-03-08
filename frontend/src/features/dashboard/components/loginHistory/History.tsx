import React from "react";
import { UserRoundCheck } from "lucide-react";

export type LoginHistory = {
  isDeleted: boolean;
  createdAt: string;
  userId: {
    gym_owner_name: string;
    email: string;
  };
}[];

const History = ({ histories }: { histories: LoginHistory }) => {
  return (
    <div className="p-2">
      <h4 className="pb-4">
        Login Reports <span className="text-sm text-gray-500">( Total Count : {histories.length} )</span>
      </h4>
      {histories.map((item, idx) => {
        return (
          <div key={idx + 1} className="flex py-4 items-center justify-between">
            <div className="flex flex-row items-center space-x-6">
              <UserRoundCheck />
              <div className="flex flex-col gap-1">
                <p className="text-[18px] font-bold">
                  {item.userId.gym_owner_name}
                </p>
                <p className="text-[16px] font-semibold text-gray-500">{item.userId.email}</p>
                <p className="text-[14px] text-gray-500"> Last Login - {item.createdAt}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default History;
