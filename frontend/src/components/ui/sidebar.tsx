"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Sidebar: React.FC = () => {
  const [isReportsOpen, setIsReportsOpen] = useState(false);
  const [isMessageCenterOpen, setIsMessageCenterOpen] = useState(false);
  const [isSetupOpen, setIsSetupOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path; 

  return (
    <div className="relative flex h-[calc(100vh-64px)] w-full flex-col rounded-tr-xl rounded-br-xl bg-clip-border text-gray-700 shadow-xl shadow-blue-gray-900/5 overflow-auto">
      <nav className="flex flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
        {/* Dashboard */}
        <div className="relative block w-full">
          <Link href="/dashboard">
            <div
              className={`flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:text-blue-600 group ${
                isActive("/dashboard") ? "text-blue-600" : ""
              }`}
            >
              <div className="grid mr-4 place-items-center">
                <svg
                  className={`w-6 h-6 ${isActive("/dashboard") ? "text-blue-600" : "text-gray-800"} group-hover:text-blue-600`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.143 4H4.857A.857.857 0 0 0 4 4.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 10 9.143V4.857A.857.857 0 0 0 9.143 4Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286A.857.857 0 0 0 20 9.143V4.857A.857.857 0 0 0 19.143 4Zm-10 10H4.857a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286A.857.857 0 0 0 9.143 14Zm10 0h-4.286a.857.857 0 0 0-.857.857v4.286c0 .473.384.857.857.857h4.286a.857.857 0 0 0 .857-.857v-4.286a.857.857 0 0 0-.857-.857Z"
                  />
                </svg>
              </div>
              Dashboard
            </div>
          </Link>
        </div>

        {/* Visitors */}
        <div className="relative block w-full">
          <Link href="/visitors">
            <div
              className={`flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:text-blue-600 group ${
                isActive("/visitors") ? "text-blue-600" : ""
              }`}
            >
              <div className="grid mr-4 place-items-center">
                <svg
                  className={`w-6 h-6 ${isActive("/visitors") ? "text-blue-600" : "text-gray-800"} group-hover:text-blue-600`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14.7141 15h4.268c.4043 0 .732-.3838.732-.8571V3.85714c0-.47338-.3277-.85714-.732-.85714H6.71411c-.55228 0-1 .44772-1 1v4m10.99999 7v-3h3v3h-3Zm-3 6H6.71411c-.55228 0-1-.4477-1-1 0-1.6569 1.34315-3 3-3h2.99999c1.6569 0 3 1.3431 3 3 0 .5523-.4477 1-1 1Zm-1-9.5c0 1.3807-1.1193 2.5-2.5 2.5s-2.49999-1.1193-2.49999-2.5S8.8334 9 10.2141 9s2.5 1.1193 2.5 2.5Z"
                  />
                </svg>
              </div>
              Visitors
            </div>
          </Link>
        </div>

        {/* Members */}
        <div className="relative block w-full">
          <Link href="/members">
            <div
              className={`flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:text-blue-600 group ${
                isActive("/members") ? "text-blue-600" : ""
              }`}
            >
              <div className="grid mr-4 place-items-center">
                <svg
                  className={`w-6 h-6 ${isActive("/members") ? "text-blue-600" : "text-gray-800"} group-hover:text-blue-600`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                  />
                </svg>
              </div>
              Members
            </div>
          </Link>
        </div>

        {/* Attendance */}
        <div className="relative block w-full">
          <Link href="/attendances">
            <div
              className={`flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:text-blue-600 group ${
                isActive("/attendance") ? "text-blue-600" : ""
              }`}
            >
              <div className="grid mr-4 place-items-center">
                <svg
                  className={`w-6 h-6 ${isActive("/attendance") ? "text-blue-600" : "text-gray-800"} group-hover:text-blue-600`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
                  />
                </svg>
              </div>
              Attendance
            </div>
          </Link>
        </div>

        {/* Sessions */}
        <div className="relative block w-full">
          <Link href="/sessions">
            <div
              className={`flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:text-blue-600 group ${
                isActive("/sessions") ? "text-blue-600" : ""
              }`}
            >
              <div className="grid mr-4 place-items-center">
                <svg
                  className={`w-6 h-6 ${isActive("/sessions") ? "text-blue-600" : "text-gray-800"} group-hover:text-blue-600`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1Zm0 0-4 4m5 0H4m1 0 4-4m1 4 4-4m-4 7v6l4-3-4-3Z"
                  />
                </svg>
              </div>
              Sessions
            </div>
          </Link>
        </div>

        {/* Reports */}
        <div className="relative block w-full">
          <button
            type="button"
            className="flex items-center justify-between w-full p-3 font-sans text-xl antialiased font-semibold leading-snug text-left transition-colors border-b-0 select-none border-b-blue-gray-100 text-blue-gray-700 hover:text-blue-600"
            onClick={() => setIsReportsOpen(!isReportsOpen)}
          >
            <div className="grid mr-4 place-items-center">
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 3v4a1 1 0 0 1-1 1H5m4 10v-2m3 2v-6m3 6v-3m4-11v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z"
                />
              </svg>
            </div>
            <p
              className={`block mr-auto font-sans text-base antialiased font-normal leading-relaxed ${
                isActive("/reports") ? "text-blue-600" : "text-blue-gray-900"
              }`}
            >
              Reports
            </p>
            <span className="ml-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2.5"
                stroke="currentColor"
                aria-hidden="true"
                className={`w-4 h-4 mx-auto transition-transform ${
                  isReportsOpen ? "rotate-180" : ""
                }`}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                ></path>
              </svg>
            </span>
          </button>
          {isReportsOpen && (
            <div className="block w-full py-1 font-sans text-sm antialiased font-light leading-normal text-gray-700 pl-6">
              <nav className="flex flex-col gap-1 p-0 font-sans text-base font-normal text-blue-gray-700">
                <Link href="/reports/subscriptions">
                  <div
                    className={`flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:text-blue-600 ${
                      isActive("/reports/subscriptions") ? "text-blue-600" : ""
                    }`}
                  >
                    {" "}
                    <div className="grid mr-4 place-items-center">
                      <svg
                        className="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 15v3c0 .5523.44772 1 1 1h10M3 15v-4m0 4h9m-9-4V6c0-.55228.44772-1 1-1h16c.5523 0 1 .44772 1 1v3M3 11h11m-2-.2079V19m3-4h1.9909M21 15c0 1.1046-.8954 2-2 2s-2-.8954-2-2 .8954-2 2-2 2 .8954 2 2Z"
                        />
                      </svg>
                    </div>
                    Subscriptions
                  </div>
                </Link>
                <Link href="/reports/payments">
                  <div
                    className={`flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:text-blue-600 ${
                      isActive("/reports/payments") ? "text-blue-600" : ""
                    }`}
                  >
                    {" "}
                    <div className="grid mr-4 place-items-center">
                      <svg
                        className="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 10h18M6 14h2m3 0h5M3 7v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1Z"
                        />
                      </svg>
                    </div>
                    Payments
                  </div>
                </Link>
                <Link href="/reports/follow-ups">
                  <div
                    className={`flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:text-blue-600 ${
                      isActive("/reports/follow-ups") ? "text-blue-600" : ""
                    }`}
                  >
                    {" "}
                    <div className="grid mr-4 place-items-center">
                      <svg
                        className="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M10 3v4a1 1 0 0 1-1 1H5m4 10v-2m3 2v-6m3 6v-3m4-11v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z"
                        />
                      </svg>
                    </div>
                    Follow Ups
                  </div>
                </Link>
                <Link href="/reports/login-reports">
                  <div
                    className={`flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:text-blue-600 ${
                      isActive("/reports/login-reports") ? "text-blue-600" : ""
                    }`}
                  >
                    {" "}
                    <div className="grid mr-4 place-items-center">
                      <svg
                        className="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 12V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-4m5-13v4a1 1 0 0 1-1 1H5m0 6h9m0 0-2-2m2 2-2 2"
                        />
                      </svg>
                    </div>
                    Login Reports
                  </div>
                </Link>
                <Link href="/reports/audit-reports">
                  <div
                    className={`flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:text-blue-600 ${
                      isActive("/reports/audit-reports") ? "text-blue-600" : ""
                    }`}
                  >
                    {" "}
                    <div className="grid mr-4 place-items-center">
                      <svg
                        className="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M14 4v3a1 1 0 0 1-1 1h-3m4 10v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h2m11-3v10a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1V7.87a1 1 0 0 1 .24-.65l2.46-2.87a1 1 0 0 1 .76-.35H18a1 1 0 0 1 1 1Z"
                        />
                      </svg>
                    </div>
                    Audit Reports
                  </div>
                </Link>
                <Link href="/reports/download-reports">
                  <div
                    className={`flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:text-blue-600 ${
                      isActive("/reports/download-reports")
                        ? "text-blue-600"
                        : ""
                    }`}
                  >
                    {" "}
                    <div className="grid mr-4 place-items-center">
                      <svg
                        className="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 13V4M7 14H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2m-1-5-4 5-4-5m9 8h.01"
                        />
                      </svg>
                    </div>
                    Download Reports
                  </div>
                </Link>
              </nav>
            </div>
          )}
        </div>

        {/* Expenses */}
        <div className="relative block w-full">
          <Link href="/expenses">
            <div
              className={`flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:text-blue-600 ${
                isActive("/expenses") ? "text-blue-600" : ""
              }`}
            >
              {" "}
              <div className="grid mr-4 place-items-center">
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-width="2"
                    d="M8 7V6a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1M3 18v-7a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                  />
                </svg>
              </div>
              Expenses
            </div>
          </Link>
        </div>

        {/* Message Center */}
        <div className="relative block w-full">
          <button
            type="button"
            className="flex items-center justify-between w-full p-3 font-sans text-xl antialiased font-semibold leading-snug text-left transition-colors border-b-0 select-none border-b-blue-gray-100 text-blue-gray-700 hover:text-blue-600"
            onClick={() => setIsMessageCenterOpen(!isMessageCenterOpen)}
          >
            {" "}
            <div className="grid mr-4 place-items-center">
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 9h5m3 0h2M7 12h2m3 0h5M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6.616a1 1 0 0 0-.67.257l-2.88 2.592A.5.5 0 0 1 8 18.477V17a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
                />
              </svg>
            </div>
            <p
              className={`block mr-auto font-sans text-base antialiased font-normal leading-relaxed ${
                isActive("/message-center")
                  ? "text-blue-600"
                  : "text-blue-gray-900"
              }`}
            >
              Message Center
            </p>
            <span className="ml-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2.5"
                stroke="currentColor"
                aria-hidden="true"
                className={`w-4 h-4 mx-auto transition-transform ${
                  isMessageCenterOpen ? "rotate-180" : ""
                }`}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                ></path>
              </svg>
            </span>
          </button>
          {isMessageCenterOpen && (
            <div className="block w-full py-1 font-sans text-sm antialiased font-light leading-normal text-gray-700 pl-6">
              <nav className="flex flex-col gap-1 p-0 font-sans text-base font-normal text-blue-gray-700">
                <Link href="/message-center/send-bulk-message">
                  <div
                    className={`flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:text-blue-600 ${
                      isActive("/message-center/send-bulk-message")
                        ? "text-blue-600"
                        : ""
                    }`}
                  >
                    {" "}
                    <div className="grid mr-4 place-items-center">
                      <svg
                        className="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 17h6l3 3v-3h2V9h-2M4 4h11v8H9l-3 3v-3H4V4Z"
                        />
                      </svg>
                    </div>
                    Send Bulk Message
                  </div>
                </Link>
                <Link href="/message-center/send-bulk-email">
                  <div
                    className={`flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:text-blue-600 ${
                      isActive("/message-center/send-bulk-email")
                        ? "text-blue-600"
                        : ""
                    }`}
                  >
                    {" "}
                    <div className="grid mr-4 place-items-center">
                      <svg
                        className="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M11 16v-5.5A3.5 3.5 0 0 0 7.5 7m3.5 9H4v-5.5A3.5 3.5 0 0 1 7.5 7m3.5 9v4M7.5 7H14m0 0V4h2.5M14 7v3m-3.5 6H20v-6a3 3 0 0 0-3-3m-2 9v4m-8-6.5h1"
                        />
                      </svg>
                    </div>
                    Send Bulk Email
                  </div>
                </Link>
                <Link href="/message-center/message-history">
                  <div
                    className={`flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:text-blue-600 ${
                      isActive("/message-center/message-history")
                        ? "text-blue-600"
                        : ""
                    }`}
                  >
                    {" "}
                    <div className="grid mr-4 place-items-center">
                      <svg
                        className="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9.5 11H5a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h4.5M7 11V7a3 3 0 0 1 6 0v1.5m2.5 5.5v1.5l1 1m3.5-1a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z"
                        />
                      </svg>
                    </div>
                    Message History
                  </div>
                </Link>
              </nav>
            </div>
          )}
        </div>

        {/* Setup */}
        <div className="relative block w-full">
          <button
            type="button"
            className="flex items-center justify-between w-full p-3 font-sans text-xl antialiased font-semibold leading-snug text-left transition-colors border-b-0 select-none border-b-blue-gray-100 text-blue-gray-700 hover:text-blue-600"
            onClick={() => setIsSetupOpen(!isSetupOpen)}
          >
            {" "}
            <div className="grid mr-4 place-items-center">
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 13v-2a1 1 0 0 0-1-1h-.757l-.707-1.707.535-.536a1 1 0 0 0 0-1.414l-1.414-1.414a1 1 0 0 0-1.414 0l-.536.535L14 4.757V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v.757l-1.707.707-.536-.535a1 1 0 0 0-1.414 0L4.929 6.343a1 1 0 0 0 0 1.414l.536.536L4.757 10H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h.757l.707 1.707-.535.536a1 1 0 0 0 0 1.414l1.414 1.414a1 1 0 0 0 1.414 0l.536-.535 1.707.707V20a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-.757l1.707-.708.536.536a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414l-.535-.536.707-1.707H20a1 1 0 0 0 1-1Z"
                />
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                />
              </svg>
            </div>
            <p
              className={`block mr-auto font-sans text-base antialiased font-normal leading-relaxed ${
                isActive("/setup") ? "text-blue-600" : "text-blue-gray-900"
              }`}
            >
              Setup
            </p>
            <span className="ml-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2.5"
                stroke="currentColor"
                aria-hidden="true"
                className={`w-4 h-4 mx-auto transition-transform ${
                  isSetupOpen ? "rotate-180" : ""
                }`}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                ></path>
              </svg>
            </span>
          </button>
          {isSetupOpen && (
            <div className="block w-full py-1 font-sans text-sm antialiased font-light leading-normal text-gray-700 pl-6">
              <nav className="flex flex-col gap-1 p-0 font-sans text-base font-normal text-blue-gray-700">
                <Link href="/setup/centers">
                  <div
                    className={`flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:text-blue-600 ${
                      isActive("/setup/centers") ? "text-blue-600" : ""
                    }`}
                  >
                    {" "}
                    <div className="grid mr-4 place-items-center">
                      <svg
                        className="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-width="2"
                          d="M3 21h18M4 18h16M6 10v8m4-8v8m4-8v8m4-8v8M4 9.5v-.955a1 1 0 0 1 .458-.84l7-4.52a1 1 0 0 1 1.084 0l7 4.52a1 1 0 0 1 .458.84V9.5a.5.5 0 0 1-.5.5h-15a.5.5 0 0 1-.5-.5Z"
                        />
                      </svg>
                    </div>
                    Centers
                  </div>
                </Link>
                <Link href="/setup/packages">
                  <div
                    className={`flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:text-blue-600 ${
                      isActive("/setup/packages") ? "text-blue-600" : ""
                    }`}
                  >
                    {" "}
                    <div className="grid mr-4 place-items-center">
                      <svg
                        className="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M10 21v-9m3-4H7.5a2.5 2.5 0 1 1 0-5c1.5 0 2.875 1.25 3.875 2.5M14 21v-9m-9 0h14v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8ZM4 8h16a1 1 0 0 1 1 1v3H3V9a1 1 0 0 1 1-1Zm12.155-5c-3 0-5.5 5-5.5 5h5.5a2.5 2.5 0 0 0 0-5Z"
                        />
                      </svg>
                    </div>
                    Packages
                  </div>
                </Link>
                <Link href="/setup/employees">
                  <div
                    className={`flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:text-blue-600 ${
                      isActive("/setup/employees") ? "text-blue-600" : ""
                    }`}
                  >
                    {" "}
                    <div className="grid mr-4 place-items-center">
                      <svg
                        className="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 14h2m3 0h4m2 2h2m0 0h2m-2 0v2m0-2v-2m-5 4H4c-.55228 0-1-.4477-1-1V7c0-.55228.44772-1 1-1h16c.5523 0 1 .44772 1 1v4M3 10h18"
                        />
                      </svg>
                    </div>
                    Employees
                  </div>
                </Link>
                <Link href="/setup/promos">
                  <div
                    className={`flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:text-blue-600 ${
                      isActive("/setup/promos") ? "text-blue-600" : ""
                    }`}
                  >
                    {" "}
                    <div className="grid mr-4 place-items-center">
                      <svg
                        className="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4 4h6v6H4V4Zm10 10h6v6h-6v-6Zm0-10h6v6h-6V4Zm-4 10h.01v.01H10V14Zm0 4h.01v.01H10V18Zm-3 2h.01v.01H7V20Zm0-4h.01v.01H7V16Zm-3 2h.01v.01H4V18Zm0-4h.01v.01H4V14Z"
                        />
                        <path
                          stroke="currentColor"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 7h.01v.01H7V7Zm10 10h.01v.01H17V17Z"
                        />
                      </svg>
                    </div>
                    Promos/Coupons
                  </div>
                </Link>
                <Link href="/setup/company">
                  <div
                    className={`flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:text-blue-600 ${
                      isActive("/setup/company") ? "text-blue-600" : ""
                    }`}
                  >
                    {" "}
                    <div className="grid mr-4 place-items-center">
                      <svg
                        className="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M21 13v-2a1 1 0 0 0-1-1h-.757l-.707-1.707.535-.536a1 1 0 0 0 0-1.414l-1.414-1.414a1 1 0 0 0-1.414 0l-.536.535L14 4.757V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v.757l-1.707.707-.536-.535a1 1 0 0 0-1.414 0L4.929 6.343a1 1 0 0 0 0 1.414l.536.536L4.757 10H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h.757l.707 1.707-.535.536a1 1 0 0 0 0 1.414l1.414 1.414a1 1 0 0 0 1.414 0l.536-.535 1.707.707V20a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-.757l1.707-.708.536.536a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414l-.535-.536.707-1.707H20a1 1 0 0 0 1-1Z"
                        />
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                        />
                      </svg>
                    </div>
                    Company Setup
                  </div>
                </Link>
              </nav>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
