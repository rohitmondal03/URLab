import { format } from "date-fns";
import { getDomain } from "tldts"

export const BASE_URL = process.env.NODE_ENV === "development"
  ? "http://localhost:3000"
  : "----"

export const DEFAULT_ERROR_MESSAGE = "Something went wrong. Please try again later.";
export const DEFAULT_METADATA_ERROR_MESSAGE = "Error fetching data from URL or you might've entered wrong URL"

export const capitalizeFirstChar = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getDomainFromUrl(url: string) {
  const domain = getDomain(url);

  if (!domain) {
    throw new Error("URL")
  }

  return domain;
}

export const getFaviconFromURL = (url: string) => {
  return `https://www.google.com/s2/favicons?domain=${getDomainFromUrl(url)}&sz=64`
}

export const formattedDateWithTime = (date: string | Date) => {
  return format(new Date(date), "MMM dd, yyyy 'at' hh:mm a")
}