var commonResponseService = require('../../service/responseService');
var SuggestionsModel = require('../../model/monthlyBill/SuggestionsModel');


/**
 * get device wise usage tou
 * @param {*} request  
 * @param {*} response 
 */
async function GetDeviceWiseSuggestions(request, response) { 

    try {

        console.log("inside getTouDeviceWise Controller");
        console.log(request.params.id)
        console.log(request.body.newBillId)
        var Suggestions = await SuggestionsModel.getSuggestions(request.body.newBillId,request.params.id);

        if (Suggestions.data.length != 0) {
            commonResponseService.responseWithData(response, Suggestions.data);

        } else {

            commonResponseService.errorWithMessage(response, "something went wrong");

        }


    } catch (error) {
        console.log(error);
        commonResponseService.errorWithMessage(response, "something went wrong");
    }
}

module.exports = { GetDeviceWiseSuggestions };
