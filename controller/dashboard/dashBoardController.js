var commonResponseService = require('../../service/responseService');
var dashBoardModel = require('../../model/dashboard/dashBoardModel');


/**
 * get dash board data controller
 * @param {*} request
 * @param {*} response 
 */
async function getDashboardData(request, response) {

    try {

        console.log("inside getDashboardData Controller");

        var dashboardData = await dashBoardModel.getDashboardDataFun();
        // console.log(profileData.data);
        if (dashboardData.data.length != 0) {
            commonResponseService.responseWithData(response, dashboardData.data);
            console.log(dashboardData.data);
        } else {
            commonResponseService.errorWithMessage(response, "no data");

        }



    } catch (error) {
        console.log(error);
        commonResponseService.errorWithMessage(response, "something went wrong");
    }
}
module.exports = { getDashboardData }