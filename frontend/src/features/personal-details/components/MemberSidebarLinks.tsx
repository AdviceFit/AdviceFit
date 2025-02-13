"use client";

import APP_ROUTES from "@/constants/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  LayoutDashboard,
  UserSearch,
  Users,
  CalendarDays,
  TvMinimalPlay,
  // User,
  // FileChartColumn, WalletCards,
  // HandCoins, BookOpenCheck, FileInput, Files, HardDriveDownload, Wallet, MessageSquareMore, MessagesSquare,
  // Mails, MessageSquareShare, Settings, MapPinHouse, Boxes, SquareUser, Tickets,
  // ChevronDown
} from "lucide-react";
import Image from "next/image";
import LogoIcon from "../../../../public/favicon-32x32.png";
import { useLocalStorageHook } from "@/hooks/useLocalStorageHook";

const MemberSidebarLinks = () => {
  // const [isReportsOpen, setIsReportsOpen] = useState(false);
  // const [isMessageCenterOpen, setIsMessageCenterOpen] = useState(false);
  // const [isSetupOpen, setIsSetupOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const localStorageHook = useLocalStorageHook();
  const userDetails = localStorageHook.userDetails;

  const renderLink = (name: string, path: string, icon: React.ReactNode) => (
    <>
      <div className="border-t border-gray-200"></div>
      <div key={path} className="relative block w-full">
        <Link href={path}>
          <div
            className={`flex items-center w-full p-3 leading-tight transition-all outline-none text-start hover:bg-blue-gray-50 hover:text-blue-300 group hover:border-l-4 hover:border-l-blue-300 ${
              isActive(path) ? "text-blue-300 border-l-blue-300 border-l-4" : ""
            }`}
          >
            {/* <div className="grid mr-4 place-items-center">
            {icon}
            </div> */}
            {name}
          </div>
        </Link>
      </div>
    </>
  );

  // const renderDropdown = (title: string, icon: React.ReactNode, items: { name: string; path: string; icon: React.ReactNode }[], isOpen: boolean, toggle: () => void) => (
  //   <div className="relative block w-full">
  //     <button type="button" className="flex items-center justify-between w-full p-3 font-sans text-xl antialiased font-semibold leading-snug text-left transition-colors border-b-0 select-none border-b-blue-gray-100 text-blue-gray-700 hover:text-blue-600" onClick={toggle}>
  //       <div className="grid mr-4 place-items-center">{icon}</div>
  //       <p className={`block mr-auto font-sans text-base antialiased font-normal leading-relaxed ${isActive("/reports") ? "text-blue-600" : "text-blue-gray-900"}`}>{title}</p>
  //       <span className="ml-4">
  //         <ChevronDown className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
  //       </span>
  //     </button>
  //     {isOpen && (
  //       <div className="block w-full text-gray-700 pl-6">
  //         {items.map((item) => (
  //           <div key={item.path}>
  //             {renderLink(item.name, item.path, item.icon)}
  //           </div>
  //         ))}
  //       </div>
  //     )}
  //   </div>
  // );

  return (
    <div className="relative flex h-[calc(100vh-64px)] flex-col rounded-br-xl bg-clip-border text-gray-700 shadow-xl shadow-blue-gray-900/5 overflow-auto">
      <nav className="flex flex-col font-sans text-base font-normal text-blue-gray-700">
        <div className="flex flex-col items-center justify-center w-full h-40 bg-gray-400">
          <Image
            src={LogoIcon} // Replace with the user's avatar
            alt="User Avatar"
            className="rounded-full"
            width={100}
            height={100}
          />
          <span className="text-lg font-medium text-black-500">{userDetails?.name || "Name john"}</span>
        </div>
        {renderLink(
          "Personal Detail",
          APP_ROUTES.memberScreen.personalDetails,
          <LayoutDashboard />
        )}
        {renderLink(
          "Subscription",
          APP_ROUTES.memberScreen.mySubscription,
          <UserSearch />
        )}
        {renderLink(
          "Payments",
          APP_ROUTES.memberScreen.paymentHistory,
          <Users />
        )}
        {renderLink(
          "Order History",
          APP_ROUTES.memberScreen.orderHistory,
          <CalendarDays />
        )}
        {renderLink(
          "Diet Plan",
          APP_ROUTES.memberScreen.dietPlan,
          <TvMinimalPlay />
        )}
        {renderLink(
          "Fitness Data",
          APP_ROUTES.memberScreen.fitnessData,
          <TvMinimalPlay />
        )}
        {renderLink(
          "Reviews",
          APP_ROUTES.memberScreen.myReview,
          <TvMinimalPlay />
        )}
        {renderLink(
          "Attendance",
          APP_ROUTES.memberScreen.attendance,
          <CalendarDays />
        )}
        {/* {renderLink("Dashboard", "/dashboard", <LayoutDashboard />)}
        {renderLink("Visitors", APP_ROUTES.dasboard.visitors, <UserSearch />)}
        {renderLink("Members", APP_ROUTES.dasboard.members, <Users />)}
        {renderLink(
          "Attendance",
          APP_ROUTES.dasboard.attendance,
          <CalendarDays />
        )}
        {renderLink(
          "Sessions",
          APP_ROUTES.dasboard.sessions,
          <TvMinimalPlay />
        )} */}

        {/* {renderDropdown("Reports", <FileChartColumn />, [
          { name: "Subscriptions", path: "/reports/subscriptions", icon: <WalletCards /> },
          { name: "Payments", path: "/reports/payments", icon: <HandCoins /> },
          { name: "Follow Ups", path: "/reports/follow-ups", icon: <BookOpenCheck /> },
          { name: "Login Reports", path: "/reports/login-reports", icon: <FileInput /> },
          { name: "Audit Reports", path: "/reports/audit-reports", icon: <Files /> },
          { name: "Download Reports", path: "/reports/download-reports", icon: <HardDriveDownload /> }
        ], isReportsOpen, () => setIsReportsOpen(!isReportsOpen))} */}

        {/* {renderLink("Expenses", "/expenses", <Wallet />)} */}

        {/* {renderDropdown("Message Center", <MessageSquareMore />, [
          { name: "Send Bulk Message", path: "/message-center/send-bulk-message", icon: <MessagesSquare /> },
          { name: "Send Bulk Email", path: "/message-center/send-bulk-email", icon: <Mails /> },
          { name: "Message History", path: "/message-center/message-history", icon: <MessageSquareShare /> }
        ], isMessageCenterOpen, () => setIsMessageCenterOpen(!isMessageCenterOpen))}

        {renderDropdown("Setup", <Settings />, [
          { name: "Centers", path: "/dashboard/centers", icon: <MapPinHouse /> },
          { name: "Packages", path: "/dashboard/packages", icon: <Boxes /> },
          { name: "Employees", path: "/dashboard/employees", icon: <SquareUser /> },
          { name: "Promos/Coupons", path: "/dashboard/promos", icon: <Tickets /> },
          { name: "Company Setup", path: "/dashboard/company", icon: <Settings /> }
        ], isSetupOpen, () => setIsSetupOpen(!isSetupOpen))} */}
      </nav>
    </div>
  );
};

export default MemberSidebarLinks;
