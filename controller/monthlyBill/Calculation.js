var commonResponseService = require('../../service/responseService');
var unitChargesModel = require('../../model/cebengineer/unitChargesModel');

function caculateFixedBill(noOfUnits , unitDetails){
    var billValue ; 
    // console.log("call inside calculate fixed bill function");
    // console.log(unitDetails[0].Fixed_charge);
    if(noOfUnits <= 30){
        billValue =  (noOfUnits * unitDetails[0].Unit_charge) + parseFloat(unitDetails[0].Fixed_charge) ;
        return billValue;
    }else if(noOfUnits <= 60){
        billValue = parseFloat((noOfUnits - 60)* unitDetails[3].Unit_charge) + parseFloat(30* unitDetails[0].Unit_charge) + parseFloat(unitDetails[3].Fixed_charge);
        return billValue;
    }else if(noOfUnits <= 90){
        billValue = parseFloat((noOfUnits - 60)* unitDetails[4].Unit_charge) + parseFloat(60* unitDetails[1].Unit_charge) + parseFloat(unitDetails[4].Fixed_charge);
        return billValue;
    }else if(noOfUnits <= 120){
        billValue = parseFloat((noOfUnits - 90)* unitDetails[5].Unit_charge) + parseFloat(60* unitDetails[1].Unit_charge) + parseFloat(30* unitDetails[4].Unit_charge) + parseFloat(unitDetails[5].Fixed_charge);
        return billValue;
    }else if(noOfUnits <= 180){
        billValue = parseFloat((noOfUnits - 120)* unitDetails[2].Unit_charge) + parseFloat(60* unitDetails[1].Unit_charge) + parseFloat(30* unitDetails[4].Unit_charge) + parseFloat(30* unitDetails[5].Unit_charge) + parseFloat(unitDetails[2].Fixed_charge);
        return billValue;
    }else if(noOfUnits > 180){
        billValue = parseFloat((noOfUnits - 180)* unitDetails[6].Unit_charge) + parseFloat(60* unitDetails[1].Unit_charge) + parseFloat(30* unitDetails[4].Unit_charge) + parseFloat(30* unitDetails[5].Unit_charge) + parseFloat(60* unitDetails[2].Unit_charge) + parseFloat(unitDetails[6].Fixed_charge);
        return billValue;
    }
}

async function calculatedBillValue(request, response){
    try {

        var Device_details = request.body.data;
        console.log(Device_details);
        console.log(request.params.id);

        var UnitPrice = await unitChargesModel.getUnitChargesDataFun("fixed");
        // console.log(UnitPrice.data[0].Unit_charge);
        // console.log(UnitPrice.data[1].Unit_charge);
        // console.log(UnitPrice.data[2].Unit_charge);
        console.log("fixed unit charges");
        console.log(UnitPrice.data);
        console.log(UnitPrice.data[0].Unit_charge);
        console.log(UnitPrice.data[0].Fixed_charge);

        caculateFixedBill(50,UnitPrice.data )

        // var DayUnitCost = UnitPrice.data[0].Unit_charge;
        // var OffPeakUnitCost = UnitPrice.data[1].Unit_charge;
        // var PeakUnitCost = UnitPrice.data[2].Unit_charge;




        // Device_details.using_minutes_peak_time = await CalculateNumberOfMinutes(Device_details.hPeak, Device_details.mPeak);
        // Device_details.using_minutes_off_peak_time = await CalculateNumberOfMinutes(Device_details.hOffPeak, Device_details.mOffPeak);
        // Device_details.using_minutes_day_time = await CalculateNumberOfMinutes(Device_details.hDay, Device_details.mDay);
        // Device_details.units_peak_time = await CalculateUnits(Device_details.power, Device_details.using_minutes_peak_time);
        // Device_details.units_off_peak_time = await CalculateUnits(Device_details.power, Device_details.using_minutes_off_peak_time);
        // Device_details.units_day_time = await CalculateUnits(Device_details.power, Device_details.using_minutes_day_time);
        // Device_details.cost_peak_time = await CalculateCost(PeakUnitCost, Device_details.units_peak_time);
        // Device_details.cost_off_peak_time = await CalculateCost(OffPeakUnitCost, Device_details.units_off_peak_time);
        // Device_details.cost_day_time = await CalculateCost(DayUnitCost, Device_details.units_day_time);
        // Device_details.total_units_fixed = Device_details.units_peak_time + Device_details.units_off_peak_time + Device_details.units_day_time;
        // Device_details.total_cost_TOU = Device_details.cost_peak_time + Device_details.cost_off_peak_time + Device_details.cost_day_time;


        // console.log("inside addDeviceDataMain Controller");
        // // console.log(request.params.id);
        // var DeviceData = await addDeviceModel.AddDeviceMailBill(Device_details, request.params.id);
        // // console.log(profileData.data);

        // commonResponseService.responseWithData(response, DeviceData.mesg);





    } catch (error) {
        console.log(error);
        commonResponseService.errorWithMessage(response, "something went wrong");
    }
}

module.exports = { calculatedBillValue };