import { format } from "date-fns";

export const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return format(date, "MMM dd yyyy hh:mm a");
};
