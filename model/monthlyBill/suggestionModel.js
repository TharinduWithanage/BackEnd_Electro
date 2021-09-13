var db = require('../../database/databaseConnection');

module.exports.getDeviceUsageTou = (Obj) => {
    //return new Promise(async (resolve, reject) => {
        console.log("inside of suggestion Model");
        console.log(Obj);

        // var selectDeviceWiseTouQuery = `SELECT device_id,appliance, quantity,  cost_day_time, cost_off_peak_time, cost_peak_time ,total_units, total_cost_TOU FROM electric_device_mplan WHERE Cust_id=${userId} AND bill_id=${billId} ORDER BY total_units DESC;`;
        // console.log(selectDeviceWiseTouQuery)

        // db.query(selectDeviceWiseTouQuery, async function (error, result) {

        //     if (error) {
        //         console.log(error);

        //         reject({ status: false, mesg: "error getting data" });
        //     } else {
        //         // console.log(result);

        //         resolve({ status: true, data: result });

        //     }

        // });
   // });

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
                // console.log(result);

                resolve({ status: true, data: result });

            }

        });
    });

}