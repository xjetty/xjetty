import randomstring from 'randomstring'
import Post from '../models/Post'

export async function generateCode() {
    let randomString = ''
    let code = null
    while (true) {
        randomString = randomstring.generate({
            length: 5,
            readable: true,
            capitalization: 'uppercase'
        })
        code = await Post.findOne({code: randomString})
        if (!code) break
    }
    return randomString
}
