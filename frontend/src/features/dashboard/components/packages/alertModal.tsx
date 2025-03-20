"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { getCenterById } from "../../actions/centers.action";

export default function AlertModal() {
  const searchParams = useSearchParams();
  const centerIdFromParams = searchParams.get("centerId");

  const [showAlert, setShowAlert] = useState(!!centerIdFromParams);
  const [centerName, setCenterName] = useState<string | null>(null);

  useEffect(() => {
    if (centerIdFromParams) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 10000); // Hide alert after 10 seconds

      return () => clearTimeout(timer);
    }
  }, [centerIdFromParams]);

  useEffect(() => {
    const fetchCenterDetails = async () => {
      if (!centerIdFromParams) return;

      try {
        const data = await getCenterById(centerIdFromParams);
        if (data?.center?.name) {
          setCenterName(data.center.name);
        } else {
          setCenterName("this center");
        }
      } catch (error) {
        toast.error("Failed to fetch center details.");
        setCenterName("this center");
      }
    };

    fetchCenterDetails();
  }, [centerIdFromParams]);

  return (
    <div className="py-4">
      {showAlert && centerIdFromParams && (
        <Alert className="border-l-4 border-yellow-500  text-yellow-900">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <div>
              <AlertTitle className="text-base font-semibold">Attention Required!</AlertTitle>
              <AlertDescription className="text-base">
                You're adding a package for <b className="text-yellow-800">{centerName}</b>.  
                Add the best offers to make it exciting!
              </AlertDescription>
            </div>
          </div>
        </Alert>
      )}
    </div>
  );
}
