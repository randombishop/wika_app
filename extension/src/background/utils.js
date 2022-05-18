function getEnvironment() {
    const url = window.location.href
    const env = (url.split(':')[0] === 'chrome-extension') ? 'ext' : 'app'
    return env ;
}

export {
    getEnvironment
} ;