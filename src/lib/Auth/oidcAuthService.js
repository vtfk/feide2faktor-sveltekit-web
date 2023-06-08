import config from "./oidcAuthConfig";
import { UserManager } from "oidc-client-ts";

const manager = new UserManager({
    authority: config.authority,
    client_id: config.client_id,
    redirect_uri: config.redirect_uri,
    silent_redirect_uri: config.silent_redirect_uri,
    post_logout_redirect_uri: config.post_logout_redirect_uri,
    response_type: config.response_type,
    scope: config.scope,
    loadUserInfo: true,
    acr_values: config.acr,
    metadata : {
        issuer: config.issuer,
        authorization_endpoint: config.authorization_endpoint,
        pushed_authorization_request_endpoint: config.pushed_authorization_request_endpoint,
        token_endpoint: config.token_endpoint,
        end_session_endpoint: config.end_session_endpoint,
        revocation_endpoint: config.revocation_endpoint,
        jwks_uri: config.jwks_uri,
        userinfo_endpoint: config.userinfo_endpoint,
    }
})

const checkLogin = async () => {
    try {
        const signinResponse = await manager.signinRedirectCallback()
        if(signinResponse){
            return signinResponse
        }
    } catch(error) {
        return error
    }
}

const login = async () => {
    try {
        const response = await manager.signinRedirect()
        return response
    } catch(error) {
        return error
    }
}

const logout = async () => {
    try {
        const response = await manager.signoutRedirect()
        return response
    } catch(error) {
        return error
    }
}

const auth = {
    login,
    checkLogin,
    logout
}

export default auth

