import axios from 'axios'

export async function getEosRate() {
    const res = await axios.get(
        'https://api.coingecko.com/api/v3/simple/price?ids=eos&vs_currencies=usd'
    )
    return res.data['eos']['usd']
}
