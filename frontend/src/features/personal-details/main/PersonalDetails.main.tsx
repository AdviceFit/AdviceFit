// "use client";

import PersonalDetailsSection from "../components/personal-details/PersonalDetailsSection"

// import React, { useState } from "react";

// import { cookies } from 'next/headers'

// const getAttendance = async (): Promise<AttendanceDataParams> => {
//   const cookieStore = await cookies();
//   const token = cookieStore.get("authToken");
//   const res = await fetch("http://localhost:5000/", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${token?.value}`,
//     },
//     cache: "no-cache",
//   });
//   const attendance: AttendanceDataParams = await res.json();  
//   return attendance;
// };

const PersonalDetails = () => {

//   const adviceFitAttendance = await getAttendance();

  return (
    <div className="h-full w-full">
    <PersonalDetailsSection />
    </div>
  )
}

export default PersonalDetails
