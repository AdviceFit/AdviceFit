'use client'
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CreateMember from "../../add-member/page";
import { BASE_URL } from "@/constants/constant";

const UpdateMember = () => {
  const { id: memberId } = useParams();
  const [memberData, setMemberData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (memberId) {
      fetch(`${BASE_URL}/members/${memberId}`, {
        method: "GET",
        credentials:'include'
      })
        .then((res) => res.json())
        .then((data) => {
          setMemberData(data.member);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  }, [memberId]);

  if (loading) return <div>Loading...</div>;
  if (!memberData) return <div>Members not found</div>;
  return <CreateMember mode="edit" initialData={memberData} />;
};

export default UpdateMember;
