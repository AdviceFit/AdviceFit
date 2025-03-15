"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deletePayment } from "../../actions/payments.action";
import { handleFileDownload } from "@/lib/utils";
import { getPaymentInvoice } from "../../actions/reports.action";

const PaymentActionDropdown = ({ id }: { id: string }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deletePayment(id);
      toast.success("Payment deleted successfully!");
      router.push("/dashboard/payments");
    } catch {
      toast.error("Failed to delete payment.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDownloadInvoice = async () => {
    const response = await getPaymentInvoice(id);
    handleFileDownload(response, {
      reportName: "Payment Invoice",
      format: "pdf",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="text-center">
        <Button variant="ghost">•••</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Button
              variant="ghost"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button variant="ghost" onClick={handleDownloadInvoice}>
              Download Invoice
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button variant="ghost" onClick={handleDownloadInvoice}>
              Download Receipt
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PaymentActionDropdown;
