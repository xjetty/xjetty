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
    if (fixedAmount === 'usd') {
        return `${eosFormatter
            .format(usdAmount / eosRate)
            .replace('$', '')
            .replaceAll(',', '')} EOS`
    } else return `${eosAmount} EOS`
}
