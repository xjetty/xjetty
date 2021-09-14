const os = require('os')

export function getLocalhost() {
    return os.hostname().indexOf('local') > -1
}