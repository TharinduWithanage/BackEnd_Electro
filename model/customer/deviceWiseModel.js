var db = require('../../database/databaseConnection');

module.exports.AddDeviceMailBill = (devicedata) => {
    return new Promise(async (resolve, reject) => {

        var bill_id = devicedata.bill_id
        var Cust_id = devicedata.Cust_id

        var selectDeviceWiseUnitsFQuery = `SELECT  appliance,total_units_fixed FROM electric_device_mplan where Cust_id="${Cust_id}" && bill_id="${bill_id}"`;


        db.query(selectDeviceWiseUnitsFQuery, async function (error, result) {

            if (error) {
                console.log(error);

                reject({ status: false, mesg: "error inserting data" });
            } else {
                // console.log(result);

                resolve({ status: true, data: result });

            }

        });
    });

}