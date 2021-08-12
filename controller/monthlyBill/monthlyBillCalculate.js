var commonResponseService = require('../../service/responseService');
var addDeviceModel = require('../../model/monthlyBill/addDevicesModel');

async function AddDeviceDataMain(request, response) {

    try {

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