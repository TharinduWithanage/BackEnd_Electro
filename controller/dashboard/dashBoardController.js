var commonResponseService = require("../../service/responseService");
var dashBoardModel = require("../../model/dashboard/dashBoardModel");

/**
 * get dash board data controller
 * @param {*} request
 * @param {*} response
 */

// Get Number of bill plans for a particular customer controller

async function getDashboardData(request, response) {
  try {
    // console.log("inside getDashboardData Controller");
    if (request.params.id > 1000) {
      var dashboardData = await dashBoardModel.custDashboardDataCountFun(
        request.params.id
      );
    } else {
      var dashboardData = await dashBoardModel.empDashboardDataFun();
    }
    // console.log(dashboardData.data.result2[0].request_count);
    commonResponseService.responseWithData(response, dashboardData.data);
  } catch (error) {
    console.log(error);
    commonResponseService.errorWithMessage(response, "something went wrong");
  }
}

/**
 * Get Pending Normal Unit Charges Function controller
 * @param {*} request
 * @param {*} response
 */
async function PendingNormalUnitCharges(request, response) {
  try {
    // console.log("inside PendingNormalUnitCharges Controller");
    var PendingNormalUnitChargesData =
      await dashBoardModel.PendingNormalUnitChargesFun(request.params.id);
    commonResponseService.responseWithData(
      response,
      PendingNormalUnitChargesData.data
    );
  } catch (error) {
    console.log(error);
    commonResponseService.errorWithMessage(response, "something went wrong");
  }
}

/**
 * Get Pending Tou Unit Charges Function controller
 * @param {*} request
 * @param {*} response
 */
async function PendingTouUnitCharges(request, response) {
  try {
    // console.log("inside PendingTouUnitCharges Controller");
    var PendingTouUnitChargesData =
      await dashBoardModel.PendingTouUnitChargesFun(request.params.id);
    commonResponseService.responseWithData(
      response,
      PendingTouUnitChargesData.data
    );
  } catch (error) {
    console.log(error);
    commonResponseService.errorWithMessage(response, "something went wrong");
  }
}

module.exports = {
  getDashboardData,
  PendingNormalUnitCharges,
  PendingTouUnitCharges,
};
