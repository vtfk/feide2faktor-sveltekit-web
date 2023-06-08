<script>
    import InitialsBadge from "./InitialsBadge.svelte";

    export let name;
    export let initials;

</script>

<div class="header">
    <div class="headerRight">
        <div class="name">
            <p>{name}</p>
        </div>
        <div class="initials">
            <InitialsBadge initials={initials} />
        </div>
    </div>
</div>

<style>
    .header {
        padding: 2rem 1rem;
        width: 100%;
        display: flex;
        margin-bottom: 1rem;
    }
    .headerRight {
        display: flex;
        align-items: center;
        margin-left: auto;
    }
    .name {
        margin: 0px 4px;
    }
    .initials {
        margin: 0px 4px;
    }

    @media(max-width: 885px) {
        .header {
            display: none;
        }
    }

</style>
