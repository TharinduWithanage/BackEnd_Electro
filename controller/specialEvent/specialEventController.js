var commonResponseService = require('../../service/responseService');
var SpecialEventModel = require('../../model/specialEvent/SpecialEventModel');

async function GetSpecialEventDeviceDataFixed(request, response) {

    try {

        console.log("inside get special Event details Controller");
        var Cust_id = request.params.id;
        var Bill_id=request.body.newBillId;

        var Bill_name = await SpecialEventModel.getBillName(Cust_id,Bill_id);

        var Device_data = await SpecialEventModel.getSpecialEventDetailFixed(Cust_id,Bill_id);

        Device_data.data[0].model_name = Bill_name.data[0].bill_plan_name;

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

async function GetSpecialEventDeviceDataTOU(request, response) {

    try {

        console.log("inside get special Event details Controller");
        var Cust_id = request.params.id;
        var Bill_id=request.body.newBillId;

        var Bill_name = await SpecialEventModel.getBillName(Cust_id,Bill_id);

        var Device_data = await SpecialEventModel.getSpecialEventDetailTOU(Cust_id,Bill_id);

        

        if (Device_data.data != null) {
            Device_data.data[0].model_name = Bill_name.data[0].bill_plan_name;
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




module.exports = { GetSpecialEventDeviceDataFixed,GetSpecialEventDeviceDataTOU};

