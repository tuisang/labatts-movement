import { redirect } from "next/navigation";
import { isCoach } from "@/lib/coachAuth";

// /dashboard sends coaches to the coach dashboard and everyone else to the parent portal.
export default async function DashboardRedirect() {
  redirect((await isCoach()) ? "/dashboard/coach" : "/parent-portal");
}
