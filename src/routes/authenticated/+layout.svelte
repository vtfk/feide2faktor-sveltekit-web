<script>
    import '../../app.css'
    import Header from '../../components/Header.svelte';
    import SideNav from '../../components/SideNav.svelte';
    import { onMount } from 'svelte';
    import IconSpinner from '../../components/Icons/IconSpinner.svelte';
    import { userStore } from '$lib/services/store';
    import { get } from 'svelte/store';
    import TopNav from '../../components/TopNav.svelte';

    let msalUser
    onMount(async () => {
        msalUser = get(userStore)
    })

    const getInitials = (name) => {
        const split = name.split(' ')
        return `${split[0][0].toUpperCase()} ${split[split.length - 1][0].toUpperCase()}`
    }

    // This function only exists to create a delay for the store to actually get the values.
    const delay = async () => {
        return await msalUser
    }
   
</script>
{#await delay()}
    <div class="centerSpinner">
        <IconSpinner />
    </div>
{:then} 
    <div class="sideNavWrapper">
        <SideNav/>
    </div>
    <div class="topNavWrapper">
        <TopNav/>
    </div>
    <div class="contentWrapper">
        <Header name={msalUser.name} initials={getInitials(msalUser.name)}></Header>
        <div class="toKatorWrapper">
            <div class="toKatorContent">
                <slot></slot>
            </div>
        </div>
    </div>
{/await}


<style>
    .toKatorWrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }
    .sideNavWrapper, .contentWrapper {
        min-height: 100vh;
    }

    .sideNavWrapper {
        position: fixed;
        width: calc(var(--sidenavWidth));
        background-color: var(--varme-1);
        top: 0;
        bottom: 0;
        left: 0;
        overflow-y:auto;
        overflow-x:hidden;
    }

    .topNavWrapper { 
        position: sticky;
        width: 100%;
        background-color: var(--varme-1);
        height: calc((var(--topNavHeight)));
        top: 0;
        bottom: 0;
        left: 0;
        overflow-y:auto;
        overflow-x:hidden;
    }

    .contentWrapper {
        margin-left: var(--sidenavWidth);
        width: calc(100vw - var(--sidenavWidth));
        padding: 0px 32px;
    }

    .toKatorContent {
        margin-top: 2rem;
        width: 70vw;
        padding: 3rem;
    }

    @media(max-width: 885px) {
        .sideNavWrapper {
            display: none;
        }

        .contentWrapper {
            margin-left: 0;
            width: auto;
            padding: 0px 0px;
            margin-top: 0rem;
        }
        .toKatorContent {
            width: 100%;
            padding: 1rem;
        }
    }

    @media(min-width: 886px) {
        .topNavWrapper {
            display: none;
        }
    }
</style>