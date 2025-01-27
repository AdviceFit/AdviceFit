
import { cookies } from 'next/headers'
import MembersHeader from '../components/members/MembersHeader';
import MembersTable from '../components/members/MembersTable';

const getMembers = async (): Promise<MembersDataParams> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken");
  const res = await fetch("http://localhost:5000/members", {
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

  return (
    <>
      <MembersHeader />
      <MembersTable adviceFitMembers={adviceFitMembers?.members} />
    </>
  )
}

export default MembersMain
