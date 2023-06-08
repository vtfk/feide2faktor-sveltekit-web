<script>
    import { createFeid2kator } from "$lib/services/useApi";
    import { get } from "svelte/store";
    import Button from "./Button.svelte";
    import { msalClientStore } from "$lib/services/store";

    export let btnText  //Any text you'd like
    export let userId   //User { userID: *msalPid*}
    export let res
    export let isProcessing = false
    export let disabled = false
    export let reloadFromAdd = ''
    
    const addFeid2kator = async (body) => {
        isProcessing = true
        const resCreate = await createFeid2kator(body, get(msalClientStore))
        if(resCreate.status !== 201) {
            res = {
                msg: resCreate.data.message,
                code: resCreate.status
            }
        } else {
            res = {
                msg: resCreate.data.message,
                code: resCreate.status
            }
            reloadFromAdd = 'reloadFromAdd'
        }
        isProcessing = false
    }
</script>

<main>
    <Button removeSlots={true} disabled={disabled} buttonText={btnText} onClick={ () => addFeid2kator({userID: userId})} />
</main>

<style>

</style>