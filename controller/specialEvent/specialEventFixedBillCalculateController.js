var commonResponseService = require("../../service/responseService");
var addSpecialEventDeviceModel = require("../../model/specialEvent/SpecialEventDeviceFixedModel");
var unitChargesModel = require("../../model/cebengineer/unitChargesModel");

/**
 * Calculate the number of units for the special events
 * @param {*} power
 * @param {*} minutes
 * @param {*} quantity
 * @param {*} days
 * @returns
 */
function CalculateUnits(power, minutes, quantity, days) {
  if(power === '' || power === null){
    power = 0;
  }
  if(quantity === '' || quantity === null){
    quantity = 0;
  }
  if(days === '' || days === null){
    days = 0;
  }
  var numOfUnits = (parseFloat(quantity) * parseFloat(power) * parseFloat(minutes) * 60 * parseFloat(days)) / 3600000;
  return parseFloat(numOfUnits).toFixed(4);
}

/**
 * Calculate the total number of time in minutes for the special events
 * @param {*} hours
 * @param {*} minutes
 * @returns
 */
function CalculateNumberOfMinutes(hours, minutes) {
  if(hours === '' || hours === null){
    hours = 0;
  }
  if(minutes === '' || minutes === null){
    minutes = 0;
  }
  var numOfMinutes = (parseInt(hours) * 60) + parseInt(minutes);
  return parseFloat(numOfMinutes);
}

/**
 * Calculate the total cost for the special events
 * @param {*} uPrice
 * @param {*} Units
 * @returns
 */
function CalculateCost(uPrice, Units) {
  var cost = uPrice * Units;
  return cost;
}

/**
 * Add Device data of the special events in ToU
 * @param {*} request
 * @param {*} response
 */
// async function AddSpecialEventDeviceDataTOU(request, response) {
//   try {
//     console.log("fix eken yanne haloo -------------------------")
//     var Device_details_TOU = request.body.data;
//     // console.log(Device_details_TOU);
//     // console.log(request.params.id);

//     var UnitPrice = await unitChargesModel.getUnitChargesDataFun("tou");
//     // console.log(UnitPrice.data[0].Unit_charge);
//     // console.log(UnitPrice.data[1].Unit_charge);
//     // console.log(UnitPrice.data[2].Unit_charge);

//     var DayUnitCost = UnitPrice.data[0].Unit_charge;
//     var OffPeakUnitCost = UnitPrice.data[1].Unit_charge;
//     var PeakUnitCost = UnitPrice.data[2].Unit_charge;

//     Device_details_TOU.using_minutes_peak_time = await CalculateNumberOfMinutes(
//       Device_details_TOU.hPeak,
//       Device_details_TOU.mPeak
//     );
//     Device_details_TOU.using_minutes_off_peak_time =
//       await CalculateNumberOfMinutes(
//         Device_details_TOU.hOffPeak,
//         Device_details_TOU.mOffPeak
//       );
//     Device_details_TOU.using_minutes_day_time = await CalculateNumberOfMinutes(
//       Device_details_TOU.hDay,
//       Device_details_TOU.mDay
//     );
//     Device_details_TOU.units_peak_time = await CalculateUnits(
//       Device_details_TOU.power,
//       Device_details_TOU.using_minutes_peak_time
//     );
//     Device_details_TOU.units_off_peak_time = await CalculateUnits(
//       Device_details_TOU.power,
//       Device_details_TOU.using_minutes_off_peak_time
//     );
//     Device_details_TOU.units_day_time = await CalculateUnits(
//       Device_details_TOU.power,
//       Device_details_TOU.using_minutes_day_time
//     );
//     Device_details_TOU.cost_peak_time = await CalculateCost(
//       PeakUnitCost,
//       Device_details_TOU.units_peak_time
//     );
//     Device_details_TOU.cost_off_peak_time = await CalculateCost(
//       OffPeakUnitCost,
//       Device_details_TOU.units_off_peak_time
//     );
//     Device_details_TOU.cost_day_time = await CalculateCost(
//       DayUnitCost,
//       Device_details_TOU.units_day_time
//     );
//     Device_details_TOU.total_cost_TOU =
//       Device_details_TOU.cost_peak_time +
//       Device_details_TOU.cost_off_peak_time +
//       Device_details_TOU.cost_day_time;

