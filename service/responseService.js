module.exports.responseWithData = (response, dataVal) => {
    return response.send({
        status: true,
        data: dataVal
    });
}


module.exports.errorWithMessage = (response, message) => {
    return response.send({
        status: false,
        message: message
    });
}

module.exports.successWithMessage = (response, message) => {
    return response.send({
        status: true,
        message: message
    });
}