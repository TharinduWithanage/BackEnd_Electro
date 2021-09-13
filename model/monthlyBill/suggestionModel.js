var db = require('../../database/databaseConnection');

module.exports.addSuggestion = (suggestion) => {
    return new Promise(async (resolve, reject) => {
        console.log("inside of suggestion Model");
        console.log(suggestion);

        var Cust_id = suggestion.Cust_id
        var device_id = suggestion.device_id
        var bill_id = suggestion.bill_id
        var appliance = suggestion.appliance
        var quantity = suggestion.quantity
        var priority = suggestion.priority
        var cur_time = suggestion.cur_time
        var change_time = suggestion.change_time
        var can_change_hours = Math.floor(suggestion.can_change_minutes_per_day/60) 
        var can_change_minutes = parseInt(suggestion.can_change_minutes_per_day) - parseInt(can_change_hours*60)
        var save_amount = suggestion.save_amount
       

        var addDeviceQuery = `INSERT INTO suggestions 
        (Cust_id, device_id, bill_id, appliance, quantity, priority,
         cur_time, change_time, can_change_hours, can_change_minutes, save_amount) 
        VALUES("${Cust_id}","${device_id}","${bill_id}","${appliance}","${quantity}","${priority}",
        "${cur_time}","${change_time}","${can_change_hours}","${can_change_minutes}","${save_amount}");`;

        db.query(addDeviceQuery, async function (error, result) {

            if (error) {
                console.log(error);

                reject({ status: false, mesg: "error inserting data" });
            } else {
                // console.log(result);

                resolve({ status: true, mesg: "successfully insert data" });

            }


        });
   });

}

module.exports.getDeviceId = (BillId, CustId) => {

    return new Promise(async (resolve, reject) => {


        var selectQuery = `SELECT MAX(device_id) As device_id FROM electric_device_mplan Where Cust_id = ${CustId} AND bill_id=${BillId};`;

        console.log("Inside getDeviceId model function query"+ selectQuery);


        db.query(selectQuery, async function (error, result) {
        if (error) {
                console.log(error);

                reject({ status: false, mesg: "error getting data" });
            } else {

                resolve({ status: true, data: result });

            }

        });
    });

}



module.exports.getSuggestions = (billId, userId) => {
    return new Promise(async (resolve, reject) => {

        var selectDeviceWiseSuggestions = `SELECT * FROM suggestions where bill_id = ${billId} AND Cust_id = ${userId};`;
        console.log(selectDeviceWiseSuggestions)

        db.query(selectDeviceWiseSuggestions, async function (error, result) {


            if (error) {
                console.log(error);

                reject({ status: false, mesg: "error getting data" });
            } else {


                resolve({ status: true, data: result });

            }

        });
    });


}

