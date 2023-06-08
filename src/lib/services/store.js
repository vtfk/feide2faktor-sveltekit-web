import { writable, derived } from 'svelte/store'

export const msalClientStore = writable()
export const userStore = writable('')

//OIDC Store 
export const isAuthenticatedOIDC = writable(false)
export const userOIDC = writable({})
export const popupOpenOIDC = writable(false)
export const errorOIDC = writable()