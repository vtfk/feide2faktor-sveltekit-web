import { env } from '$env/dynamic/public'

export const authConfig = {
    auth: {
        clientId: import.meta.env.VITE_CLIENT_ID,
        authority: import.meta.env.VITE_CLIENT_ISS,
        redirectUri: import.meta.env.VITE_REDIRECT_URI
      },
      cache: {
        cacheLocation: 'sessionStorage', // This configures where your cache will be stored
        storeAuthStateInCookie: false // Set this to "true" if you are having issues on IE11 or Edge
      }
}

export const varConfig = {
  oidc: {
    token: `oidc.user:${import.meta.env.VITE_OIDC_AUTHORITY}:${import.meta.env.VITE_OIDC_CLIENT_ID}`
  }
}

export const web = {
  url: import.meta.env.VITE_WEB_URL
}

export const api = {
  url: import.meta.env.VITE_API_URL,
  scope: import.meta.env.VITE_API_SCOPE,
  graph_ext: import.meta.env.VITE_API_EXT
}

export const oidcConfig = {
  pid: import.meta.env.VITE_OIDCPID_TEST
}
