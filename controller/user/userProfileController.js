var commonResponseService = require('../../service/responseService');
var userProfileModel = require('../../model/user/userProfileModel');

/**
 * user Profile 
 * @param {*} request
 * @param {*} response 
 */
async function profileGetData(request, response) {

    try {

        console.log("inside profileGetData Controller");
        // console.log(request.params.id);
        var profileData = await userProfileModel.profileGetDataFunc(request.params.id);
        // console.log(profileData.data);
        if (profileData.data.length != 0) {
            commonResponseService.responseWithData(response, profileData.data);
            console.log(profileData.data);
        } else {
            commonResponseService.errorWithMessage(response, "no data");

        }



    } catch (error) {
        console.log(error);
        commonResponseService.errorWithMessage(response, "something went wrong");
    }
}

/**
 * user Profile update
 * @param {*} request
 * @param {*} response 
 */
async function profileUpdate(request, response) {

    try {

        console.log("inside userProfileController");

        var profileUpdate = await userProfileModel.profileUpdateFunc(request.body, request.params.id);
        console.log(profileUpdate);
        commonResponseService.successWithMessage(response, profileUpdate.mesg);
        // console.log(profileUpdate.data);


    } catch (error) {
        console.log(error);
        commonResponseService.errorWithMessage(response, "something went wrong");
    }
}
module.exports = { profileUpdate, profileGetData };