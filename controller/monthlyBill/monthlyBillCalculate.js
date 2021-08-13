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

        var Device_details = Request.body ;

        

        console.log("inside addDeviceDataMain Controller");
        // console.log(request.params.id);
        var DeviceData = await addDeviceModel.AddDeviceMailBill(request.body);
        // console.log(profileData.data);

        commonResponseService.responseWithData(response, DeviceData.mesg);





    } catch (error) {
        console.log(error);
        commonResponseService.errorWithMessage(response, "something went wrong");
    }
}

module.exports = { AddDeviceDataMain };