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
        if (request.params.id > 1000) {

        } else {
            var dashboardData = await dashBoardModel.getReqCountFun();

        }
        // console.log(dashboardData.data.result2[0].request_count);
        commonResponseService.responseWithData(response, dashboardData.data);



    } catch (error) {
        console.log(error);
        commonResponseService.errorWithMessage(response, "something went wrong");
    }
}
module.exports = { getDashboardData }