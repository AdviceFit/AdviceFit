import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleFileDownload = (
    blob: Blob,
    payload: Record<string, string | unknown>
  ) => {
    const fileType =
      payload.format === "pdf"
        ? "application/pdf"
        : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

    const fileBlob = new Blob([blob], { type: fileType });
    const fileLink = document.createElement("a");
    const fileURL = window.URL.createObjectURL(fileBlob);

    fileLink.href = fileURL;
    fileLink.setAttribute(
      "download",
      `${payload.reportName}.${payload.format === "pdf" ? "pdf" : "xlsx"}`
    );
    document.body.appendChild(fileLink);
    fileLink.click();
    fileLink.remove();
  };


  export const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  export const formatDateTime = (dateString : string) => {
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
}
