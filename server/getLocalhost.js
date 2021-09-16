export function getLocalhost(remoteAddress) {
    console.log(remoteAddress)
    return remoteAddress === '127.0.0.1' || remoteAddress === 'localhost'
}