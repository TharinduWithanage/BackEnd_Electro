var jwt = require('jsonwebtoken');
var commonResponseService = require('../service/responseService');
var configs = require('../configs/configurations')

/**
 * generate token when the user login
 * @param {*} userdata result get from the data base
 * @returns 
 */
module.exports.generateToken = (userdata) => {
    try {
        const jwtToken = jwt.sign({ firstName: userdata[0].First_name, lastName: userdata[0].Last_name, email: userdata[0].Email, role: userdata[0].Role }, configs.jwtSecretKey, { expiresIn: '30h' })
        return jwtToken;
    } catch (error) {
        return null;
    }
}


/**
 * check the token is valid or not
 * @param {*} request 
 * @param {*} response 
 * @param {*} next next function
 * @returns 
 */
module.exports.validateToken = (request, response, next) => {
    try {
        var tokenResult = getTokenFromHeader(request);
        if (tokenResult) {
            jwt.verify(tokenResult, configs.jwtSecretKey, function validData(error, decordedData) {
                if (error) {
                    commonResponseService.errorWithMessage(response, "Invalid Token");
                    console.log(decordedData);
                } else {
                    next();
                }

            });
        } else {
            commonResponseService.errorWithMessage(response, "Invalid Token");
        }


    } catch (error) {
        return null;
    }
}

/**
 * get the token from header
 * @param {*} request request data
 * @returns token
 */
function getTokenFromHeader(request) {
    var token = null;
    if (request.headers.authorization) {
        if (request.headers.authorization.split(" ")[1]) {
            token = request.headers.authorization.split(" ")[1];
        }
    }
    return token;
}