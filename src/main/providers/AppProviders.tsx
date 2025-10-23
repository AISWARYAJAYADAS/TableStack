import { ReactNode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Auth0Provider } from "@auth0/auth0-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { store, persistor } from "@/store";
import { config } from "@/main/config";
import TokenProvider from "@/main/providers/TokenProvider";

const queryClient = new QueryClient();

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  const { auth0 } = config;

  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <Auth0Provider
          domain={auth0.domain}
          clientId={auth0.clientId}
          authorizationParams={{
            redirect_uri: auth0.redirectUri
          }}
          cacheLocation="localstorage"   // crucial for page reload persistence
          useRefreshTokens={true}        // enables silent refresh
        >
          <QueryClientProvider client={queryClient}>
            <TokenProvider>
              <ReactQueryDevtools initialIsOpen={false} />
              {children}
            </TokenProvider>
          </QueryClientProvider>
        </Auth0Provider>
      </PersistGate>
    </Provider>
  );
};
