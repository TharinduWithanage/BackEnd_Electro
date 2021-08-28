var commonResponseService = require('../../service/responseService');
var unitChargesModel = require('../../model/cebengineer/unitChargesModel');
var calculateModel = require('../../model/monthlyBill/calculateModel');

function caculateFixedBill(noOfUnits , unitDetails){
    var billValue ; 
     console.log("call inside calculate fixed bill function");
    //  console.log(unitDetails[0].Fixed_charge);
      console.log(noOfUnits);
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

async function getcalculatedBillValue(request, response){
    try {

        var billId = request.body.bill_id;
        console.log(billId);
        var CustId = request.params.id;

        var UnitPrice = await unitChargesModel.getUnitChargesDataFun("fixed_");
        
        var Bill_details = await calculateModel.getDeviceDetailsToCalculate(billId, CustId );
         
         
        total_units = Bill_details.data[0].TotalUnits;

        
        // console.log(Bill_details.data)
        // console.log(Bill_details.data[0].TotalUnits)
        var fixed_bill_cost = caculateFixedBill(total_units , UnitPrice.data );
        var TOU_bill_cost = calculateTOUBill(Bill_details.data[0].TOU_bill_sum, 540);
        console.log(fixed_bill_cost);
        Bill_details.data[0].fixed_bill_cost = parseFloat(fixed_bill_cost);
        Bill_details.data[0].TOU_bill_cost = parseFloat(TOU_bill_cost);

         if (Bill_details.data != null) {
            commonResponseService.responseWithData(response, Bill_details.data);

        } else {

            Bill_details.data.TotalCost = 0;
            Bill_details.data.TotalUnits = 0;
            commonResponseService.responseWithData(response, Bill_details.data);

        }
        

    } catch (error) {
        console.log(error);
        commonResponseService.errorWithMessage(response, "something went wrong");
    }

        // console.log("Inside get calculation bill value controller");

        // var billId = request.body.bill_id;
        // var CustId = request.params.id;
        
        // var Calculated_Bill_details = await calculateModel.getCalculatedValues(billId, CustId);

        // console.log(Calculated_Bill_details);
        

        //  if (Calculated_Bill_details.data != null) {
        //     commonResponseService.responseWithData(response, Calculated_Bill_details.data);

        // } else {
        //     Calculated_Bill_details.data.TotalCost = 0;
        //     Calculated_Bill_details.data.TotalUnits = 0;
        //     commonResponseService.responseWithData(response, Calculated_Bill_details.data);
        // }
        

    // } catch (error) {
    //     console.log(error);
    //     commonResponseService.errorWithMessage(response, "something went wrong");
    // }
}

async function calculatedBillValue(request, response){
    try {

        

        var billId = request.body.bill_id;
        console.log(billId);
        var CustId = request.params.id;
        var best_model;

        var UnitPrice = await unitChargesModel.getUnitChargesDataFun("fixed_");
        
        var Bill_details = await calculateModel.getDeviceDetailsToCalculate(billId, CustId );
         
         
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
        

    } catch (error) {
        console.log(error);
        commonResponseService.errorWithMessage(response, "something went wrong");
    }
}

module.exports = { calculatedBillValue, getcalculatedBillValue };