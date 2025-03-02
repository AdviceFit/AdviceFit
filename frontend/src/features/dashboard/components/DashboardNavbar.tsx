"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Popover, PopoverTrigger, PopoverContent } from "../../../components/ui/popover";
import LogoIcon from "../../../../public/favicon-32x32.png";
import { toast } from "sonner";
import { useLocalStorageHook } from "@/hooks/useLocalStorageHook";
import { BASE_URL } from "@/constants/constant";

const DashboardNavbar: React.FC = () => {
  const router = useRouter();

  const localStorageHook = useLocalStorageHook();
  const userDetails = localStorageHook.userDetails;

  const handleSignOut = async () => {
    const response = await fetch(`${BASE_URL}/api/users/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if(!response.ok) {
      toast.error("Failed to logout!");
      return
    }

    localStorageHook.clearLocalStorage();
    router.push('/sign-in');
    toast.success("Logout successful!");
  };
  return (
    <nav className="bg-white dark:bg-gray-900 h-16 shadow-md border-b border-gray-200 z-10">
      <div className="mx-auto flex items-center justify-between p-4">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image src={LogoIcon} alt="AdviceFit Logo" width={32} height={32} />
          <span className="text-2xl font-semibold text-gray-900 dark:text-white">
            AdviceFit
          </span>
        </Link>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex space-x-6">
          {["Home", "About", "Services", "Pricing", "Contact"].map((item, index) => (
            <Link
              key={index}
              href={`/${item.toLowerCase()}`}
              className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Right: User Menu */}
        <div className="flex items-center space-x-3">
          {/* Dropdown Menu */}
          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="relative flex items-center justify-center w-8 h-8 rounded-full bg-blue-300 hover:bg-gray-700 focus:ring-1 focus:ring-gray-300 dark:focus:ring-gray-600"
              >
                <Image
                  src={LogoIcon} // Replace with the user's avatar
                  alt="User Avatar"
                  className="rounded-full"
                  width={32}
                  height={32}
                />
                <span className="sr-only">Open user menu</span>
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-48">
              <div className="p-4 border-b dark:border-gray-700">
                <span className="block text-sm font-medium text-gray-800 dark:text-white">
                   {userDetails?.gym_owner_name || ''}
                </span>
                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                   {userDetails?.email || ''} 
                </span>
              </div>
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-300">
                <li>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Settings
                  </Link>
                </li>
              </ul>
              <div className="border-t dark:border-gray-700">
                <button
                  onClick={() => handleSignOut()}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-red-400"
                >
                  Sign out
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Mobile Navigation */}
      {/* <div className="md:hidden bg-gray-50 dark:bg-gray-800 border-t dark:border-gray-700">
        <ul className="flex flex-col items-center space-y-2 p-4">
          {["Home", "About", "Services", "Pricing", "Contact"].map((item, index) => (
            <li key={index}>
              <Link
                href={`/${item.toLowerCase()}`}
                className="block text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      </div> */}
    </nav>
  );
};

export default DashboardNavbar;
