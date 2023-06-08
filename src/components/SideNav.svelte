<script>
    import Logo from './Icons/Logo.svelte'
</script>

<div class=container>
    <div class="logoContainer">
        <Logo />
    </div>
    <div style="text-align: center; width: 100%;">
        <p style="padding: 0px;"><strong>Feide 2-Faktor</strong></p>
        <!-- {#if environment === 'test'}
            <p style="padding: 0px;"><strong>TEST</strong></p>
        {/if} -->
    </div>
    <div class="sideNavItemsContainer">
        <div class="sideNavFlexHelper">
            <div class="sideNavItem">
                <a href="/authenticated">
                    <div class="icon">
                        <p>🏡</p>
                    </div>
                    <p>Hjem</p>
                </a>
            </div>
            <div class="sideNavItem">
                <a href="/authenticated/feide">
                    <div class="icon">
                        <p>🔐</p>
                    </div>
                    <p>Feide</p>
                </a>
            </div>
            <div class="sideNavItem">
                <a href="/authenticated/hjelp">
                    <div class="icon">
                        <p>❓</p>
                    </div>
                    <p>Hjelp</p>
                </a>
            </div>
        </div>
    </div>
</div>

<style>
    .container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .logoContainer {
        margin: 0px auto;
        padding-top: 36px;
        width: 3.5rem;
    }
    .sideNavItemsContainer {
        flex: 1;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 150px;
        width: 100%;
    }

    .sideNavFlexHelper {
        width: 100%;
        text-align: center;
    }
    
    .sideNavItem:hover {
        background: #dcac89;
        cursor: pointer;
    }
    
    .icon {
        color: #000000;
        width: 2rem;
        height: 2rem;
        display: block;
        width: 100%;
    }

    .sideNavItem p {
        padding: 1.25rem 0.5rem;
        font-weight: 400;
        text-decoration: none;
        font-size: 20px;
        color: #000000;
        display: block;
    }
</style>