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
    const search = '$,'
    const replacer = new RegExp(search, 'g')
    if (fixedAmount === 'usd') {
        return `${eosFormatter
            .format(usdAmount / eosRate)
            .replace(replacer, '')} EOS`
    } else return `${eosFormatter
        .format(eosAmount)
        .replace(replacer, '')} EOS`
}
