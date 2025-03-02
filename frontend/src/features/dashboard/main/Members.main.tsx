
import { cookies } from 'next/headers'
import MembersHeader from '../components/members/MembersHeader';
import MembersTable from '../components/members/MembersTable';
import { BASE_URL } from '@/constants/constant';
import { getCenters } from '../actions/centers.action';

const getMembers = async (): Promise<MembersDataParams> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken");
  const res = await fetch(`${BASE_URL}/members`, {
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
  const adviceFitMembers = await getMembers();
  const centers = await getCenters();
  return (
    <>
      <MembersHeader centers={centers.centers} />
      <MembersTable centers={centers.centers} adviceFitMembers={adviceFitMembers?.members ?? []} />
    </>
  )
}

export default MembersMain
