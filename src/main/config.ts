//

export const config = {
  auth0: {
    domain: import.meta.env.VITE_APP_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_APP_AUTH0_CLIENT_ID,
    redirectUri: import.meta.env.VITE_APP_AUTH0_REDIRECT_URI,
  },
};
