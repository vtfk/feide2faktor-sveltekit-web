<script>
    import '../app.css'
    import { onMount } from "svelte"
    import { getQrCode, getSecret, postVerifyToken } from "$lib/services/useApi";
    import Button from "./Button.svelte";
    import IconSpinner from './Icons/IconSpinner.svelte';
    import { get } from 'svelte/store';
    import { msalClientStore } from '$lib/services/store';

    export let userID
    export let oidcUser
    export let reloadFromVerifySecret = ''

    let isProcessing = false
    let notVerified = false
    let secretInput
    let secretCode
    let qrCode

    onMount(async () => { 
       secretCode = await getSecret(userID, get(msalClientStore)) 
       qrCode = await getQrCode(userID, get(msalClientStore))
    })

    const parseJWT = (token) => {
        return JSON.parse(atob(token.id_token.split('.')[1]))
    }

    const validateVerifyToken = async (id, token) => {
        isProcessing = true
        const acr = parseJWT(oidcUser).acr
        let body = {
            authLevel: acr,
            token: token
        }
        const res = await postVerifyToken(id, body, get(msalClientStore))
        if(res.status === 201 && res.data.verified !== 'Not verified') {
            notVerified = false
            reloadFromVerifySecret = 'reloadFromVerify'
        } else {
            secretInput = ''
            reloadFromVerifySecret = ''
            notVerified = true
        }
        isProcessing = false
        return res
    }

    // Do something when "Enter"-button is pressed
    const onKeyPress = async e => {
        if (e.charCode === 13) {
            validateVerifyToken(userID, secretInput)
        }
    }
</script>
{#if qrCode?.data === undefined || secretCode?.data === undefined}
    <div class="centerSpinner">
        <IconSpinner />
    </div>
{:else}
    <main>
        <div class="text">
            <ol>
                <li>Legg til din Feide 2-faktor ved å skanne QR-Koden i din autentiserings applikasjon eller skriv inn hemmeligheten som står under QR-Koden i din autentiserings applikasjon.</li>
                <li>Du vil nå få en ny oppføring blandt dine 2-faktor koder som heter "VTFK: Feide".</li>
                <br>
                <div class="wrapper">
                    {#if !isProcessing}
                        <div class="qrCode">
                            <img alt="qrcode" src={`data:image/jpeg;base64,${qrCode.data}`} />
                        </div>
                        <div class="secret">
                            <p>Hemmelighet: {secretCode.data}</p>
                        </div>
                    {:else}
                        <div class="centerSpinner">
                            <IconSpinner />
                        </div>
                    {/if}
                </div>
                <br>
                <li><strong class="validate">Skriv den 6-sifrede koden i feltet under som heter "Kode" og trykk på knappen <p style="color: red; marging-left: 0.5rem; margin-right: 0.5rem"> "Valider" </p> for å sjekke at din Feide 2-faktor har blitt opprettet riktig.</strong></li>
            </ol>
        </div>
        {#if !isProcessing && notVerified === true && secretInput?.length === 0}
            <br>
            <div class="wrongCode">
                <p>❌ Koden du skrev inn var ikke riktig, prøv igjen. ❌</p>
            </div>
        {/if}
        <br>
        <div class="input">
            <label for="token">6-sifrede kode:</label>
            <div class="inputField">
                {#if !isProcessing}
                    <!-- Fix untill type="number" actually works in chrome -->
                    {#if notVerified === true && secretInput?.length === 0}
                        <input type="number" on:keypress={onKeyPress} style="border: 1px solid red;" id="token" bind:value={secretInput} pattern="/^-?\d+\.?\d*$/" onKeyPress="if(this.value.length==6) return false;"  />
                    {:else}
                        <input type="number" on:keypress={onKeyPress} id="token" bind:value={secretInput} pattern="/^-?\d+\.?\d*$/" onKeyPress="if(this.value.length==6) return false;"  />
                    {/if}
                {:else}
                    <input type="number" bind:value={secretInput} disabled>
                {/if}
                <div class="btn">
                    {#key secretInput}
                        {#if !isProcessing && (document.getElementById("token") && document.getElementById("token").value.length <= 6)}
                            {#if document.getElementById("token")?.value.length === 0}
                                <Button buttonText={"Valider"} removeSlots={true} disabled={true}></Button>
                            {:else}
                                <Button buttonText={"Valider"} removeSlots={true} size={"medium"} onClick={ () => validateVerifyToken(userID, secretInput)}></Button>
                            {/if}
                        {:else}
                            <Button buttonText={"Valider"} removeSlots={true} disabled={true}></Button>
                        {/if}
                    {/key}
                </div>
            </div>
        </div>
    </main>
{/if}

<style>
    main {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        background-color: var(--ecruWhite);
        padding: 2rem;
    }

    .input {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 5rem;
        padding-right: 5rem;
    }

    input[type=number] {
        padding: 1.1rem;
    }

    .inputField {
        display: flex;
        flex-direction: row;
        padding-top: 0.5rem;
    }

    .wrapper {
        display: flex;
        flex-direction: column;
    }

    .btn {
        padding-left: 1rem;
    }

    .qrCode {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .secret p {
        display: flex;
        flex-direction: row;
        justify-content: center;
        font-size: large;
        padding-top: 1rem;
        font-weight: bolder;
    }

    .text ol {
        padding-left: 1rem;
        padding-right: 1rem;
    }
    
    li {
        padding: 0.2rem;
        font-size: large;
    }

    .wrongCode {
        display: flex;
        flex-direction: row;
        justify-content: center;
        color: var(--red);
        background-color: var(--potPourri);
        padding: 0.5rem;
        font-size: large;
        font-weight: bolder;
    }

    .validate {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: flex-start;
        justify-content: center;
    }

    @media(max-width: 885px) { 
        .input {
            padding-left: 1rem;
            padding-right: 1rem;
        }
    }
</style>