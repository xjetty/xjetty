const urlExists = require('url-exists')

export function getEosNodeServer() {
    let eosNodeServer = process.env.EOS_NODE_SERVER_MAIN
    urlExists(eosNodeServer, function (err, exists) {
        if (!exists) {
            eosNodeServer = process.env.EOS_NODE_SERVER_BACKUP
            urlExists(eosNodeServer, function (err, exists) {
                if (!exists) return false
            })
        }
    })
    return eosNodeServer
}