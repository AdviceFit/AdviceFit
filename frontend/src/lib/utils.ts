import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleFileDownload = (
  blob: Blob,
  payload: { format: "pdf" | "excel"; reportName?: string }
): void => {
  const mimeType =
    {
      pdf: "application/pdf",
      excel:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }[payload.format] || "application/octet-stream";

  const fileName = `${payload.reportName || "report"}.${payload.format}`;

  try {    
    const fileURL = URL.createObjectURL(new Blob([blob], { type: mimeType }));

    const link = document.createElement("a");
    link.href = fileURL;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(fileURL);
  } catch (error) {
    console.error("File download failed:", error);
    throw new Error("Failed to initiate file download");
  }
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);

  // Extract the month, day, year
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();

  // Extract the hours, minutes, and seconds
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  // Return in MM/DD/YYYY HH:mm:ss format
  return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
};
