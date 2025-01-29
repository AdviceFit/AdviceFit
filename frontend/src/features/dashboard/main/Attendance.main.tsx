
import { cookies } from 'next/headers'
import AttendanceHeader from '../components/attendance/AttendancesHeader';
import AttendanceTable from '../components/attendance/AttendanceTable';


const getAttendance = async (): Promise<AttendanceDataParams> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken");
  const res = await fetch("http://localhost:5000/attendance/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token?.value}`,
    },
    cache: "no-cache",
  });
  const attendance: AttendanceDataParams = await res.json();  
  return attendance;
};

const AttendanceMain = async () => {

  const adviceFitAttendance = await getAttendance();

  return (
    <>
      <AttendanceHeader />
      <AttendanceTable adviceFitAttendance={adviceFitAttendance?.attendance} />
    </>
  )
}

export default AttendanceMain
