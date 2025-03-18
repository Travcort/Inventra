const info = (...params) => {
    console.log(...params);
}

const errors = (...params) => {
    console.error(...params);
}

const requestsLogger = (request, response, next) => {
    info('Method:', request.method)
    info('Path:', request.path)
    info('Body', request.body)
    info('-----')
    next()
}

export {info, errors, requestsLogger}