//     // console.log("inside addDeviceDataMain Controller");
//     // console.log(request.params.id);
//     var DeviceData_TOU =
//       await addSpecialEventDeviceModel.AddSpecialEventDeviceDataTOU(
//         Device_details_TOU,
//         request.params.id
//       );
//     // console.log(profileData.data);

//     commonResponseService.successWithMessage(response, DeviceData_TOU.mesg);
//   } catch (error) {
//     console.log(error);
//     commonResponseService.errorWithMessage(response, "something went wrong");
//   }
// }

/**
 * Add Device data of the special events in Fixed model
 * @param {*} request
 * @param {*} response
 */
async function AddSpecialEventDeviceDataFixed(request, response) {
  try {
    var Device_details_fixed = request.body.data;
    console.log(Device_details_fixed);

    Device_details_fixed.using_minutes_fixed = await CalculateNumberOfMinutes(
      Device_details_fixed.hfixed,
      Device_details_fixed.mfixed
    );
    Device_details_fixed.total_units_fixed = await CalculateUnits(
      Device_details_fixed.power,
      Device_details_fixed.using_minutes_fixed,
      Device_details_fixed.quantity,
      Device_details_fixed.numberOfDays
    );

    // console.log(Device_details_fixed.using_minutes_fixed);
    // console.log(Device_details_fixed.total_units_fixed);
    var DeviceData_fixed =
      await addSpecialEventDeviceModel.AddSpecialEventDeviceFixed(
        Device_details_fixed,
        request.params.id
      );
    // console.log(profileData.data);

    commonResponseService.successWithMessage(response, DeviceData_fixed.mesg);
  } catch (error) {
    console.log(error);
    commonResponseService.errorWithMessage(response, "something went wrong");
  }
}

/**
 * Get Bill ID for the special event plan
 * @param {*} request
 * @param {*} response
 */
async function getFixedBillId(request, response) {
  try {
    // console.log("inside getBillId Controller");
    var Cust_id = request.params.id;
    var bill_id = await addSpecialEventDeviceModel.getFixedBillIdFunc(Cust_id);

    if (bill_id.data != null) {
      commonResponseService.responseWithData(response, bill_id.data);
    } else {
      bill_id.data = 0;
      commonResponseService.responseWithData(response, bill_id.data);
    }
  } catch (error) {
    console.log(error);
    commonResponseService.errorWithMessage(response, "something went wrong");
  }
}

/**
 * Get Device data of the special events in Fixed model
 * @param {*} request
 * @param {*} response
 */
async function GetSpecialEventDeviceDataFixed(request, response) {
  try {
    // console.log("inside get special Event details Controller");
    var Cust_id = request.params.id;
    var Bill_id = request.body.newBillId;
    var Device_details =
      await addSpecialEventDeviceModel.getSpecialEventDetailsFixed(
        Cust_id,
        Bill_id
      );

    if (Device_details.data != null) {
      // console.log("data null!!");
      // console.log(Device_details.data);
      commonResponseService.responseWithData(response, Device_details.data);
    } else {
      commonResponseService.responseWithData(response, "No data");
    }
  } catch (error) {
    console.log(error);
    commonResponseService.errorWithMessage(response, "something went wrong");
  }
}

/**
 * Get Special Event Fixed More Details
 * @param {*} request
 * @param {*} response
 */
async function getSpecialEventFixedMoreDetails(request, response) {
  try {
    // console.log("inside get special Event more details Controller");
    var Cust_id = request.params.id;
    var Fixed_Bill_id = request.body.bill_id;
    // console.log("Customer id for fixed is:",Cust_id);
    // console.log("Fixed bill id:",Fixed_Bill_id);
    var Fixed_Special_Moredetails =
      await addSpecialEventDeviceModel.getSpecialEventDetailsFixed(
        Cust_id,
        Fixed_Bill_id
      );

    if (Fixed_Special_Moredetails.data != null) {
      // console.log("The fixed More Details are:");
      // console.log(Fixed_Special_Moredetails.data);
      commonResponseService.responseWithData(
        response,
        Fixed_Special_Moredetails.data
      );
    } else {
      commonResponseService.responseWithData(response, "No data");
    }
  } catch (error) {
    console.log(error);
    commonResponseService.errorWithMessage(response, "something went wrong");
  }
}

