'use client'

import MembersHeader from "../components/members/MembersHeader";
import MembersTable from "../components/members/MembersTable";
import { getCenters } from "../actions/centers.action";
import { getAllMembers } from "../actions/members.action";
import { useEffect, useState } from "react";

const MembersMain = () => {
  const [memberState, setMemberState] = useState<{
    centers: CenterParams[];
    members: MembersParams[];
  }>({ centers: [], members: [] });

  const getRequiredData = async () => {
    const { members } = await getAllMembers();
    const { centers } = await getCenters();
    setMemberState({ members, centers });
  };

  useEffect(() => {
    getRequiredData();
  }, []);
  
  return (
    <>
      <MembersHeader centers={memberState.centers} setMemberState={setMemberState}/>
      <MembersTable
        centers={memberState.centers}
        adviceFitMembers={memberState.members}
        setMemberState={setMemberState}
      />
    </>
  );
};

export default MembersMain;
