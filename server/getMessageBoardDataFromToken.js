import jwt from 'jsonwebtoken'

export function getMessageBoardDataFromToken(token) {
    let messageBoardData = {}
    jwt.verify(token, process.env.JWT_SIGNATURE, (err, decoded) => {
        if (!err)
            messageBoardData = decoded
    })
    return messageBoardData
}
