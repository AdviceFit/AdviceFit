'use client'
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CreateMember from "../../add-member/page";

const UpdateMember = () => {
  const { id: memberId } = useParams();
  const [memberData, setMemberData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (memberId) {
      fetch(`http://localhost:5000/members/${memberId}`, {
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
