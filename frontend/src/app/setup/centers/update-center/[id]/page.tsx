'use client'
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CreateCenter from "../../add-center/page";
import { BASE_URL } from "@/constants/constant";

const UpdateMember = () => {
  const { id: centerId } = useParams();
  const [center, setCenter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (centerId) {
      fetch(`${BASE_URL}/center/${centerId}`, {
        method: "GET",
        credentials:'include'
      })
        .then((res) => res.json())
        .then((data) => {
          setCenter(data.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  }, [centerId]);

  if (loading) return <div>Loading...</div>;
  if (!center) return <div>center not found</div>;
  return <CreateCenter mode="edit" initialData={center} />;
};

export default UpdateMember;
