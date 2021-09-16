import randomstring from 'randomstring'
import Listing from '../models/Listing'

export async function generateCode() {
    let randomString = ''
    let code = null
    while (true) {
        randomString = randomstring.generate({
            length: 5,
            readable: true,
            capitalization: 'uppercase'
        })
        code = await Listing.findOne({code: randomString})
        if (!code) break
    }
    return randomString
}
