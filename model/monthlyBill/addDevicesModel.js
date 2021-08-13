var db = require('../../database/databaseConnection');

module.exports.AddDeviceMailBill = (devicedata) => {
    return new Promise(async (resolve, reject) => {

        // console.log(requestData);
        // console.log(devicedata);
        var Bill_id = devicedata.Bill_id
        var Device_name = devicedata.Device_name
        var Quantity = devicedata.Quantity
        var Priority = devicedata.Priority
        var Using_minutes_peak_time = devicedata.Using_minutes_peak_time
        var Using_minutes_off_peak_time = devicedata.Using_minutes_off_peak_time
        var Using_minutes_day_time = devicedata.Using_minutes_day_time
        var Power = devicedata.power
        var Total_units_fixed = devicedata.Total_units_fixed
        var Units_peak_time = devicedata.Units_peak_time
        var Units_off_peak_time = devicedata.Units_off_peak_time
        var Units_day_time = devicedata.Units_day_time
        var Total_cost_TOU = devicedata.Total_cost_TOU
        var Cost_peak_time = devicedata.Cost_peak_time
        var Cost_off_peak_time = devicedata.Cost_off_peak_time
        var Cost_day_time = devicedata.Cost_day_time
        var Cust_id = devicedata.Cust_id


        var addDeviceQuery = `INSERT INTO electric_device_mplan 
        (Bill_id, Device_name, Quantity, Priority, Using_minutes_peak_time, Using_minutes_off_peak_time, Using_minutes_day_time, Power, Total_units_fixed, Units_peak_time,
        Units_off_peak_time, Units_day_time, Total_cost_TOU, Cost_peak_time, Cost_off_peak_time, Cost_day_time, Cust_id) 
        VALUES("${Bill_id}","${Device_name}","${Quantity}","${Priority}","${Using_minutes_peak_time}",
        "${Using_minutes_off_peak_time}","${Using_minutes_day_time}","${Power}","${Total_units_fixed}","${Units_peak_time}",
        "${Units_off_peak_time}","${Units_day_time}","${Total_cost_TOU}","${Cost_peak_time}","${Cost_off_peak_time}",
        "${Cost_day_time}","${Cust_id}");`;



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