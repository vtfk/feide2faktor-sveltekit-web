<script>
    import '../../../app.css'
    import { goto } from '$app/navigation';
    import auth from "$lib/Auth/oidcAuthService";
    import { userOIDC } from '$lib/services/store';
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
    import { varConfig, web } from '../../../../config';
    import Button from '../../../components/Button.svelte';

    onMount(async () => {
        await auth.checkLogin()
        let oidc
        try {
            oidc = sessionStorage.getItem(varConfig.oidc.token)
            oidc = JSON.parse(oidc)
            userOIDC.set(oidc)
        } catch (error) {
            console.log(error)
        } finally {
            // Om oidc token er gyldig, send bruker til /idporten
            if(oidc?.expires_at + 3600 > Date.now() / 1000) {
                goto(`${web.url}/authenticated/feide/idporten`)
            }
        }
    })
</script>
<main>
    {#if !get(userOIDC)?.expires_at || get(userOIDC)?.expires_at + 3600 < Date.now() / 1000}
        <div class="header2kator">
            <h1>Sett Feide 2-faktor</h1>
        </div>
        <div class="contentWrapper">
            <div class="content2kator">
            <p>Du må være logget inn med ID-porten for å sette Feide 2-faktor.</p>
            <br>
            <p>NB! Du kan ikke logge inn på ID-Porten som en annen person enn den som er logget inn med Microsoft, gjør du dette vil du ikke ha mulighet til å sette Feide 2-faktor.</p>
            <br>
            <Button buttonText={"Login med ID-Porten"} onClick={ () => auth.login()}  removeSlots={true} />
            </div>
        </div>
        <br>
        <a href="/authenticated">{'⬅ Hjem'}</a>
    {/if}
</main>

<style>
    .contentWrapper {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        background-color: var(--swansDown);
        padding: 2rem;
    }

    p {
        font-size: large;
        font-weight: bolder;
    }
</style>
