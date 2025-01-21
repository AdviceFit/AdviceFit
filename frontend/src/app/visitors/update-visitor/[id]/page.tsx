'use client'
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CreateVisitor from "../../add-visitor/page";

const UpdateMember = () => {
  const { id: visitorId } = useParams();
  const [visitorData, setvisitorData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (visitorId) {
      fetch(`http://localhost:5000/visitors/${visitorId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
        },
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
