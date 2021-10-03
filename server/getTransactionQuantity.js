import {eosFormatter} from '../eosFormatter'

export function getTransactionQuantity(
    fixedAmount,
    usdAmount,
    eosAmount,
    eosRate,
    quantity
) {
    let eosAmount2 = ''
    if (fixedAmount === 'usd') {
        eosAmount2 = (usdAmount * quantity) / eosRate
    } else eosAmount2 = eosAmount * quantity

    return `${eosFormatter.format(eosAmount2).replace('$', '').replace(new RegExp(',', 'g'), '')} EOS`
}
