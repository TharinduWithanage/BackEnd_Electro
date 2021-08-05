var jwt = require('jsonwebtoken');
var commonResponseService = require('../service/responseService');
var configs = require('../configs/configurations')
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const sendgridtransport = require('nodemailer-sendgrid-transport');
const Cryptr = require('cryptr');
const cryptrKey = new Cryptr(configs.cryptKey);

var transporter = nodemailer.createTransport(sendgridtransport({
    auth: {
        api_key: configs.mailApiKey
    }
}));


/**
 * generate token when the user login
 * @param {*} userdata result get from the data base
 * @returns 
 */
module.exports.generateToken = (userdata) => {
    try {
        if (userdata[0].Role == "customer") {
            var jwtToken = jwt.sign({ id: userdata[0].Cust_id, firstName: userdata[0].First_name, lastName: userdata[0].Last_name, email: userdata[0].Email, role: userdata[0].Role }, configs.jwtSecretKey, { expiresIn: '30h' })

        } else {
            var jwtToken = jwt.sign({ id: userdata[0].Emp_id, firstName: userdata[0].First_name, lastName: userdata[0].Last_name, email: userdata[0].Email, role: userdata[0].Role }, configs.jwtSecretKey, { expiresIn: '30h' })

        }
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



/**
 * send mail when new user registerd
 * @param {*} mailto recepient
 * @param {*} mailfrom sender
 * @param {*} subject mail subject
 * @param {*} mailbody mail body
 * @returns 
 */
module.exports.successWithMail = (mailto, mailfrom, subject, mailbody) => {
    return transporter.sendMail({
        to: mailto,
        from: mailfrom,
        subject: subject,
        html: mailbody
    });
}



/**
 * encrypt function
 * @param {*} text string that want to encrypt
 * @returns 
 */
module.exports.encrypt = (text) => {

    const encryptedString = cryptrKey.encrypt(text);
    return encryptedString;
};


/**
 * decrypt function
 * @param {*} hash encrypted string
 * @returns 
 */
module.exports.decrypt = (hash) => {
    return new Promise((resolve, reject) => {
        const decryptedString = cryptrKey.decrypt(hash);
        resolve(decryptedString);
    })

};



