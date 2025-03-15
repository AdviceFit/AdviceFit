
import AttendanceHeader from '../components/attendance/AttendancesHeader';
import AttendanceTable from '../components/attendance/AttendanceTable';
import { BASE_URL } from '@/constants/constant';
import apiClient from '@/lib/axios';


const getAttendance = async (): Promise<AttendanceDataParams> => {
  const response = await apiClient.get(`${BASE_URL}/attendance`);
  return response.data;
};

const AttendanceMain = async () => {
  const adviceFitAttendance = await getAttendance();

  return (
    <>
      <AttendanceHeader />
      <AttendanceTable adviceFitAttendance={adviceFitAttendance?.attendance ?? []} />
    </>
  )
}

export default AttendanceMain
