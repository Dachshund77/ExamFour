/**
 * Json template for response codes of 200
 */
exports.ok = function ok(data) {
    if (!(data instanceof Array) && data != undefined) { //Always eturn it wrapped in a list
        data = [data]
    }
    return {
        status: 'success',
        data: data
    }
}

/**
 * Json template for response codes of 201
 */
exports.created = function created(data) { //Note that this does not support lists
    if (!(data instanceof Array) && data != undefined) { //Always eturn it wrapped in a list
        data = [data]
    }
    return {
        status: 'success',
        data: data
    }
}

/**
 * Json template for response codes of 204
 */
exports.noContent = function noContent() { //Note that this does not support lists
    return {
        status: 'success',
    }
}

/**
 * Json template for response codes of 400
 */
exports.badRequest = function badRequest(msg, err) { //Note that this does not support lists
    if (!(err instanceof Array) && err != undefined) { //Always eturn it wrapped in a list
        err = [err]
    }
    return {
        status: 'fail',
        message: msg,
        errors: err
    }
}

/**
 * Json template for response codes of 401
 */
exports.unauthorized = function unauthorized(msg, err) { //Note that this does not support lists
    if (!(err instanceof Array) && err != undefined) { //Always eturn it wrapped in a list
        err = [err]
    }
    return {
        status: 'fail',
        message: msg,
        errors: err
    }
}

/**
 * Json template for response codes of 403
 */
exports.forbidden = function forbidden(msg, err) { //Note that this does not support lists
    if (!(err instanceof Array) && err != undefined) { //Always eturn it wrapped in a list
        err = [err]
    }
    return {
        status: 'fail',
        message: msg,
        errors: err
    }
}

/**
 * Json template for response codes of 404
 */
exports.notFound = function notFound(msg, err) { //Note that this does not support lists
    if (!(err instanceof Array) && err != undefined) { //Always eturn it wrapped in a list
        err = [err]
    }
    return {
        status: 'fail',
        message: msg,
        errors: err
    }
}

/**
 * Json template for response codes of 409
 */
exports.conflict = function conflict(msg, err) { //Note that this does not support lists
    if (!(err instanceof Array) && err != undefined) { //Always eturn it wrapped in a list
        err = [err]
    }
    return {
        status: 'fail',
        message: msg,
        errors: err
    }
}


/*
 * Template for 500 response code
 */
exports.internalServerError = function internalServerError(msg, err) { //Thee a case to be made that this shoud allow multiple
    if (!(err instanceof Array) && err != undefined) { //Always eturn it wrapped in a list
        err = [err]
    }
    return {
        status: 'error',
        message: msg,
        errors: err
    }
}