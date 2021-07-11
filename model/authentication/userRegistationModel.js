var userServiceModel = require('./userServiceModel');
var db = require('../../database/databaseConnection');


/**
 * user Registation
 * @param {*} requestData request body data
 * @returns 
 */
module.exports.createUserFunc = (requestData) => {
    return new Promise(async (resolve, reject) => {

        console.log(requestData);

        var firstName = requestData.firstName;
        var email = requestData.userEmail;
        var lastName = requestData.lastName;

        var password = await userServiceModel.encryptPassword(requestData.userPassword);

        var userRegQuery = `INSERT INTO customer (first_name,last_name,email,password) VALUES("${firstName}","${lastName}","${email}","${password}");`;

        // insert data to customer table
        db.query(userRegQuery, (err, result) => {
            if (err) {
                console.log("inserting error", err);
                reject({ status: false, mesg: "user registered unsucessfull" });
            } else {
                resolve({ status: true, mesg: "user registered sucessfully" });

            }

        });

    });

}

/**
 * login user function
 * @param {*} requestData user enter email and password
 * @returns 
 */

module.exports.loginUserFunc = (requestData) => {
    return new Promise((resolve, reject) => {

        // console.log(requestData);
        console.log("inside loginUserFunc");
        var email = requestData.userEmail;
        console.log(email.substr(0, 5));
        if (email.substr(0, 5) == "Admin" || email.substr(0, 5) == "Ceben") {
            console.log("inside admin");
            var selectQuery = `SELECT password,role FROM employee WHERE emp_id='${email}' OR email='${email}' ;`;
        } else {
            console.log("inside user");
            var selectQuery = `SELECT password,role FROM customer WHERE email='${email}';`;
        }


        db.query(selectQuery, async function (err, result) {

            if (err) {

                reject("error");
            } else {
                if (result.length == 0) {

                    // reject({ status: false, mesg: "invalid user" });
                    resolve({ status: false, mesg: "invalid email" });
                } else {
                    // console.log(result[0].password);
                    // console.log(result[0].role);
                    let passwordValidationStatus = await userServiceModel.validatePassword(requestData.userPassword, result[0].password);
                    //console.log(passwordValidationStatus);
                    if (passwordValidationStatus) {
                        resolve({ status: true, data: `${result[0].role}` });
                    } else {
                        resolve({ status: false, mesg: "invalid user password" });
                    }
                }
            }




        });


    });

}