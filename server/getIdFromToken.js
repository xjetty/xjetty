import jwt from 'jsonwebtoken'

export function getIdFromToken(token, idName) {
    let id = null
    jwt.verify(token, process.env.JWT_SIGNATURE, (err, decoded) => {
        if (!err) id = decoded[idName]
    })
    return id
}
