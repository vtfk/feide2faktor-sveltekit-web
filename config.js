import { env } from '$env/dynamic/public'

export const authConfig = {
    auth: {
        clientId: env.PUBLIC_VITE_CLIENT_ID,
        authority: env.PUBLIC_VITE_CLIENT_ISS,
        redirectUri: env.PUBLIC_VITE_REDIRECT_URI
      },
      cache: {
        cacheLocation: 'sessionStorage', // This configures where your cache will be stored
        storeAuthStateInCookie: false // Set this to "true" if you are having issues on IE11 or Edge
      }
}

export const varConfig = {
  oidc: {
    token: `oidc.user:${env.PUBLIC_VITE_OIDC_AUTHORITY}:${env.PUBLIC_VITE_OIDC_CLIENT_ID}`
  }
}

export const web = {
  url: env.PUBLIC_VITE_WEB_URL
}

export const api = {
  url: env.PUBLIC_VITE_API_URL,
  scope: env.PUBLIC_VITE_API_SCOPE,
  graph_ext: env.PUBLIC_VITE_API_EXT
}

export const oidcConfig = {
  pid: env.PUBLIC_VITE_OIDCPID_TEST
}
