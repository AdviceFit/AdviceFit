'use client'
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CreateMember from "../../add-member/page";

const UpdateMember = () => {
  const id = useParams();
  const [memberData, setMemberData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/members/${id.slug}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
        },
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
  }, [id]);

  if (loading) return <div>Loading...</div>;
//@ts-ignore
  return <CreateMember mode="edit" initialData={memberData} />;
};

export default UpdateMember;
