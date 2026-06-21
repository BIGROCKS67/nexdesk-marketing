export const OS_API_BASE =
  process.env.NEXT_PUBLIC_OS_API_URL?.replace(/\/$/, "") || "";

export async function submitEnquiry(payload: {
  name: string;
  company: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  details: string;
  source?: string;
  product_interest?: string;
  system_type?: string;
}) {
  const res = await fetch(`${OS_API_BASE}/api/os/enquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok && !data.duplicate) {
    throw new Error(data.error || "Failed to submit enquiry");
  }
  return data;
}

export async function portalLogin(email: string, password: string) {
  const res = await fetch(`${OS_API_BASE}/api/os/portal/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Login failed");
  return data.session as {
    email: string;
    name: string;
    company: string;
    clientId: string;
  };
}

export async function fetchPortalData(clientId: string) {
  const res = await fetch(`${OS_API_BASE}/api/os/portal/${clientId}`, {
    cache: "no-store",
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to load portal data");
  return data;
}