/**
 * Update Special Event Device Data
 * @param {*} request
 * @param {*} response
 */
async function updateDeviceDataSpecialEvent(request, response) {
  try {
    // console.log("inside update device detail Controller");

    var special_event_deviceFixedDetails = request.body.data;
    var bill_id = request.body.bill_id;
    // console.log("Inside of update device data special event");
    // console.log(special_event_deviceFixedDetails);
    // console.log(request.params.id);

    var Cust_id = request.params.id;

    special_event_deviceFixedDetails.using_minutes_fixed =
      await CalculateNumberOfMinutes(
        special_event_deviceFixedDetails.hfixed,
        special_event_deviceFixedDetails.mfixed
      );
    special_event_deviceFixedDetails.total_units_fixed = await CalculateUnits(
      special_event_deviceFixedDetails.power,
      special_event_deviceFixedDetails.using_minutes_fixed,
      special_event_deviceFixedDetails.quantity,
      special_event_deviceFixedDetails.numberOfDays
    );
    

    var updateData =
      await addSpecialEventDeviceModel.updateSpecialEventDetailsFixed(
        special_event_deviceFixedDetails,
        Cust_id,
        bill_id
      );

      // console.log("End of update device data special event");
      // console.log(special_event_deviceFixedDetails);

    commonResponseService.responseWithData(response, updateData.data);
  } catch (error) {
    console.log(error);
    commonResponseService.errorWithMessage(response, "something went wrong");
  }
}

/**
 * Delete Device Data in the special events
 * @param {*} request
 * @param {*} response
 */
async function deleteSpecialEventDeviceData(request, response) {


    try {

        var Cust_id = request.params.id;
        console.log("Request body:");
        console.log(request.body);
        var device_delete = await addSpecialEventDeviceModel.deleteSpecialEventDeviceFunc(Cust_id,request.body);
        //console.log("The device delete is:",device_delete);
        commonResponseService.successWithMessage(response, device_delete.mesg);
        

    } catch (error) {
        console.log(error);
        commonResponseService.errorWithMessage(response, "something went wrong");
    }

  // try {
  //   // console.log("inside deleteDeviceDataMain Controller");
  //   var Cust_id = request.params.id;
  //   var device_delete =
  //     await addSpecialEventDeviceModel.deleteSpecialEventDeviceFunc(
  //       Cust_id,
  //       request.body
  //     );

  //   commonResponseService.successWithMessage(response, device_delete.mesg);
  // } catch (error) {
  //   // console.log(error);
  //   commonResponseService.errorWithMessage(response, "something went wrong");
  // }

}

/**
 * Calculate the fixed Bill value in Special events
 * @param {*} request
 * @param {*} response
 */
async function calculatedFixedBillValue(request, response) {
  try {
    var billId = request.body.bill_id;
    // console.log("calculateTOU Bill value:",billId);
    var CustId = request.params.id;

    var Bill_details =
      await addSpecialEventDeviceModel.getDeviceDetailsToCalculate(
        billId,
        CustId
      );
    // console.log("Bill Details Calculated:",Bill_details);

    if (Bill_details.data != null) {
      // console.log("The bill details is :",Bill_details);
      commonResponseService.responseWithData(response, Bill_details.data);
    } else {
      // console.log("Fixed Special Event Saved SuccessFully!!");
      Bill_details.data.totalUnits = 0;
      commonResponseService.responseWithData(response, Bill_details.data);
    }
  } catch (error) {
    console.log(error);
    commonResponseService.errorWithMessage(response, "something went wrong");
  }
}

/**
 * Save the Fixed Bill Value in Special Events
 * @param {*} request
 * @param {*} response
 */
