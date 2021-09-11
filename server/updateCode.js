import randomstring from 'randomstring'
import Post from '../models/Post'

export async function updateCode(id) {
    let randomString = ''
    let code = null
    while (true) {
        randomString = randomstring.generate({
            length: process.env.LISTING_CODE_LENGTH,
            readable: true,
            capitalization: 'uppercase'
        })
        code = await Post.findOne({code: randomString})
        if (!code) break
    }
    await Post.updateOne({_id: id}, {$set: {code: randomString, lastUpdatedOnTimestamp: Date.now()}})
    return randomString
}
