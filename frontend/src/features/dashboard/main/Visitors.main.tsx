
import { cookies } from 'next/headers'
import VisitorsHeader from '../components/visitors/VisitorsHeader';
import VisitorsTable from '../components/visitors/VisitorsTable';
import { BASE_URL } from '@/constants/constant';

const getMembers = async (): Promise<VisitorsDataParams> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken");
  const res = await fetch(`${BASE_URL}/visitors`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token?.value}`,
    },
    cache: "no-cache",
    credentials: "include"
  });
  const members = await res.json();
  return members;
};

const MembersMain = async () => {
  const adviceFitVisitors = await getMembers();
  
  return (
    <>
      <VisitorsHeader />
      <VisitorsTable adviceFitVisitors={adviceFitVisitors?.visitors ?? []} />
    </>
  )
}

export default MembersMain
