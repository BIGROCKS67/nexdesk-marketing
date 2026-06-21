import { redirect } from "next/navigation";

export default function LegacyPortalRedirect() {
  redirect("/client-portal/app/dashboard");
}
