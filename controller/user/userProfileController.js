var commonResponseService = require('../../service/responseService');
var userProfileModel = require('../../model/user/userProfileModel');
/**
 * user Profile update
 * @param {*} request
 * @param {*} response 
 */
async function profileUpdate(request, response) {

    try {

        console.log("inside userProfileController");

        var profileUpdate = await userProfileModel.profileUpdateFunc(request.body);
        console.log(profileUpdate);
        commonResponseService.responseWithData(response, profileUpdate.data);
        console.log(profileUpdate.data);


    } catch (error) {
        console.log(error);
        commonResponseService.errorWithMessage(response, "something went wrong");
    }
}
module.exports = { profileUpdate };