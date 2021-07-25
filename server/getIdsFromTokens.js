import jwt from 'jsonwebtoken'

export function getIdsFromTokens(tokens, idName) {
    const ids = []
    tokens.forEach(function (value) {
        let id = null
        jwt.verify(value, process.env.JWT_SIGNATURE, (err, decoded) => {
            if (!err) id = decoded[idName]
        })
        ids.push(id)
    })
    return ids
}
