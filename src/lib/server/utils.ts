import { randomBytes } from "crypto";

//world worst id generating function
export function gen_id(): string {
  let date = String(new Date().getUTCDate());
  let hours = String(new Date().getUTCHours());
  date = date.length === 1 ? "0" + date : date;
  hours = hours.length === 1 ? "0" + hours : hours;
  return `${date}${hours}${randomBytes(5).toString("base64url")}`;
}
