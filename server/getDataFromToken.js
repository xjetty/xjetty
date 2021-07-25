import jwt from 'jsonwebtoken'

export function getDataFromToken(token) {
    let data = {}
    jwt.verify(token, process.env.JWT_SIGNATURE, (err, decoded) => {
        if (!err)
            data = decoded
    })
    return data
}
