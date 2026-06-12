/* ─────────────────────────────────────────────
   KwanzaStream OAuth 2.0 Auth Helper
   Redirects to kwanzastream.com for login.
   ───────────────────────────────────────────── */

const KS_API = import.meta.env.VITE_KS_API_URL ?? "https://api.kwanzastream.com";
const KS_CLIENT_ID = import.meta.env.VITE_KS_CLIENT_ID ?? "";
const REDIRECT_URI =
  typeof window !== "undefined"
    ? `${window.location.origin}/auth/callback`
    : "https://kwanzastream.help/auth/callback";

export type KSUser = {
  id: string;
  login: string;
  display_name: string;
  profile_image_url: string;
  email?: string;
};

/* ── Build OAuth authorization URL ── */
export function buildLoginUrl(): string {
  const params = new URLSearchParams({
    client_id: KS_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: "token",
    scope: "user:read:email",
  });
  return `${KS_API}/oauth2/authorize?${params.toString()}`;
}

/* ── Redirect browser to KwanzaStream login ── */
export function loginWithKwanzaStream(): void {
  window.location.href = buildLoginUrl();
}

/* ── Exchange code/token from callback hash ── */
export function parseCallbackHash(): string | null {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash.slice(1);
  const params = new URLSearchParams(hash);
  return params.get("access_token");
}

/* ── Fetch logged-in user from API ── */
export async function fetchUser(accessToken: string): Promise<KSUser> {
  const res = await fetch(`${KS_API}/helix/users`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Client-Id": KS_CLIENT_ID,
    },
  });
  if (!res.ok) throw new Error("Falha ao obter dados do utilizador");
  const json = await res.json();
  return json.data[0] as KSUser;
}

/* ── LocalStorage token persistence ── */
const TOKEN_KEY = "ks_access_token";

export function saveToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function loadToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}
