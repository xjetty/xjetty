export function getTransactionQuantity(
    fixedAmount,
    usdAmount,
    eosAmount,
    eosRate
) {
    const eosFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 4,
        maximumFractionDigits: 4
    })
    let eosAmount2 = ''
    if (fixedAmount === 'usd') {
        eosAmount2 = usdAmount / eosRate
    } else eosAmount2 = eosAmount

    return `${eosFormatter.format(eosAmount2).replace('$', '').replace(new RegExp(',', 'g'), '')} EOS`
}
