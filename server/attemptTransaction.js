import {getEosNodeServer} from "./getEosNodeServer";

const {Api, JsonRpc} = require('eosjs')
const {JsSignatureProvider} = require('eosjs/dist/eosjs-jssig')
const fetch = require('node-fetch')
const {TextEncoder, TextDecoder} = require('util')

const eosNodeServer = getEosNodeServer()
if (!eosNodeServer)
    return false

const rpc = new JsonRpc(eosNodeServer, {fetch})

export async function attemptTransaction(
    transactionQuantity,
    sellerEosAccountName,
    buyerEosAccountName,
    associativePrivateKey,
    memo,
    useEscrow
) {
    const signatureProvider = new JsSignatureProvider([associativePrivateKey])
    const api = new Api({
        rpc,
        signatureProvider,
        textDecoder: new TextDecoder(),
        textEncoder: new TextEncoder()
    })

    let to = sellerEosAccountName
    let toMemo = memo

    if (useEscrow) {
        to = process.env.ESCROW_EOS_ACCOUNT_NAME
        toMemo = process.env.ESCROW_MEMO
    }

    try {
        return await api.transact(
            {
                actions: [
                    {
                        account: 'eosio.token',
                        name: 'transfer',
                        authorization: [
                            {
                                actor: buyerEosAccountName,
                                permission: 'active'
                            }
                        ],
                        data: {
                            from: buyerEosAccountName,
                            to: to,
                            quantity: transactionQuantity,
                            memo: toMemo
                        }
                    }
                ]
            },
            {
                blocksBehind: 3,
                expireSeconds: 30
            }
        )
    } catch (e) {
        return false
    }
}
