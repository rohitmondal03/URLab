import { format } from "date-fns";
import { getDomain } from "tldts"

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
  return format(new Date(date), "MMM dd, yyyy',' hh:mm a")
}