var commonResponseService = require('../../service/responseService');
var unitChargesModel = require('../../model/cebengineer/unitChargesModel');

/**
 * user Profile 
 * @param {*} request
 * @param {*} response 
 */
async function getUnitChargesData(request, response) {

    try {

        console.log("inside getUnitChargesData Controller");
        console.log(request.params.id);
        var unitChargesData = await unitChargesModel.getUnitChargesDataFun(request.params.id);
        // console.log(profileData.data);
        if (unitChargesData.data.length != 0) {
            commonResponseService.responseWithData(response, unitChargesData.data);
            console.log(unitChargesData.data);
        } else {
            commonResponseService.errorWithMessage(response, "no data");

        }



    } catch (error) {
        console.log(error);
        commonResponseService.errorWithMessage(response, "something went wrong");
    }
}
module.exports = { getUnitChargesData };