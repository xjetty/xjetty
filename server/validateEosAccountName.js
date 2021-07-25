export function validateEosAccountName(string) {
    const re = new RegExp('^([a-z1-5]){12}$')
    return re.test(string)
}