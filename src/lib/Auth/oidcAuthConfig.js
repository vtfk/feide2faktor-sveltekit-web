const config = {
    authority: import.meta.env.VITE_OIDC_AUTHORITY,
    client_id: import.meta.env.VITE_OIDC_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_OIDC_REDIRECT_URI,
    acr: import.meta.env.VITE_OIDC_ACR_VALUES,
    silent_redirect_uri: import.meta.env.VITE_OIDC_SILET_REDIRECT_URI,
    post_logout_redirect_uri: import.meta.env.VITE_OIDC_POST_LOGOUT_REDIRECT_URI,
    response_type: import.meta.env.VITE_OIDC_RESPONSE_TYPE,
    scope: import.meta.env.VITE_OIDC_APP_SCOPE,
    loadUserInfo: true,
    issuer: import.meta.env.VITE_OIDC_ISSUER,
    authorization_endpoint: import.meta.env.VITE_OIDC_AUTHORIZATION_ENDPOINT,
    pushed_authorization_request_endpoint: import.meta.env.VITE_OIDC_PUSHED_AUTHORIZATION_REQUEST_ENDPOINT,
    token_endpoint: import.meta.env.VITE_OIDC_TOKEN_ENDPOINT,
    end_session_endpoint: import.meta.env.VITE_OIDC_END_SESSION_ENDPOINT,
    revocation_endpoint: import.meta.env.VITE_OIDV_REVOCATION_ENDPOINT,
    jwks_uri: import.meta.env.VITE_OIDC_JWKS_URI,
    userinfo_endpoint: import.meta.env.VITE_OIDV_USERINFO_ENDPOINT
}

export default config
