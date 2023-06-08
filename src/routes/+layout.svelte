<script>
    import { userStore } from '$lib/services/store.js'
    import { get } from 'svelte/store'
    import { goto } from '$app/navigation'
    import { navigating } from "$app/stores"
    import { browser } from "$app/environment"
    import { varConfig, web } from '../../config'
    import login from '$lib/Auth/Login';
    import IconSpinner from '../components/Icons/IconSpinner.svelte';
 
    let oidc
    let msal

    if(browser && window.location.pathname === '/') {
        window.location.href = `${web.url}/authenticated`
    }

    const loginHandler = async () => {
        if(!get(userStore)) {
            const user = await login()
            userStore.set(user)
        } else {
            {}
        }
    }

   $: { 
        if(get(userStore) && (get(userStore).idTokenClaims?.exp > Date.now() / 1000)) {
            try {
                oidc = sessionStorage.getItem(varConfig.oidc.token)
                oidc = JSON.parse(oidc)
            } catch (error) {
                console.log(error)
            } finally {
                if(oidc?.expires_at + 3600 > Date.now() / 1000 && get(userStore).username.includes('@vtfk.no')) {
                    goto(`${web.url}/authenticated/feide/idporten`)
                } else {
                    if(get(userStore).username.includes('@vtfk.no')) {
                        goto('/authenticated')
                    } else {
                        goto('/rejected')
                    }
                }
            }
        }
    }
    
    // If user is navigating, check if user have a valid token. If the token is not valid, do something
    $: if($navigating) {
        try {
            msal = (get(userStore))
        } catch (error) {
            console.log(error)
        } finally {
            // If token is valid
            if(msal !== null && msal.idTokenClaims.exp > Date.now() / 1000) {
                // Check if the user is already logged in with IDporten or just logged in and tries to navigate /feide. Reroute feide/idporten. 
                if(oidc && (oidc?.expires_at + 3600 > Date.now() / 1000 && $navigating.to.url.pathname === `${web.url}/authenticated/feide`)) {
                    goto(`${web.url}/authenticated/azure/idporten`)
                } else {
                    goto($navigating.to.url.pathname)
                }
            } 
            else {
                sessionStorage?.clear()
                userStore.set(undefined)
                goto($navigating.to.url.pathname)
                location.reload(true)
            }
        }
    }
</script>
{#await loginHandler()}
    <div class="centerSpinner">
        <IconSpinner />
    </div>
{:then} 
    <slot/>
{/await}