import { redirect } from "next/navigation";

export default function AdminLoginRedirect() {
  redirect("https://internal-crm-mu.vercel.app/login");
}
