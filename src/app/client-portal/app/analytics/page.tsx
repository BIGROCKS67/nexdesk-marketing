import { redirect } from "next/navigation";

export default function AnalyticsRedirect() {
  redirect("/client-portal/app/dashboard");
}
