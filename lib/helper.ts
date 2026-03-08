export const BASE_URL = process.env.NODE_ENV === "development"
  ? "http://localhost:3000"
  : "----"

export const DEFAULT_ERROR_MESSAGE = "Something went wrong. Please try again later.";

export const capitalizeFirstChar = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}