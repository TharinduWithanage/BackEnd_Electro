var commonResponseService = require('../../service/responseService');

function caculateFixedBill(noOfUnits , unitPrice, fixedCharge){
    var billValue ; 
    if(noOfUnits <= 30){
        billValue =  (noOfUnits * 2.50) + parseFloat(30) ;
        return billValue;
    }else if(noOfUnits <= 60){
        billValue = parseFloat((noOfUnits - 60)* 4.85) + parseFloat(30* 2.50) + parseFloat(60);
        return billValue;
    }else if(noOfUnits <= 90){
        billValue = parseFloat((noOfUnits - 60)* 10) + parseFloat(60* 7.85) + parseFloat(90);
        return billValue;
    }else if(noOfUnits <= 120){
        billValue = parseFloat((noOfUnits - 90)* 27.75) + parseFloat(60* 7.85) + parseFloat(30* 10) + parseFloat(480);
        return billValue;
    }else if(noOfUnits <= 180){
        billValue = parseFloat((noOfUnits - 120)* 32) + parseFloat(60* 7.85) + parseFloat(30* 10) + parseFloat(30* 27.75) + parseFloat(480);
        return billValue;
    }else if(noOfUnits > 180){
        billValue = parseFloat((noOfUnits - 180)* 45) + parseFloat(60* 7.85) + parseFloat(30* 10) + parseFloat(30* 27.75) + parseFloat(60* 32) + parseFloat(540);
        return billValue;
    }
}