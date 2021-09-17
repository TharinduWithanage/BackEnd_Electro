var db = require('../../database/databaseConnection');

module.exports.getDeviceUsageTou = (billId, userId) => {
    return new Promise(async (resolve, reject) => {




        // var selectDeviceWiseTouQuery = `SELECT device_id,appliance, quantity,  cost_day_time, cost_off_peak_time, cost_peak_time ,total_units, total_cost_TOU FROM electric_device_mplan WHERE Cust_id=${userId} AND bill_id=${billId} ORDER BY total_units DESC;`;
        var selectDeviceWiseTouQuery = `SELECT * FROM electric_device_mplan WHERE Cust_id=${userId} AND bill_id=${billId} ORDER BY total_units DESC;`;

        console.log(selectDeviceWiseTouQuery)

        db.query(selectDeviceWiseTouQuery, async function (error, result) {

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

module.exports.getDeviceUsageFixed = (billId, userId) => {
    return new Promise(async (resolve, reject) => {




        // var selectDeviceWiseFixedQuery = `SELECT appliance, quantity, total_units FROM electric_device_mplan WHERE Cust_id=${userId} AND bill_id=${billId} ORDER BY total_units DESC;`;
        var selectDeviceWiseFixedQuery = `SELECT * FROM electric_device_mplan WHERE Cust_id=${userId} AND bill_id=${billId} ORDER BY total_units DESC;`;

        console.log(selectDeviceWiseFixedQuery)

        db.query(selectDeviceWiseFixedQuery, async function (error, result) {

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