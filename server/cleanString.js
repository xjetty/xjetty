const xss = require('xss')

export function cleanString(string) {
    return xss(string.trim(), {
        whiteList: {},
        stripIgnoreTag: true,
        stripIgnoreTagBody: ['script']
    })
}