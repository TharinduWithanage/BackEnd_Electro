var db = require('../../database/databaseConnection');


// get bill data for calculate bill value to compare each models

module.exports.getDeviceDetailsToCalculate = (BillId, CustId) => {

    return new Promise(async (resolve, reject) => {


        //console.log("Inside get bill id model function query"+ CustId);
        

        var selectQuery = `SELECT SUM(total_cost_TOU) AS TOU_bill_sum, SUM(total_units) AS TotalUnits, 
        SUM(units_peak_time) AS units_peak_time, SUM(units_off_peak_time) AS units_off_peak_time, 
        SUM(units_day_time) AS units_day_time, SUM(cost_peak_time) AS cost_peak_time, 
        SUM(cost_off_peak_time) AS cost_off_peak_time, SUM(cost_day_time) AS cost_day_time 
        FROM electric_device_mplan Where Cust_id = ${CustId} AND bill_id=${BillId}; `;

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
module.exports.setMonthlyPlan = (Bill_details, CustId, best_model) => {
    return new Promise(async (resolve, reject) => {

        console.log(Bill_details.units_day_time);
        var bill_id = Bill_details.billId;
        var Total_cost_tou = Bill_details.TOU_bill_cost;
        var Cost_day_time = Bill_details.cost_day_time;
        var Cost_off_peak_time = Bill_details.cost_off_peak_time;
        var Cost_peak_time = Bill_details.cost_peak_time;
        var Total_cost_fixed = Bill_details.fixed_bill_cost;
        var Units_day_time = Bill_details.units_day_time;
        var Units_off_peak_time = Bill_details.units_off_peak_time;
        var Units_peak_time = Bill_details.units_peak_time;
        var Total_units = Bill_details.TotalUnits;
        var Best_model = best_model;
        var Cust_id = CustId;


        var addDeviceQuery = `INSERT INTO ebill_monthly_plan 
        (bill_id, Total_cost_tou, Cost_day_time, Cost_off_peak_time,
        Cost_peak_time, Total_cost_fixed, Units_day_time, Units_off_peak_time,
        Units_peak_time, Total_units, Best_model, Cust_id) 
        VALUES("${bill_id}","${Total_cost_tou}","${Cost_day_time}","${Cost_off_peak_time}",
        "${Cost_peak_time}","${Total_cost_fixed}","${Units_day_time}","${Units_off_peak_time}",
        "${Units_peak_time}","${Total_units}","${Best_model}","${Cust_id}");`;


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

module.exports.getCalculatedValues = (BillId, CustId) => {

    return new Promise(async (resolve, reject) => {


        var selectQuery = `SELECT bill_id, Total_cost_tou, Total_cost_fixed, Best_model 
        FROM ebill_monthly_plan Where Cust_id = ${CustId} AND bill_id=${BillId};`;

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