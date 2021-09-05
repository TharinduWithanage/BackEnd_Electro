var commonResponseService = require('../../service/responseService');
var SpecialEventModel = require('../../model/specialEvent/SpecialEventModel');

async function GetSpecialEventDeviceData(request, response) {

    try {

        console.log("inside get special Event details Controller");
        var Cust_id = request.params.id;
        var Bill_id=request.body.newBillId;

        var Bill_data = await SpecialEventModel.getSpecialEventBillDetail(Cust_id,Bill_id);

        var Device_data = await SpecialEventModel.getSpecialEventDetail(Cust_id,Bill_id,Bill_data.bill_model);

        if (Device_data.data != null) {
           // console.log("data null!!");
           console.log(Device_data.data);
            commonResponseService.responseWithData(response, Device_data.data);

        } else {

            commonResponseService.responseWithData(response, "No data");

        }

    } catch (error) {
        console.log(error);
        commonResponseService.errorWithMessage(response, "something went wrong");
    }
}




module.exports = { GetSpecialEventDeviceData};

