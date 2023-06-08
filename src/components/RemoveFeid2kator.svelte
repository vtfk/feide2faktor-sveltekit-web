<script>
    import { deleteFeid2kator } from "$lib/services/useApi";
    import { get } from "svelte/store";
    import Button from "./Button.svelte";
    import { msalClientStore } from "$lib/services/store";

    export let btnText  //Any text you'd like
    export let userId   //User PID
    export let res
    export let isProcessing = false
    export let disabled = false
    export let reloadFromRemove = ''
    
    const removeFeid2kator = async (id) => {
        isProcessing = true
        const resDelete = await deleteFeid2kator(id, get(msalClientStore))
        if(resDelete.status !== 200) {
            res = {
                msg: resDelete.data.message,
                code: resDelete.status
            }
        } else {
            res = {
                msg: resDelete.data.message,
                code: resDelete.status
            }
            reloadFromRemove = 'reloadFromRemove'
        }
        isProcessing = false
    }
</script>

<main>
    <Button removeSlots={true} disabled={disabled} buttonText={btnText} onClick={ () => removeFeid2kator(userId)} />
</main>

<style>

</style>