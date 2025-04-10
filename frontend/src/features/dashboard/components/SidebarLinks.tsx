"use client";

import APP_ROUTES from "@/constants/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import {
  LayoutDashboard,
  UserSearch,
  Users,
  CalendarDays,
  TvMinimalPlay,
  FileChartColumn,
  WalletCards,
  HandCoins,
  BookOpenCheck,
  FileInput,
  Files,
  HardDriveDownload,
  Wallet,
  MessageSquareMore,
  MessagesSquare,
  Mails,
  MessageSquareShare,
  Settings,
  MapPinHouse,
  Boxes,
  SquareUser,
  Tickets,
  ChevronDown,
} from "lucide-react";

const SidebarLinks = () => {
  const [isReportsOpen, setIsReportsOpen] = useState(false);
  const [isMessageCenterOpen, setIsMessageCenterOpen] = useState(false);
  const [isSetupOpen, setIsSetupOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const renderLink = (name: string, path: string, icon: React.ReactNode) => (
    <div key={path} className="relative block w-full">
      <Link href={path}>
        <div
          className={`flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:text-blue-600 group ${
            isActive(path) ? "text-blue-600" : ""
          }`}
        >
          <div className="grid mr-4 place-items-center">{icon}</div>
          {name}
        </div>
      </Link>
    </div>
  );

  const renderDropdown = (
    title: string,
    icon: React.ReactNode,
    items: { name: string; path: string; icon: React.ReactNode }[],
    isOpen: boolean,
    toggle: () => void
  ) => (
    <div className="relative block w-full">
      <button
        type="button"
        className="flex items-center justify-between w-full p-3 font-sans text-xl antialiased font-semibold leading-snug text-left transition-colors border-b-0 select-none border-b-blue-gray-100 text-blue-gray-700 hover:text-blue-600"
        onClick={toggle}
      >
        <div className="grid mr-4 place-items-center">{icon}</div>
        <p
          className={`block mr-auto font-sans text-sm antialiased font-medium leading-relaxed ${
            isActive("/reports") ? "text-blue-600" : "text-blue-gray-900"
          }`}
        >
          {title}
        </p>
        <span className="ml-4">
          <ChevronDown
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </span>
      </button>
      {isOpen && (
        <div className="block w-full text-gray-700 pl-6">
          {items.map((item) => (
            <div key={item.path}>
              {renderLink(item.name, item.path, item.icon)}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="relative flex h-[calc(100vh-64px)] flex-col rounded-tr-xl rounded-br-xl bg-clip-border text-gray-700  shadow-blue-gray-900/5 overflow-auto">
      <nav className="flex flex-col gap-1 p-2 font-sans text-sm font-medium text-blue-gray-700">
        {renderLink("Dashboard", "/dashboard", <LayoutDashboard />)}
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
        )}

        {renderDropdown(
          "Reports",
          <FileChartColumn />,
          [
            {
              name: "Subscriptions",
              path: "/dashboard/subscriptions",
              icon: <WalletCards />,
            },
            {
              name: "Payments",
              path: "/dashboard/payments",
              icon: <HandCoins />,
            },
            {
              name: "Follow Ups",
              path: "/dashboard/follow-ups",
              icon: <BookOpenCheck />,
            },
            {
              name: "Login Reports",
              path: "/dashboard/login-reports",
              icon: <FileInput />,
            },
            {
              name: "Audit Reports",
              path: "/dashboard/audit-reports",
              icon: <Files />,
            },
            {
              name: "Download Reports",
              path: "/dashboard/download-reports",
              icon: <HardDriveDownload />,
            },
          ],
          isReportsOpen,
          () => setIsReportsOpen(!isReportsOpen)
        )}

        {renderLink("Expenses", "/dashboard/expenses", <Wallet />)}

        {renderDropdown(
          "Message Center",
          <MessageSquareMore />,
          [
            {
              name: "Send Bulk Message",
              path: "/dashboard/send-bulk-message",
              icon: <MessagesSquare />,
            },
            {
              name: "Send Bulk Email",
              path: "/dashboard/send-bulk-emails",
              icon: <Mails />,
            },
            {
              name: "Message History",
              path: "/dashboard/message-history",
              icon: <MessageSquareShare />,
            },
          ],
          isMessageCenterOpen,
          () => setIsMessageCenterOpen(!isMessageCenterOpen)
        )}

        {renderDropdown(
          "Setup",
          <Settings />,
          [
            {
              name: "Centers",
              path: "/dashboard/centers",
              icon: <MapPinHouse />,
            },
            { name: "Packages", path: "/dashboard/packages", icon: <Boxes /> },
            {
              name: "Employees",
              path: "/dashboard/employees",
              icon: <SquareUser />,
            },
            {
              name: "Promos/Coupons",
              path: "/dashboard/promos",
              icon: <Tickets />,
            },
            {
              name: "Company Setup",
              path: "/dashboard/setup",
              icon: <Settings />,
            },
          ],
          isSetupOpen,
          () => setIsSetupOpen(!isSetupOpen)
        )}
      </nav>
    </div>
  );
};

export default SidebarLinks;
