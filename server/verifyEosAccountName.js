import {getEosNodeServer} from "./getEosNodeServer";

const {JsonRpc} = require('eosjs')
const fetch = require('node-fetch')

export async function verifyEosAccountName(eosAccountName) {
    const eosNodeServer = getEosNodeServer()
    if (!eosNodeServer)
        return false
    const rpc = new JsonRpc(eosNodeServer, {fetch})
    try {
        const result = await rpc.get_account(eosAccountName)
        return !(result.json && result.json.code)
    } catch (error) {
        return false
    }
}
