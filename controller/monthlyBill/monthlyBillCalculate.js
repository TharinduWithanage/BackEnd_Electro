var commonResponseService = require('../../service/responseService');
var addDeviceModel = require('../../model/monthlyBill/addDevicesModel');

function CalculateUnits(power, minutes){

    var numOfUnits = power * minutes * 60 / 3600000 ;
    return numOfUnits;

}

function CalculateNumberOfMinutes(hors, minutes){

    var numOfMinutes = (hors* 60 ) + minutes ;
    return numOfMinutes;

}

function CalculateCost(uPrice, Units){

    var cost = uPrice * Units;
    return cost;

}

async function AddDeviceDataMain(request, response) {

    try {

        var Device_details = request.body ;

        Device_details.Using_minutes_peak_time = await CalculateNumberOfMinutes(Device_details.hPeak, Device_details.mPeak);
        Device_details.Using_minutes_off_peak_time = await CalculateNumberOfMinutes(Device_details.hOffPeak, Device_details.mOffPeak);
        Device_details.Using_minutes_day_time = await CalculateNumberOfMinutes(Device_details.hDay, Device_details.mDay);
        Device_details.Units_peak_time = await CalculateUnits(Device_details.power, Device_details.Using_minutes_peak_time);
        Device_details.Units_off_peak_time = await CalculateUnits(Device_details.power, Device_details.Using_minutes_off_peak_time);
        Device_details.Units_day_time = await CalculateUnits(Device_details.power, Device_details.Using_minutes_day_time);
        Device_details.Cost_peak_time = await CalculateCost( 54 , Device_details.Units_peak_time);
        Device_details.Cost_off_peak_time = await CalculateCost( 13 , Device_details.Units_off_peak_time);
        Device_details.Cost_day_time = await CalculateCost( 25 , Device_details.Units_day_time);
        Device_details.Total_units_fixed = Device_details.Units_peak_time + Device_details.Units_off_peak_time + Device_details.Units_day_time;
        Device_details.Total_cost_TOU = Device_details.Cost_peak_time + Device_details.Cost_off_peak_time + Device_details.Cost_day_time;


        console.log("inside addDeviceDataMain Controller");
        // console.log(request.params.id);
        var DeviceData = await addDeviceModel.AddDeviceMailBill(Device_details);
        // console.log(profileData.data);

        commonResponseService.responseWithData(response, DeviceData.mesg);





    } catch (error) {
        console.log(error);
        commonResponseService.errorWithMessage(response, "something went wrong");
    }
}

module.exports = { AddDeviceDataMain };