import { useEffect } from 'react';
import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router';
import { exchangeCodeForToken, fetchUser, saveToken } from '@/lib/auth';
import { useAuth } from '@/context/AuthContext';

export const Route = createFileRoute('/auth/callback')({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      code: search.code as string | undefined,
      state: search.state as string | undefined,
      error: search.error as string | undefined,
    };
  },
  component: AuthCallbackPage,
});

function AuthCallbackPage() {
  const navigate = useNavigate();
  const search = useSearch({ from: '/auth/callback' });
  const { setUser } = useAuth();

  useEffect(() => {
    async function handleCallback() {
      if (search.error) {
        console.error('OAuth error:', search.error);
        navigate({ to: '/' });
        return;
      }

      // Valida state para prevenir CSRF
      const savedState = sessionStorage.getItem('oauth_state');
      if (!search.code || search.state !== savedState) {
        console.error('Invalid code or state mismatch');
        navigate({ to: '/' });
        return;
      }

      try {
        const token = await exchangeCodeForToken(search.code);
        saveToken(token);
        const user = await fetchUser(token);
        if (user) {
          setUser(user);
        }
        navigate({ to: '/' });
      } catch (error) {
        console.error('Erro no callback auth:', error);
        navigate({ to: '/' });
      }
    }

    handleCallback();
  }, [search, navigate, setUser]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-ks-bg">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-ks-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[14px] text-ks-text-secondary">A autenticar...</p>
      </div>
    </div>
  );
}
