var commonResponseService = require("../../service/responseService");
var billPlanModel = require("../../model/monthlyBill/billPlanModel");

/**
 * Get Main bill plan controller
 * @param {*} request
 * @param {*} response
 */
async function getMonthlyBillPlans(request, response) {
  try {
    // console.log("Inside get calculation bill value controller");

    var CustId = request.params.id;

    var Bill_Plans = await billPlanModel.getMonthlyBillPlans(CustId);

    // console.log(Bill_Plans);

    if (Bill_Plans.data != null) {
      commonResponseService.responseWithData(response, Bill_Plans.data);
    } else {
      // Bill_Plans.data.TotalCost = 0;
      // Bill_Plans.data.TotalUnits = 0;
      commonResponseService.responseWithData(response, Bill_Plans.data);
    }
  } catch (error) {
    console.log(error);
    commonResponseService.errorWithMessage(response, "something went wrong");
  }
}

/**
 * Delete Monthly main bill plan controller
 * @param {*} request
 * @param {*} response
 */
async function deleteMonthlyBillPlans(request, response) {
  try {
    // console.log("inside deleteMonthlyBillPlans Controller");
    var Cust_id = request.params.id;
    var bill_plan_delete = await billPlanModel.deleteBillPlanFunc(
      Cust_id,
      request.body
    );
    var Devices_delete = await billPlanModel.deleteBillPlanDevices(
      Cust_id,
      request.body
    );
    commonResponseService.successWithMessage(response, bill_plan_delete.mesg);
  } catch (error) {
    console.log(error);
    commonResponseService.errorWithMessage(response, "something went wrong");
  }
}

module.exports = { getMonthlyBillPlans, deleteMonthlyBillPlans };
