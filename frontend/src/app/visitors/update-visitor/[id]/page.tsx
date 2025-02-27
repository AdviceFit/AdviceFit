'use client'
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CreateVisitor from "../../add-visitor/page";
import { BASE_URL } from "@/constants/constant";

const UpdateMember = () => {
  const { id: visitorId } = useParams();
  const [visitorData, setvisitorData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (visitorId) {
      fetch(`${BASE_URL}/visitors/${visitorId}`, {
        method: "GET",
        credentials: 'include'
      })
        .then((res) => res.json())
        .then((data) => {
          setvisitorData(data.visitor);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  }, [visitorId]);

  if (loading) return <div>Loading...</div>;
  if (!visitorData) return <div>Visitor not found</div>;
  return <CreateVisitor mode="edit" initialData={visitorData} />;
};

export default UpdateMember;
