var db = require('../../database/databaseConnection');
var userServiceModel = require('../authentication/userServiceModel');


/**
 * user Profile update
 * @param {*} requestData request body data
 * @returns 
 */
module.exports.profileUpdateFunc = (requestData) => {
    return new Promise(async (resolve, reject) => {

        // console.log(requestData);
        console.log("inside profileUpdateFunc");
        var id = requestData.id;
        var firstName = requestData.firstName;
        var email = requestData.userEmail;
        var lastName = requestData.lastName;
        var contact = requestData.contact;
        var password = await userServiceModel.encryptPassword(requestData.userPassword);

        console.log(email.substr(0, 5));
        if (email.substr(0, 5) == "Admin" || email.substr(0, 5) == "Ceben") {
            console.log("inside admin");
            var updateQuery = `UPDATE employee SET first_name ='${firstName}', last_name ='${lastName}', email ='${email}', password ='${password}', contact ='${contact}'   WHERE emp_id='${id}' OR email='${email}' ;`;
            var selectQuery = `SELECT first_name,last_name,email,password,contact From employee WHERE emp_id='${id}'; `;
        } else {
            console.log("inside user");
            var updateQuery = `UPDATE customer SET first_name ='${firstName}', last_name ='${lastName}', email ='${email}', password ='${password}', contact ='${contact}'   WHERE id='${id}' OR email='${email}' ;`;
            var selectQuery = `SELECT first_name,last_name,email,password,contact From customer WHERE id='${id}'; `;

        }


        db.query(updateQuery, async function (err, result) {

            if (err) {

                reject("error");
            } else {
                db.query(selectQuery, async function (error, result) {

                    if (error) {

                        reject("error getting data");
                    } else {
                        console.log(result);

                        resolve({ status: true, data: result });

                    }




                });

                // resolve({ status: false, mesg: "user updated sucessfully" });

            }




        });


    });

}