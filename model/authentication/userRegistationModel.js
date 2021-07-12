var userServiceModel = require("./userServiceModel");
var db = require("../../database/databaseConnection");

/**
 * user Registation
 * @param {*} requestData request body data
 * @returns
 */
module.exports.createUserFunc = (requestData) => {
  return new Promise(async (resolve, reject) => {
    console.log(requestData);

    var firstName = requestData.firstName.trim();
    var email = requestData.userEmail.trim();
    var lastName = requestData.lastName.trim();
    var userpassword = requestData.userPassword.trim();

    var password = await userServiceModel.encryptPassword(userpassword);

    var userRegQuery = `INSERT INTO customer (First_name,Last_name,Email,Password) VALUES("${firstName}","${lastName}","${email}","${password}");`;

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
};

/**
 * login user function
 * @param {*} requestData user enter email and password
 * @returns
 */

module.exports.loginUserFunc = (requestData) => {
  return new Promise((resolve, reject) => {
    // console.log(requestData);
    console.log("inside loginUserFunc");
    var email = requestData.userEmail.trim();
    console.log(email.substr(0, 5).length);
    if (email.substr(0, 5) == "admin" || email.substr(0, 5) == "ceben") {
      console.log("inside admin");
      var selectQuery = `SELECT Password,Role FROM employee WHERE Emp_id='${email}' OR Email='${email}' ;`;
    } else {
      console.log("inside user");
      var selectQuery = `SELECT Password,Role FROM customer WHERE Email='${email}';`;
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
          let passwordValidationStatus =
            await userServiceModel.validatePassword(
              requestData.userPassword.trim(),
              result[0].Password
            );
          //console.log(passwordValidationStatus);
          if (passwordValidationStatus) {
            resolve({ status: true, data: `${result[0].Role}` });
          } else {
            resolve({ status: false, mesg: "invalid user password" });
          }
        }
      }
    });
  });
};
