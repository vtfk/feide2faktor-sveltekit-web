// Check if the user that is signed in with MSAL is the same user that sign in with ID porten 
export const checkUser = async (msalPid, oidcPid) => {
    if(msalPid === oidcPid) {
        return true
    } else {
        return false
    }
}