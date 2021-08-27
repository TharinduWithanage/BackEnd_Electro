var db = require('../../database/databaseConnection');


// get bill data for calculate bill value to compare each models

module.exports.getCalculatedValues = (BillId, CustId) => {

    return new Promise(async (resolve, reject) => {


        //console.log("Inside get bill id model function query"+ CustId);
        

        var selectQuery = `SELECT SUM(total_cost_TOU) AS TOU_bill_sum, SUM(total_units) AS TotalUnits 
        FROM electric_device_mplan
        Where Cust_id = ${CustId} AND bill_id=${BillId}; `;

        //console.log("Inside get bill id model function query"+ selectQuery);


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

//ongoing
module.exports.setMonthlyPlan = (devicedata, id) => {
    return new Promise(async (resolve, reject) => {

        var bill_id = devicedata.bill_id
        var appliance = devicedata.appliance
        var quantity = devicedata.quantity
        var priority = devicedata.priority
        


        var addDeviceQuery = `INSERT INTO electric_device_mplan 
        (bill_id, appliance, quantity, priority, hPeak, mPeak, hOffPeak, mOffPeak, hDay, mDay, using_minutes_peak_time, using_minutes_off_peak_time, using_minutes_day_time, power, total_units_fixed, units_peak_time,
        units_off_peak_time, units_day_time, total_cost_TOU, cost_peak_time, cost_off_peak_time, cost_day_time, Cust_id) 
        VALUES("${bill_id}","${appliance}","${quantity}","${priority}","${hPeak}","${mPeak}","${hOffPeak}","${mOffPeak}","${hDay}","${mDay}","${using_minutes_peak_time}",
        "${using_minutes_off_peak_time}","${using_minutes_day_time}","${power}","${total_units_fixed}","${units_peak_time}",
        "${units_off_peak_time}","${units_day_time}","${total_cost_TOU}","${cost_peak_time}","${cost_off_peak_time}",
        "${cost_day_time}","${Cust_id}");`;



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