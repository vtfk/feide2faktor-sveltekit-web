
import { PublicClientApplication } from '@azure/msal-browser'
import { api, authConfig } from '../../../config.js'
import { msalClientStore } from '$lib/services/store.js' 
import { get } from 'svelte/store'

const login = async (forceLogin = false) => {
  const msalClient = get(msalClientStore) || new PublicClientApplication(authConfig)
  const loginResponse = await msalClient.handleRedirectPromise()
  if (loginResponse && !forceLogin) {
    msalClient.setActiveAccount(loginResponse.account)
    msalClientStore.set(msalClient)
    return loginResponse.account
  } else {
    msalClient.loginRedirect({ scopes: [api.scope] })
  }
}

export default login
 