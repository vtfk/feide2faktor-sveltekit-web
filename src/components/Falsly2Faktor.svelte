<script>
    import RemoveFeid2kator from '../components/RemoveFeid2kator.svelte'
    import IconSpinner from './Icons/IconSpinner.svelte';

    export let userId
    export let reloadFromFalsly2Faktor = ''
    let resFromRemoveFeid2Kator
    
    let isLoading
</script>

<main>
    <div class="text">
        <p>Du har en fungerende 2 faktor til din Feide bruker, men for at dette skal bli registrert riktig i systemene må du opprette denne på nytt.</p>
        <p>Trykk på knappen under for å tilbakestille din Feide 2-faktor.</p>
        <br>
        <p>Når din Feide 2-faktor er resatt vil du få muligheten til å opprette en ny, dette tar ikke lang tid 😄</p>
        <br>
    </div>
    <div class="res">
        {#if !isLoading}
            {#if resFromRemoveFeid2Kator !== undefined}
                {#if resFromRemoveFeid2Kator.code !== 200}
                    <div class="error">
                        <p>Oi, noe gikk galt ❌</p>
                        <p>{resFromRemoveFeid2Kator.msg}</p>
                    </div>
                {:else}
                    <p>{resFromRemoveFeid2Kator}</p>
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
            <RemoveFeid2kator btnText={"Tilbakestill din Feide 2 faktor"} userId={userId} bind:res={resFromRemoveFeid2Kator} bind:isProcessing={isLoading} bind:reloadFromRemove={reloadFromFalsly2Faktor} />
        {:else}
            <RemoveFeid2kator btnText={"Tilbakestill din Feide 2 faktor"} disabled={true}/>
        {/if}
    </div>
</main>

<style>
    main {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        background-color: var(--korn-1);
        padding: 2rem;
    }

    p {
        font-size: large;
        font-weight: bolder;
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
</style>