async function saveFixedBillValue(request, response) {
  try {
    var billId = request.body.bill_id;
    // console.log("save TOU  Bill value:",billId);
    var CustId = request.params.id;
    var FixedPlan_name = request.body.fixed_plan_name;
    // console.log("Bill Plan Name:", FixedPlan_name);

    var Bill_details =
      await addSpecialEventDeviceModel.getDeviceDetailsToCalculate(
        billId,
        CustId
      );
    // console.log("Bill Details Calculated:",Bill_details);
    //var total_units = Bill_details.data[0].TotalUnits;
    Bill_details.data[0].billId = parseInt(billId);
    // Bill_details.data[0].additionalUnits = parseInt(Bill_details.data[0].Total_units);
    // Bill_details.data[0].additionalCost = parseInt(Bill_details.data[0].TOU_bill_sum);

    await addSpecialEventDeviceModel.setSpecialEventPlan(
      Bill_details.data[0],
      CustId,
      FixedPlan_name
    );

    if (Bill_details.data != null) {
      // console.log("The saveTOUBillValue bill details is :",Bill_details);
      commonResponseService.responseWithData(response, Bill_details.data);
    } else {
      // console.log("TOU  saveTOUBillValue Special Event Saved SuccessFully!!");
      Bill_details.data.TotalCost = 0;
      Bill_details.data.TotalUnits = 0;
      commonResponseService.responseWithData(response, Bill_details.data);
    }
  } catch (error) {
    console.log(error);
    commonResponseService.errorWithMessage(response, "something went wrong");
  }
}

/**
 * Get Bill Plan Name for the Special Event controller
 * @param {*} request
 * @param {*} response
 */
async function getBillPlanName(request, response) {
  try {
    // console.log("inside get Bill Plan Name");
    var Cust_id = request.params.id;
    // console.log(request.body);
    var bill_id = request.body.bill_id;

    var bill_plan_name = await addSpecialEventDeviceModel.getBillPlanName(
      Cust_id,
      bill_id
    );

    commonResponseService.responseWithData(response, bill_plan_name.data);
  } catch (error) {
    console.log(error);
    commonResponseService.errorWithMessage(response, "something went wrong");
  }
}

/**
 * Update Special Event Fixed Bill Plan in special events
 * @param {*} request
 * @param {*} response
 */
async function updateSpecialEventFixedBillPlan(request, response) {
  try {
    // console.log("inside Update bill  Plan Name");
    var Cust_id = request.params.id;
    // console.log(request.body);
    var bill_id = request.body.bill_id;
    var bill_plan_name = request.body.fixed_plan_name;
    var Bill_details =
      await addSpecialEventDeviceModel.getDeviceDetailsToCalculate(
        bill_id,
        Cust_id
      );
    Bill_details.data[0].billId = parseInt(bill_id);
    const update_status = await addSpecialEventDeviceModel.updateBillPlan(
      Bill_details.data[0],
      Cust_id,
      bill_plan_name
    );
    commonResponseService.successWithMessage(response, update_status.mesg);
  } catch (error) {
    console.log(error);
    commonResponseService.errorWithMessage(response, "something went wrong");
  }
}

/**
 * Delete Special Event Bill Plan
 * @param {*} request
 * @param {*} response
 */
async function deleteBillPlan(request, response) {
  try {
    // console.log("inside deleteBillPlan special event Controller");
    var Cust_id = request.params.id;
    // console.log(request.body);
    var bill_model = request.body.bill_model;
    var bill_id = request.body.bill_id;

    var bill_plan_delete =
      await addSpecialEventDeviceModel.deleteSpecialBillPlanFunc(
        Cust_id,
        bill_id
      );

    if (bill_model == "TOU") {
      var tou_bill_plan_delete =
        await addSpecialEventDeviceModel.deleteTOUBillPlanFunc(
          Cust_id,
          bill_id
        );
    }

    var bill_plan_delete_devices =
      await addSpecialEventDeviceModel.deleteSpecialBillPlanDevices(
        Cust_id,
        bill_id,
        bill_model
      );

    commonResponseService.successWithMessage(response, bill_plan_delete.mesg);
  } catch (error) {
    console.log(error);
    commonResponseService.errorWithMessage(response, "something went wrong");
  }
}

module.exports = {
  deleteBillPlan,
  AddSpecialEventDeviceDataFixed,
  getFixedBillId,
  GetSpecialEventDeviceDataFixed,
  updateDeviceDataSpecialEvent,
  deleteSpecialEventDeviceData,
  calculatedFixedBillValue,
  saveFixedBillValue,
  getSpecialEventFixedMoreDetails,
  getBillPlanName,
  updateSpecialEventFixedBillPlan,
};
