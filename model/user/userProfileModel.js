var db = require('../../database/databaseConnection');
var userServiceModel = require('../authentication/userServiceModel');


/**
 * user Profile 
 * @param {*} requestData request body data
 * @returns 
 */
module.exports.profileGetDataFunc = (id) => {
    return new Promise(async (resolve, reject) => {

        // console.log(requestData);
        // console.log("inside profileGetDataFunc");


        if (id < 1000) {
            // console.log("inside admin and ceb engineer");
            var selectQuery = `SELECT * From employee WHERE Emp_id='${id}'; `;
        } else {
            // console.log("inside user");
            var selectQuery = `SELECT * From customer WHERE Cust_id='${id}'; `;

        }


        db.query(selectQuery, async function (error, result) {

            if (error) {
                console.log(error);

                reject({ status: false, mesg: "error getting data" });
            } else {
                // console.log(result);

                resolve({ status: true, data: result });

            }

        });
    });

}

/**
 * user Profile update
 * @param {*} requestData request body data
 * @returns 
 */
module.exports.profileUpdateFunc = (requestData, id) => {
    return new Promise(async (resolve, reject) => {

        // console.log(requestData);
        // console.log("inside profileUpdateFunc");
        // var id = requestData.id;
        var firstName = requestData.firstName;
        var email = requestData.userEmail;
        var lastName = requestData.lastName;
        var contact = requestData.contact;
        var nic = requestData.nic;
        var address = requestData.address;
        // var password = await userServiceModel.encryptPassword(requestData.userPassword);

        // console.log(id);
        if (id < 1000) {
            // console.log("inside admin and ceb engineer");
            var updateQuery = `UPDATE employee SET First_name ='${firstName}', Last_name ='${lastName}', Conatact_no ='${contact}', NIC ='${nic}', Address ='${address}'   WHERE Emp_id='${id}';`;
            var selectQuery = `SELECT * From employee WHERE Emp_id='${id}'; `;
        } else {
            // console.log("inside user");
            var updateQuery = `UPDATE customer SET First_name ='${firstName}', Last_name ='${lastName}', Email ='${email}' WHERE Cust_id='${id}';`;
            var selectQuery = `SELECT * From customer WHERE Cust_id='${id}'; `;

        }


        db.query(updateQuery, async function (err, result) {

            if (err) {
                console.log(err);

                reject({ status: false, mesg: "error updating user" });
            } else {
                resolve({ status: true, mesg: "updated successfully" });



                // resolve({ status: false, mesg: "user updated sucessfully" });

            }

        });
    });

}


module.exports.getAllEmailsFunc = () => {
    return new Promise(async (resolve, reject) => {


        // console.log("inside getAllEmailsFunc");

        var selectQuery = `SELECT Email From customer ; `;



        db.query(selectQuery, async function (error, result) {

            if (error) {
                console.log(error);

                reject({ status: false, mesg: "error getting data" });
            } else {
                // console.log(result);

                resolve({ status: true, data: result });

            }

        });
    });

}