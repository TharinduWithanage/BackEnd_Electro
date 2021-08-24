var db = require('../../database/databaseConnection');

/**
 * Add device data to main bill plan
 * @param {*} devicedata data of devices
 * @returns 
 */
module.exports.AddSpEventDeviceTOU = (devicedata, id) => {
    return new Promise(async (resolve, reject) => {

        var bill_id = devicedata.bill_id
        var appliance = devicedata.appliance
        var quantity = devicedata.quantity
        var using_minutes_peak_time = devicedata.using_minutes_peak_time
        var using_minutes_off_peak_time = devicedata.using_minutes_off_peak_time
        var using_minutes_day_time = devicedata.using_minutes_day_time
        var power = devicedata.power
        var units_peak_time = devicedata.units_peak_time
        var units_off_peak_time = devicedata.units_off_peak_time
        var units_day_time = devicedata.units_day_time
        var total_cost_TOU = devicedata.total_cost_TOU
        var cost_peak_time = devicedata.cost_peak_time
        var cost_off_peak_time = devicedata.cost_off_peak_time
        var cost_day_time = devicedata.cost_day_time
        var Cust_id = id
        var hPeak = devicedata.hPeak
        var mPeak = devicedata.mPeak
        var hOffPeak = devicedata.hOffPeak
        var mOffPeak = devicedata.mOffPeak
        var hDay = devicedata.hDay
        var mDay = devicedata.mDay
        var numberOfDays = devicedata.numberOfDays


        var addSpEvDeviceTOUQuery = `INSERT INTO electric_device_special_event_tou 
        (bill_id, appliance, quantity, hPeak, mPeak, hOffPeak, mOffPeak, hDay, mDay, using_minutes_peak_time, using_minutes_off_peak_time, using_minutes_day_time, power, units_peak_time,
        units_off_peak_time, units_day_time, total_cost_TOU, cost_peak_time, cost_off_peak_time, cost_day_time,numberOfDays, Cust_id) 
        VALUES("${bill_id}","${appliance}","${quantity}","${hPeak}","${mPeak}","${hOffPeak}","${mOffPeak}","${hDay}","${mDay}","${using_minutes_peak_time}",
        "${using_minutes_off_peak_time}","${using_minutes_day_time}","${power}","${units_peak_time}",
        "${units_off_peak_time}","${units_day_time}","${total_cost_TOU}","${cost_peak_time}","${cost_off_peak_time}",
        "${cost_day_time}","${numberOfDays}","${Cust_id}");`;



        db.query(addSpEvDeviceTOUQuery, async function (error, result) {

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
