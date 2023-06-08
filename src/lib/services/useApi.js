import axios from "axios"
import login from "$lib/Auth/Login";
import { api } from "../../../config";

const getAccessToken = async (client, graphQuery) => {
    let accessToken
    try {
        const msalClient = client
        if(graphQuery === true) {
            accessToken = (await msalClient.acquireTokenSilent({ scopes: ['User.Read.All'] })).accessToken
        } else {
            accessToken = (await msalClient.acquireTokenSilent({ scopes: [api.scope] })).accessToken
        }
    } catch (error) {
        // If acquireTokenSilent failed - we assume the user has been logged out or the refresh token has expired - simply log in again :)
        await login(true)
        const msalClient = client
        if(graphQuery === true) {
            accessToken = (await msalClient.acquireTokenSilent({ scopes: ['User.Read.All'] })).accessToken
        } else {
            accessToken = (await msalClient.acquireTokenSilent({ scopes: [api.scope] })).accessToken
        }
    }

    const headers = {
        authorization: `Bearer ${accessToken}`
    }

    return headers
}
    
// Get chucky
export const getChuck = async () => {
    const res = (await axios.get('https://api.chucknorris.io/jokes/random')).data
    return res
}

// Get userStatus
export const userStatus = async (userID, client) => {
    const accesToken = await getAccessToken(client, false)
    const res = await axios.get(`${api.url}/userStatus/${userID}`, { headers: accesToken })
    return res
} 

// Remove feid2kator
export const deleteFeid2kator = async (userID, client) => {
    const accesToken = await getAccessToken(client, false)
    const res = await axios.delete(`${api.url}/delete/${userID}`, { headers: accesToken })
    return res
}

// Create feid2kator 
export const createFeid2kator = async (body, client) => {
    const accesToken = await getAccessToken(client, false)
    const res = await axios.post(`${api.url}/mfaCreated`, body, { headers: accesToken })
    return res
}

// Post verifyToken
export const postVerifyToken = async (userID, body, client) => {
    const accesToken = await getAccessToken(client, false)
    const res = await axios.post(`${api.url}/verifyToken/${userID}`, body, { headers: accesToken })
    return res
}

// Get QrCode
export const getQrCode = async (userID, client) => {
    const accesToken = await getAccessToken(client, false)
    const res = await axios.get(`${api.url}/qrcode/${userID}`, { headers: accesToken })
    return res
}

// Get Secret
export const getSecret = async (userID, client) => {
    const accesToken = await getAccessToken(client, false)
    const res = await axios.get(`${api.url}/secret2faktor/${userID}`, { headers: accesToken })
    return res
}

export const queryGraph = async (userID, client) => {
    const accesToken = await getAccessToken(client, true)
    let res = await axios.get(`https://graph.microsoft.com/v1.0/users/${userID}?$select=${api.graph_ext}`, { headers: accesToken })
    
    res = res.data[api.graph_ext]
    return res
}