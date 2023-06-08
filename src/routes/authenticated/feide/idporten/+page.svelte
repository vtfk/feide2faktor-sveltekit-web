<script>
    import '../../../../app.css'
    import { onMount } from "svelte"
    import { msalClientStore, userOIDC, userStore } from "$lib/services/store"
    import { get } from 'svelte/store'
    import auth from "$lib/Auth/oidcAuthService"
    import { varConfig, oidcConfig } from "../../../../../config"
    import IconSpinner from "../../../../components/Icons/IconSpinner.svelte"
    import { queryGraph, userStatus } from "$lib/services/useApi";
    import Got2Faktor from "../../../../components/Got2Faktor.svelte";
    import Falsly2Faktor from "../../../../components/Falsly2Faktor.svelte";
    import FeideUser from "../../../../components/FeideUser.svelte";
    import NoFeideUser from "../../../../components/NoFeideUser.svelte";
    import Button from '../../../../components/Button.svelte';
    import VerifySecret from '../../../../components/VerifySecret.svelte';
    
    // let msalPid = '08089407290' Test bruker fra ID-porten
    let msalPid
    let user
    let oidc
    let checkUserStatus = ''

    onMount(async () => {
        try {
            oidc = sessionStorage.getItem(varConfig.oidc.token)
            oidc = JSON.parse(oidc)
            userOIDC.set(oidc)
        } catch (error) {
            console.log(error)
        } finally {
            user = get(userOIDC)
            if(oidc.expires_at + 3600 < Date.now() / 1000) {
                goto(`${web.url}/authenticated/feide`)
            }
        }
    })

    const getMsalPid = async () => {
        msalPid = await queryGraph(get(userStore).username, get(msalClientStore))
    }

    // Check if the person signed in with MSAL is the same person signed in with ID-porten. 
    // One person should not be able to set MFA on behalf of another person. 
    const checkUser = (msalPid, oidcPid) => {
        /* 
            If you want to test if the app works with test pids from ID-porten you should give the env-var "PUBLIC_VITE_OIDCPID_TEST" a value.
            The value must be equal to the pid value from the user that signs inn using MSAL. 
        */
       
        if(oidcConfig.pid.length !== 0) {
            oidcPid = oidcConfig.pid
        }
        
        if(msalPid === oidcPid) {
            return true
        } else {
            return false
        }
    }

    const userMFAFlow = async () => {
        const status = await userStatus(get(userStore).username, get(msalClientStore)) 
        return status
    }

    const checkReload = (string) => {
        if (string !== '') {
            return string
        } 
    }
</script>

<div>
    {#await getMsalPid()}
        <div class="centerSpinner">
            <IconSpinner />
        </div>
    {:then} 
        {#key checkReload(checkUserStatus)}
            {#if checkUser(msalPid, get(userOIDC).profile.pid)}
                <h2>Hei, {get(userStore).name}</h2>
                <br>
                    {#await userMFAFlow()}
                        <div class="centerSpinner">
                            <IconSpinner />
                        </div>
                    {:then res}
                        {#if res.data.status.mongoDB === true && res.data.status.got2Faktor === true && res.data.status.isFeideUser === true && res.data.status.partlyGot2Faktor === false}
                            <Got2Faktor userId={msalPid} bind:reloadFromGot2Faktor={checkUserStatus}/>
                        {:else if res.data.status.mongoDB === false && res.data.status.got2Faktor === true && res.data.status.isFeideUser === true && res.data.status.partlyGot2Faktor === false}
                            <Falsly2Faktor userId={msalPid} />
                        {:else if (res.data.status.mongoDB === false || res.data.status.mongoDB === true) && res.data.status.got2Faktor === false && res.data.status.isFeideUser === true && res.data.status.partlyGot2Faktor === false}
                            <FeideUser userId={msalPid} bind:reloadFromFeideUser={checkUserStatus} />
                        {:else if res.data.status.mongoDB === false && res.data.status.got2Faktor === false && res.data.status.isFeideUser === false && res.data.status.partlyGot2Faktor === false}
                            <NoFeideUser />
                        {:else if res.data.status.mongoDB === true && res.data.status.got2Faktor === false && res.data.status.isFeideUser === true && res.data.status.partlyGot2Faktor === true}
                            <VerifySecret userID={msalPid} oidcUser={get(userOIDC)} bind:reloadFromVerifySecret={checkUserStatus} /> 
                        {:else}
                            <p>Oi, hvordan havna du her? Noe gikk vist galt 😔</p>
                        {/if}
                    {/await}
                <br>
                <Button removeSlots={true} buttonText={"Logg ut med ID-Porten"} onClick={() => auth.logout()} />
            {:else}
                <p> Hei hei hei, du kan ikke logge inn som en annen person! 😾</p>
                <p> Azure AD kontoen du er logget på må tilhøre den personen som logger inn på ID-porten</p>
                <br>
                <Button removeSlots={true} buttonText={"Logg ut med ID-Porten"} onClick={() => auth.logout()} />
            {/if}
        {/key}
    {/await}
    
</div>