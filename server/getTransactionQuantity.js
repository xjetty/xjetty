export function getTransactionQuantity(
    fixedAmount,
    usdAmount,
    eosAmount,
    eosRate,
    eosFormatter
) {
    const format = `${eosFormatter
        .format(usdAmount / eosRate)
        .replace('$', '')
        .replaceAll(',', '')} EOS`
    return ({format: format})
    if (fixedAmount === 'usd') {
        return `${eosFormatter
            .format(usdAmount / eosRate)
            .replace('$', '')
            .replaceAll(',', '')} EOS`
    } else return `${eosFormatter
        .format(eosAmount)
        .replace('$', '')
        .replaceAll(',', '')} EOS`
}
