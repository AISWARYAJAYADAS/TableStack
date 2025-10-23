import { ReactNode, useEffect, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useAppDispatch } from '@/store/hooks';
import { setAuth, clearAuth } from '@/store/slices/authSlice';

interface TokenProviderProps {
  children: ReactNode;
}

/**
 * TokenProvider handles:
 * - Detecting Auth0 login
 * - Creating a mock backend JWT with roles + expiry
 * - Storing token + user in Redux (persisted)
 * - Handling logout
 */
const TokenProvider = ({ children }: TokenProviderProps) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user, getIdTokenClaims } = useAuth0();
  const hasProcessed = useRef(false);

  // --- 🔹 Mock backend exchange with roles + expiry ---
  const exchangeAuth0TokenWithBackend = async (auth0IdToken: string) => {
    console.log("🧩 Mock backend exchange called with:", auth0IdToken);

    // Fake delay for realism
    await new Promise((resolve) => setTimeout(resolve, 400));

    // Create a fake JWT payload
    const payload = {
      sub: user?.sub || 'mock-user-123',
      email: user?.email || 'user@example.com',
      name: user?.name || 'Mock User',
      role: 'ADMIN',                // Change role to test ProtectedRoute
      exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour expiry
    };

    // Encode as base64 string (simple mock, not real JWT signature)
    const fakeJWT = btoa(JSON.stringify(payload));

    return fakeJWT;
  };

  // --- 🔹 Main Auth Flow ---
  useEffect(() => {
    const handleAuthFlow = async () => {
      if (isAuthenticated && user && !hasProcessed.current) {
        hasProcessed.current = true;

        // Get Auth0 ID token (not used in mock, but for real flow)
        const idTokenClaims = await getIdTokenClaims();
        const idToken = idTokenClaims?.__raw || '';

        // Get mock backend JWT
        const appJWT = await exchangeAuth0TokenWithBackend(idToken);

        // Decode the fake JWT payload
        const decoded = JSON.parse(atob(appJWT));

        // Optional: Check expiry
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp && decoded.exp < currentTime) {
          console.log('⚠️ Token expired!');
          dispatch(clearAuth());
          return;
        }

        // Save user + token in Redux
        dispatch(
          setAuth({
            user: decoded,
            token: appJWT,
          })
        );

        console.log('✅ Auth successful, mock JWT + roles saved in Redux');
        console.log('User info:', decoded);
      } else if (!isAuthenticated && hasProcessed.current) {
        // Clear on logout
        hasProcessed.current = false;
        dispatch(clearAuth());
        console.log('🚪 Logged out, auth cleared');
      }
    };

    handleAuthFlow();
  }, [isAuthenticated, user, getIdTokenClaims, dispatch]);

  return <>{children}</>;
};

export default TokenProvider;
