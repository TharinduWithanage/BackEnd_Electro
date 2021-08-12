var db = require('../../database/databaseConnection');

module.exports.AddDeviceMailBill = (devicedata) => {
    return new Promise(async (resolve, reject) => {

        // console.log(requestData);
        console.log("Add New Device Model");

        var addDeviceQuery = `INSERT INTO electric_device_mplan 
        (Bill_id, Device_name, Quantity, Priority, Using_hours_peak_time, Using_hours_off_peak_time, Using_hours_day_time, Power, Total_units_fixed, Units_peak_time,
        Units_off_peak_time, Units_day_time, Total_cost_fixed, Cost_peak_time, Cost_off_peak_time, Cost_day_time, Cust_id) 
        VALUES("${devicedata.Bill_id}","${devicedata.Device_name}",${devicedata.Quantity}",${devicedata.Priority}",${devicedata.Using_hours_peak_time}",
        ${devicedata.Using_hours_off_peak_time}",${devicedata.Using_hours_day_time}",${devicedata.Power}",${devicedata.Total_units_fixed}",${devicedata.Units_peak_time}",
        ${devicedata.Units_off_peak_time}",${devicedata.Units_day_time}",${devicedata.Total_cost_fixed}",${devicedata.Cost_peak_time}",${devicedata.Cost_off_peak_time}",
        ${devicedata.Cost_day_time}",${devicedata.Cust_id}");`;



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