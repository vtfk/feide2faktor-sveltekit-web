<script>
    import AddFeid2kator from './AddFeid2kator.svelte';
    import IconSpinner from './Icons/IconSpinner.svelte';
    
    export let userId
    export let reloadFromFeideUser = ''
    
    let resFromAddFeid2Kator
    let isLoading
</script>

<main>
    <div class="text">
        <p>Du har ikke feide 2-faktor til din feide bruker. ❌</p>
        <p>Trykk på knappen under for å opprette feide 2-faktor til din feide konto.</p>
        <br>
        <p>Når din feide 2-faktor er opprettet vil denne fungere med engang. 😄</p>
        <br>
    </div>
    <div class="res">
        {#if !isLoading}
            {#if resFromAddFeid2Kator !== undefined}
                {#if resFromAddFeid2Kator.code !== 201}
                    <div class="error">
                        <p>Oi, noe gikk galt ❌</p>
                        <p>{resFromAddFeid2Kator.msg}</p>
                    </div>
                {/if} 
            {/if}
        {:else}
            <div class="spinner">
                <IconSpinner />
            </div>
        {/if}
    </div>
    <br>
    <div class="btn">
        {#if !isLoading}
            <AddFeid2kator btnText={"Opprett feide 2-faktor"} userId={userId} bind:res={resFromAddFeid2Kator} bind:isProcessing={isLoading} bind:reloadFromAdd={reloadFromFeideUser} />
        {:else}
            <AddFeid2kator btnText={"Opprett din feide 2-faktor"} disabled={true}/>
        {/if}
    </div>
</main>

<style>
    main {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        background-color: var(--peppermint);
        padding: 2rem;
    }

    .spinner {
        display: flex;
        justify-content: center;
    }

    .btn {
        display: flex;
        justify-content: center;
    }

    .error {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 1rem;
        background-color: var(--nype-3);
        color: black;
    }

    p {
        font-size: large;
        padding-top: 1rem;
        font-weight: bolder;
    }
</style>