// lib/authClient.ts
export async function apiLogin(email: string, password: string) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error((await res.json()).error);
  return res.json();          // { uid }
}

export async function apiSignup(email: string, password: string) {
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error((await res.json()).error);
  return res.json();          // { uid }
}

export async function apiLogout() {
  await fetch("/api/auth/logout", { method: "POST" });
}
