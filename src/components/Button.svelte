<script>
    export let buttonText = ''
    export let onClick = () => {console.log('click click')}
    export let disabled = false
    export let size = 'medium'
    export let title = undefined
    export let noBorder = false
    export let onlyIcon = false
    export let removeSlots = false

    if (!title) title = buttonText

    const onClickFunc = () => {
        if(!disabled) {
            onClick()
        }
    }
</script>


<button on:click={() => onClickFunc()} title={title} class={`${size} ${disabled ? ' disabled' : ''}${noBorder ? ' noBorder' : ''}${onlyIcon ? ' onlyIcon' : ''}`}>
    {#if !removeSlots}
            <div class="beforeContainer"><slot name="before"></slot></div>
            <div class="buttonText">{buttonText}</div>
            <div class="afterContainer"><slot name="after"></slot></div>
        {:else}
            <div class="buttonText">{buttonText}</div>
    {/if}
</button>

<style>
    .beforeContainer, .buttonText, .afterContainer {
        align-self: center;
        padding: 0 0.1rem;
    }

    .onlyIcon .beforeContainer, .onlyIcon .buttonText, .onlyIcon .afterContainer {
        padding: 0;
    }
    .beforeContainer {
        height: 1.2rem;
        width: 1.2rem;
    }
    button {
        all:unset;
        display: flex;
        border: 2px solid black;
        cursor: pointer;
        border-radius: 0.5rem; /* Skal vi ha border radius???? */
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        height: 2rem;
        /* background-color: rgba(50, 107, 18, 0.096) */
        /* background-color: var(--catSkillWhite); */
    }
    button:hover {
        background-color: var(--lightBlue);
    }
    button.disabled {
        cursor: not-allowed;
        color: var(--mork);
        border: 2px solid var(--mork);
    }

    /* No border === true */
    button.noBorder { 
        border: 0px solid black;
    }
    button.disabled:hover {
        background-color: inherit;
    }
    button.small {
        height: 1.5rem;
        border: 1.5px solid black;
    }
    button.large {
        height: 3rem;
    }
    
    button.wide {
        width: 6rem;
    }
</style>