var commonResponseService = require('../../service/responseService');
var unitChargesModel = require('../../model/cebengineer/unitChargesModel');
var calculateModel = require('../../model/monthlyBill/calculateModel');

function caculateFixedBill(noOfUnits , unitDetails){
    var billValue ; 
     console.log("call inside calculate fixed bill function");
    //  console.log(unitDetails[0].Fixed_charge);
    //  console.log(noOfUnits);
    if(noOfUnits <= 30){
        billValue =  (noOfUnits * unitDetails[0].Unit_charge) + parseFloat(unitDetails[0].Fixed_charge) ;
        return billValue.toFixed(2);
    }else if(noOfUnits <= 60){
        billValue = parseFloat((noOfUnits - 60)* unitDetails[3].Unit_charge) + parseFloat(30* unitDetails[0].Unit_charge) + parseFloat(unitDetails[3].Fixed_charge);
        return billValue.toFixed(2);
    }else if(noOfUnits <= 90){
        billValue = parseFloat((noOfUnits - 60)* unitDetails[4].Unit_charge) + parseFloat(60* unitDetails[1].Unit_charge) + parseFloat(unitDetails[4].Fixed_charge);
        return billValue.toFixed(2);
    }else if(noOfUnits <= 120){
        billValue = parseFloat((noOfUnits - 90)* unitDetails[5].Unit_charge) + parseFloat(60* unitDetails[1].Unit_charge) + parseFloat(30* unitDetails[4].Unit_charge) + parseFloat(unitDetails[5].Fixed_charge);
        return billValue.toFixed(2);
    }else if(noOfUnits <= 180){
        billValue = parseFloat((noOfUnits - 120)* unitDetails[2].Unit_charge) + parseFloat(60* unitDetails[1].Unit_charge) + parseFloat(30* unitDetails[4].Unit_charge) + parseFloat(30* unitDetails[5].Unit_charge) + parseFloat(unitDetails[2].Fixed_charge);
        return billValue.toFixed(2);
    }else if(noOfUnits > 180){
        billValue = parseFloat((noOfUnits - 180)* unitDetails[6].Unit_charge) + parseFloat(60* unitDetails[1].Unit_charge) + parseFloat(30* unitDetails[4].Unit_charge) + parseFloat(30* unitDetails[5].Unit_charge) + parseFloat(60* unitDetails[2].Unit_charge) + parseFloat(unitDetails[6].Fixed_charge);
        return billValue.toFixed(2);
    }
}

function calculateTOUBill(TOU_bill_sum, fixed_charge){
    var billValue = parseFloat(TOU_bill_sum) + parseFloat(fixed_charge);
    return billValue.toFixed(2);
}

async function calculatedBillValue(request, response){
    try {

        

        var billId = request.body.bill_id;
        console.log(billId);
        var CustId = request.params.id;
        var best_model;

        var UnitPrice = await unitChargesModel.getUnitChargesDataFun("fixed_");
        
        var Bill_details = await calculateModel.getCalculatedValues(billId, CustId );
         
         
        total_units = Bill_details.data[0].TotalUnits;

        
        // console.log(Bill_details.data)
        // console.log(Bill_details.data[0].TotalUnits)
        var fixed_bill_cost = caculateFixedBill(total_units , UnitPrice.data );
        var TOU_bill_cost = calculateTOUBill(Bill_details.data[0].TOU_bill_sum, 540);
        console.log(fixed_bill_cost);
        Bill_details.data[0].fixed_bill_cost = parseFloat(fixed_bill_cost);
        Bill_details.data[0].TOU_bill_cost = parseFloat(TOU_bill_cost);
        Bill_details.data[0].billId = parseInt(billId);

        if(Bill_details.data[0].fixed_bill_cost > Bill_details.data[0].TOU_bill_cost){
            console.log("best = TOU");
            best_model = "TOU";
            
          }else if(Bill_details.data[0].fixed_bill_cost == Bill_details.data[0].TOU_bill_cost){
            console.log("best = Both");
            best_model = "Both";
          }else{
            console.log("best = Fixed");
            best_model = "Fixed";
          }

        console.log(Bill_details);
        await calculateModel.setMonthlyPlan(Bill_details.data[0], CustId, best_model );

         if (Bill_details.data != null) {
            commonResponseService.responseWithData(response, Bill_details.data);

        } else {

            Bill_details.data.TotalCost = 0;
            Bill_details.data.TotalUnits = 0;
            commonResponseService.responseWithData(response, Bill_details.data);

        }
        

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