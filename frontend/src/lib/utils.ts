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
