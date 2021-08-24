var commonResponseService = require('../../service/responseService');
var addSpEventDeviceModel = require('../../model/specialEvent/addSpEventDeviceModel');
var unitChargesModel = require('../../model/cebengineer/unitChargesModel');

function CalculateUnits(power, minutes) {

    var numOfUnits = power * minutes * 60 / 3600000;
    return numOfUnits;

}

function CalculateNumberOfMinutes(hors, minutes) {

    var numOfMinutes = parseInt(hors * 60) + parseInt(minutes);
    return numOfMinutes;

}

function CalculateCost(uPrice, Units) {

    var cost = uPrice * Units;
    return cost;

}

/**
 * add device data to main bill plan
 */
async function AddSpEventDeviceDataTOU(request, response) {

    try {

        var Device_details_TOU = request.body.data;
        console.log(Device_details_TOU);
        console.log(request.params.id);

        var UnitPrice = await unitChargesModel.getUnitChargesDataFun("tou");
        console.log(UnitPrice.data[0].Unit_charge);
        console.log(UnitPrice.data[1].Unit_charge);
        console.log(UnitPrice.data[2].Unit_charge);

        var DayUnitCost = UnitPrice.data[0].Unit_charge;
        var OffPeakUnitCost = UnitPrice.data[1].Unit_charge;
        var PeakUnitCost = UnitPrice.data[2].Unit_charge;


        Device_details_TOU.using_minutes_peak_time = await CalculateNumberOfMinutes(Device_details_TOU.hPeak, Device_details_TOU.mPeak);
        Device_details_TOU.using_minutes_off_peak_time = await CalculateNumberOfMinutes(Device_details_TOU.hOffPeak, Device_details_TOU.mOffPeak);
        Device_details_TOU.using_minutes_day_time = await CalculateNumberOfMinutes(Device_details_TOU.hDay, Device_details_TOU.mDay);
        Device_details_TOU.units_peak_time = await CalculateUnits(Device_details_TOU.power, Device_details_TOU.using_minutes_peak_time);
        Device_details_TOU.units_off_peak_time = await CalculateUnits(Device_details_TOU.power, Device_details_TOU.using_minutes_off_peak_time);
        Device_details_TOU.units_day_time = await CalculateUnits(Device_details_TOU.power, Device_details_TOU.using_minutes_day_time);
        Device_details_TOU.cost_peak_time = await CalculateCost(PeakUnitCost, Device_details_TOU.units_peak_time);
        Device_details_TOU.cost_off_peak_time = await CalculateCost(OffPeakUnitCost, Device_details_TOU.units_off_peak_time);
        Device_details_TOU.cost_day_time = await CalculateCost(DayUnitCost, Device_details_TOU.units_day_time);
        Device_details_TOU.total_cost_TOU = Device_details_TOU.cost_peak_time + Device_details_TOU.cost_off_peak_time + Device_details_TOU.cost_day_time;


        console.log("inside addDeviceDataMain Controller");
        // console.log(request.params.id);
        var DeviceData_TOU = await addSpEventDeviceModel.AddSpEventDeviceTOU(Device_details_TOU, request.params.id);
        // console.log(profileData.data);

        commonResponseService.successWithMessage(response, DeviceData_TOU.mesg);


    } catch (error) {
        console.log(error);
        commonResponseService.errorWithMessage(response, "something went wrong");
    }
}

module.exports = { AddSpEventDeviceDataTOU };