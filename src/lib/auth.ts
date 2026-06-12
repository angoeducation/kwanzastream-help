import { nanoid } from 'nanoid';

export function buildLoginUrl(): string {
  const state = nanoid(16);
  sessionStorage.setItem('oauth_state', state);

  const params = new URLSearchParams({
    client_id: import.meta.env.VITE_KS_CLIENT_ID || '',
    redirect_uri: `${import.meta.env.VITE_SITE_URL}/auth/callback`,
    response_type: 'code',
    scope: 'user:read:email',
    state,
  });

  return `${import.meta.env.VITE_KS_API_URL}/oauth2/authorize?${params.toString()}`;
}

export async function exchangeCodeForToken(code: string): Promise<string> {
  const response = await fetch(`${import.meta.env.VITE_KS_API_URL}/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      client_id: import.meta.env.VITE_KS_CLIENT_ID || '',
      redirect_uri: `${import.meta.env.VITE_SITE_URL}/auth/callback`,
    }),
  });

  if (!response.ok) throw new Error('Falha na troca do código');
  const data = await response.json();
  return data.access_token;
}

export async function fetchUser(token: string) {
  const response = await fetch(`${import.meta.env.VITE_KS_API_URL}/oauth2/userinfo`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) return null;
  return response.json();
}

export function saveToken(token: string): void {
  localStorage.setItem('ks_help_token', token);
}

export function getToken(): string | null {
  return localStorage.getItem('ks_help_token');
}

export function clearToken(): void {
  localStorage.removeItem('ks_help_token');
  sessionStorage.removeItem('oauth_state');
}
