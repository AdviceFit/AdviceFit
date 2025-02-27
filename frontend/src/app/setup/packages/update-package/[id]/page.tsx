'use client'
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CreatePackage from "../../add-package/page";
import { BASE_URL } from "@/constants/constant";

const UpdateMember = () => {
  const { id: packageId } = useParams();
  const [packages, setPackages] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (packageId) {
      fetch(`${BASE_URL}/packages/${packageId}`, {
        method: "GET",
        credentials:'include'
      })
        .then((res) => res.json())
        .then((data) => {
          setPackages(data.package);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  }, [packageId]);

  if (loading) return <div>Loading...</div>;
  if (!packages) return <div>Members not found</div>;
  return <CreatePackage mode="edit" initialData={packages} />;
};

export default UpdateMember;
