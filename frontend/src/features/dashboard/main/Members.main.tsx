"use client";

import { useEffect, useState } from "react";
import MembersHeader from "../components/members/MembersHeader";
import MembersTable from "../components/members/MembersTable";
import { getCenters } from "../actions/centers.action";
import { getAllMembers } from "../actions/members.action";

const MembersMain = () => {
  const [memberState, setMemberState] = useState<{
    centers: CenterParams[];
    members: MembersParams[];
  }>({ centers: [], members: [] });

  const [loading, setLoading] = useState<boolean>(false);

  const getRequiredData = async () => {
    setLoading(true); // Start loading
    try {
      const { members } = await getAllMembers();
      const { centers } = await getCenters();
      setMemberState({ members, centers });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    getRequiredData();
  }, []);

  return (
    <>
      <MembersHeader
        centers={memberState.centers}
        setMemberState={setMemberState}
      />
      {loading ? (
        <p className="text-center text-lg font-semibold">Loading...</p>
      ) : (
        <MembersTable
          centers={memberState.centers}
          adviceFitMembers={memberState.members}
          setMemberState={setMemberState}
        />
      )}
    </>
  );
};

export default MembersMain;
