var commonResponseService = require("../../service/responseService");
var userRegisterModel = require("../../model/authentication/userRegistationModel");

/**
 * user registation controller function
 * @param {*} request
 * @param {*} response
 */

//Creting a user account in signup
async function createUser(request, response) {
  try {
    // console.log("inside userregisterController");

    var createUser = await userRegisterModel.createUserFunc(request.body);
    console.log(createUser);
    commonResponseService.responseWithData(response, createUser);
    console.log("createUser");
  } catch (error) {
    console.log(error);
    commonResponseService.errorWithMessage(response, "something went wrong");
  }
}

//Sign-in of a user
async function loginUser(request, response) {
  try {
    var loginUserStatus = await userRegisterModel.loginUserFunc(request.body);

    console.log("inside loginUser controller");
    console.log(loginUserStatus);
    // response.send(loginUserStatus);
    if (loginUserStatus.status) {
      commonResponseService.responseWithToken(
        response,
        loginUserStatus.data,
        loginUserStatus.token
      );
    } else {
      commonResponseService.errorWithMessage(response, loginUserStatus.mesg);
    }
  } catch (error) {
    console.log(error);
    commonResponseService.errorWithMessage(response, "something went wrong");
  }
}

/**
 * check email is valid or not
 * @param {*} request email address
 * @param {*} response
 */

//get email duplications
async function checkEmail(request, response) {
  try {
    var chechMailStatus = await userRegisterModel.checkEmailFunc(request.body);

    console.log("inside checkEmail controller");

    if (chechMailStatus.status) {
      commonResponseService.successWithMessage(response, chechMailStatus.mesg);
    } else {
      commonResponseService.errorWithMessage(response, chechMailStatus.mesg);
    }
  } catch (error) {
    console.log(error);
    commonResponseService.errorWithMessage(response, "something went wrong");
  }
}

//Reset a password by a user
async function resetPassword(request, response) {
  try {
    var resetPasswordStatus = await userRegisterModel.resetPasswordFunc(
      request.body,
      request.params.eid
    );

    console.log("inside resetPassword controller");

    if (resetPasswordStatus.status) {
      commonResponseService.successWithMessage(
        response,
        resetPasswordStatus.mesg
      );
    } else {
      commonResponseService.errorWithMessage(
        response,
        resetPasswordStatus.mesg
      );
    }
  } catch (error) {
    console.log(error);
    commonResponseService.errorWithMessage(response, "something went wrong");
  }
}

/**
 * new ceb engineer registation controller function
 * @param {*} request
 * @param {*} response
 */

//Adding a new CEB Engineer to the system
async function addNewCebEngineer(request, response) {
  try {
    var createUser = await userRegisterModel.addNewCebEngineerFunc(
      request.body
    );
    console.log(createUser);
    commonResponseService.responseWithData(response, createUser);
    console.log("createUser");
  } catch (error) {
    console.log(error);
    commonResponseService.errorWithMessage(response, "something went wrong");
  }
}

/**
 * remove ceb engineer controller
 * @param {*} request
 * @param {*} response
 */

//Removing a CEB Engineer from the system
async function removeCebEngineer(request, response) {
  try {
    console.log("removeUser controller");

    var removeUser = await userRegisterModel.removeCebEngineerFunc(
      request.params.id
    );

    commonResponseService.successWithMessage(response, removeUser.mesg);
  } catch (error) {
    console.log(error);
    commonResponseService.errorWithMessage(response, "something went wrong");
  }
}

/**
 * controller for get cebengineer details
 * @param {*} request
 * @param {*} response
 */

//Getting CEB Engineer details
async function getCebEngineer(request, response) {
  try {
    console.log("getCebEngineer controller");

    var getCebengineer = await userRegisterModel.getCebEngineerFunc();

    commonResponseService.responseWithData(response, getCebengineer.data);
  } catch (error) {
    console.log(error);
    commonResponseService.errorWithMessage(response, "something went wrong");
  }
}

module.exports = {
  createUser,
  loginUser,
  checkEmail,
  resetPassword,
  getCebEngineer,
  addNewCebEngineer,
  removeCebEngineer,
};
