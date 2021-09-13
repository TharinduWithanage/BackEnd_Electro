var db = require('../../database/databaseConnection');

/**
 * Add device data to main bill plan
 * @param {*} devicedataTOU data of devices
 * @returns 
 */
module.exports.AddSpecialEventDeviceDataTOU = (devicedataTOU, id) => {
    return new Promise(async (resolve, reject) => {

        var bill_id = devicedataTOU.bill_id
        var appliance = devicedataTOU.appliance
        var quantity = devicedataTOU.quantity
        var using_minutes_peak_time = devicedataTOU.using_minutes_peak_time
        var using_minutes_off_peak_time = devicedataTOU.using_minutes_off_peak_time
        var using_minutes_day_time = devicedataTOU.using_minutes_day_time
        var power = devicedataTOU.power
        var units_peak_time = devicedataTOU.units_peak_time
        var units_off_peak_time = devicedataTOU.units_off_peak_time
        var units_day_time = devicedataTOU.units_day_time
        var total_cost_TOU = devicedataTOU.total_cost_TOU
        var cost_peak_time = devicedataTOU.cost_peak_time
        var cost_off_peak_time = devicedataTOU.cost_off_peak_time
        var cost_day_time = devicedataTOU.cost_day_time
        var Cust_id = id
        var hPeak = devicedataTOU.hPeak
        var mPeak = devicedataTOU.mPeak
        var hOffPeak = devicedataTOU.hOffPeak
        var mOffPeak = devicedataTOU.mOffPeak
        var hDay = devicedataTOU.hDay
        var mDay = devicedataTOU.mDay
        var numberOfDays = devicedataTOU.numberOfDays
        var total_units = devicedataTOU.total_units
        console.log("TOU bill is",bill_id);
        //console.log("Appliance name is :",appliance);

        var addSpEvDeviceTOUQuery = `INSERT INTO electric_device_special_event_tou 
        (bill_id, appliance, quantity, hPeak, mPeak, hOffPeak, mOffPeak, hDay, mDay, using_minutes_peak_time, using_minutes_off_peak_time, using_minutes_day_time, power, units_peak_time,
        units_off_peak_time, units_day_time, total_cost_TOU, cost_peak_time, cost_off_peak_time, cost_day_time,numberOfDays,total_units, Cust_id) 
        VALUES("${bill_id}","${appliance}","${quantity}","${hPeak}","${mPeak}","${hOffPeak}","${mOffPeak}","${hDay}","${mDay}","${using_minutes_peak_time}",
        "${using_minutes_off_peak_time}","${using_minutes_day_time}","${power}","${units_peak_time}",
        "${units_off_peak_time}","${units_day_time}","${total_cost_TOU}","${cost_peak_time}","${cost_off_peak_time}",
        "${cost_day_time}","${numberOfDays}","${total_units}","${Cust_id}");`;



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




module.exports.getSpecialEventDetailsFixed = (CustId,billId) => {
    return new Promise(async (resolve, reject) => {


        console.log("Get Special Event TOU More Details Model");
        console.log("TOU Bill id",billId);

        var selectQuery = `SELECT device_id as id,appliance,quantity,power,hPeak,mPeak,hOffPeak,mOffPeak,hDay,mDay,numberOfDays FROM electric_device_special_event_tou WHERE bill_id = ${billId} AND Cust_id = ${CustId}; `;

        //console.log("Inside get bill id model function query"+ selectQuery);


        db.query(selectQuery, async function (error, result) {

            if (error) {
                console.log(error);

                reject({ status: false, mesg: "error getting data" });
            } else {
                console.log("Fixed More data is : "+result);
                resolve({ status: true,  data: result  });

            }

        });
    });

}





module.exports.getTOUBillIdFunc = (CustId) => {
    return new Promise(async (resolve, reject) => {


        console.log("Inside get TOU bill id model function query"+ CustId);

        var selectQuery = `SELECT MAX(bill_id) As max_bill_id
        FROM ebill_special_event
        Where Cust_id = ${CustId}; `;

        console.log("Inside get bill id model function query"+ selectQuery);

       
        db.query(selectQuery, async function (error, result) {

            if (error) {
                console.log(error);

                reject({ status: false, mesg: "error getting data" });
            } else {
                console.log("Select query:", result[0].max_bill_id);
                resolve({ status: true, data: result[0].max_bill_id });

            }

        });
    });

}


module.exports.getSpecialEventDetailsTOU = (CustId,billId) => {
    return new Promise(async (resolve, reject) => {


        console.log("getSpecialEventDetailsFixed");
        console.log(billId);
        
        var selectQuery = `SELECT * FROM electric_device_special_event_tou WHERE bill_id = ${billId} AND Cust_id = ${CustId}; `;

        //console.log("Inside get bill id model function query"+ selectQuery);


        db.query(selectQuery, async function (error, result) {

            if (error) {
                console.log(error);

                reject({ status: false, mesg: "error getting data" });
            } else {
                console.log("data is : "+result);
                resolve({ status: true,  data: result  });

            }

        });
    });

}




module.exports.updateSpecialEventDetailsTOU = (devicedata, id,bill_id) => {
    return new Promise(async (resolve, reject) => {
        console.log("update Special:",devicedata.appliance);
        var device_id = devicedata.device_id
        
        var appliance = devicedata.appliance
        var quantity = devicedata.quantity
        var using_minutes_peak_time = devicedata.using_minutes_peak_time
        var using_minutes_off_peak_time = devicedata.using_minutes_off_peak_time
        var using_minutes_day_time = devicedata.using_minutes_day_time
        var power = devicedata.power
        var total_units = devicedata.total_units
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
        var numberOfDays=devicedata.numberOfDays;

        var updateSpecialEventDeviceQuery = `UPDATE electric_device_special_event_tou 
        SET appliance='${appliance}',quantity='${quantity}',hPeak='${hPeak}',mPeak='${mPeak}',hOffPeak='${hOffPeak}',mOffPeak='${mOffPeak}',
        hDay='${hDay}',mDay ='${mDay}',using_minutes_peak_time='${using_minutes_peak_time}',using_minutes_off_peak_time='${using_minutes_off_peak_time}',using_minutes_day_time='${using_minutes_day_time}',
        power='${power}',total_units='${total_units}',units_peak_time='${units_peak_time}',units_off_peak_time='${units_off_peak_time}',units_day_time='${units_day_time}',total_cost_TOU='${total_cost_TOU}',
        cost_peak_time='${cost_peak_time}',cost_off_peak_time='${cost_off_peak_time}',cost_day_time='${cost_day_time}',numberOfDays='${numberOfDays}' WHERE device_id='${device_id}' AND bill_id='${bill_id}' AND Cust_id='${Cust_id}';`;

        // console.log("Inside update query");
    //    console.log(updateSpecialEventDeviceQuery);
        db.query(updateSpecialEventDeviceQuery, async function (error, result) {

            if (error) {
                console.log(error);

                reject({ status: false, mesg: "error update data" });
            } else {
                // console.log(result);

                resolve({ status: true, mesg: "successfully update data" });

            }

        });
    });

}



module.exports.getSpecialEventBillPlans = (CustId) => {

    return new Promise(async (resolve, reject) => {


        var selectTOUQuery = `SELECT bill_id,Total_units,bill_plan_name,bill_model FROM ebill_special_event WHERE Cust_id = ${CustId};`;
         
        //console.log("Inside get bill id model function query"+ selectQuery);

        
        db.query(selectTOUQuery, async function (error, result) {

            if (error) {
                console.log(error);

                reject({ status: false, mesg: "error getting data" });
            } else {
                console.log(result);
                resolve({ status: true, data: result });

            }

        });
    });

}




module.exports.deleteSpecialEventDeviceFunc = (CustId, deleteData) => {
    return new Promise(async (resolve, reject) => {
        var device_id = deleteData.device_id;
        var bill_id = deleteData.bill_id;

        //console.log("Inside get bill id model function query"+ CustId);

        var deleteQuery = `DELETE FROM electric_device_special_event_tou WHERE device_id='${device_id}' AND bill_id='${bill_id}' AND Cust_id='${CustId}';`;

        //console.log("Inside get bill id model function query"+ selectQuery);


        db.query(deleteQuery, async function (error, result) {

            if (error) {
                console.log(error);

                reject({ status: false, mesg: "error deleting data" });
            } else {

                resolve({ status: true, mesg: "Delete  device Success!!" });

            }

        });
    });

}




module.exports.getTOUUnitsAndCost= (devicedata,CustId) => {
    return new Promise(async (resolve, reject) => {

       var bill_id=devicedata.bill_id;

        console.log("getTOUUnitsAndCost:");
       
        
        var selectQuery = `SELECT Total_units, Total_cost_tou  FROM electric_device_special_event_tou WHERE bill_id = ${bill_id} AND Cust_id = ${CustId}; `;

        //console.log("Inside get bill id model function query"+ selectQuery);


        db.query(selectQuery, async function (error, result) {

            if (error) {
                console.log(error);

                reject({ status: false, mesg: "error getting data" });
            } else {
                console.log(" The get all the data is : "+result);
                resolve({ status: true,  data: result  });

            }

        });
    });

}


module.exports.getDeviceDetailsToCalculate = (BillId, CustId) => {

    return new Promise(async (resolve, reject) => {


        console.log("Inside get all device derails :"+ CustId);
        

        var selectQuery = `SELECT SUM(total_cost_TOU) AS TOU_bill_sum,SUM(cost_day_time) AS cost_day_time,SUM(cost_off_peak_time) AS cost_off_peak_time,SUM(cost_peak_time) AS cost_peak_time,
        SUM(units_day_time) AS units_day_time,SUM(units_off_peak_time) AS units_off_peak_time,SUM(units_peak_time) AS units_peak_time,SUM(total_units) AS Total_units
        FROM electric_device_special_event_tou Where Cust_id = ${CustId} AND bill_id=${BillId}; `;

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


module.exports.setTOUSpecialEventPlan = (Bill_details, CustId) => {
    return new Promise(async (resolve, reject) => {

        var bill_id = Bill_details.billId;
        var Total_cost_tou = Bill_details.TOU_bill_cost;
        var Cost_day_time = Bill_details.cost_day_time;
        var Cost_off_peak_time = Bill_details.cost_off_peak_time;
        var Cost_peak_time = Bill_details.cost_peak_time;
        var Units_day_time = Bill_details.units_day_time;
        var Units_off_peak_time = Bill_details.units_off_peak_time;
        var Units_peak_time = Bill_details.units_peak_time;
        var Cust_id = CustId;


        var addDeviceQuery = `INSERT INTO ebill_special_event_tou 
        (bill_id, Total_cost_tou, Cost_day_time,Cost_off_peak_time,
        Cost_peak_time,Units_day_time,Units_off_peak_time,
        Units_peak_time,Cust_id) 
        VALUES("${bill_id}","${Total_cost_tou}","${Cost_day_time}","${Cost_off_peak_time}",
        "${Cost_peak_time}","${Units_day_time}","${Units_off_peak_time}",
        "${Units_peak_time}","${Cust_id}");`;


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

module.exports.setSpecialEventPlan = (Bill_details, CustId,Plan_name) => {
    return new Promise(async (resolve, reject) => {

        console.log(Bill_details.units_day_time);
        var bill_id = Bill_details.billId;
        var Total_units = Bill_details.Total_units;
        var Cust_id = CustId;
        var bill_model = "TOU"


        var addDeviceQuery = `INSERT INTO ebill_special_event 
        (bill_id,Total_units,bill_plan_name,bill_model,Cust_id) 
        VALUES("${bill_id}","${Total_units}","${Plan_name}","${bill_model}","${Cust_id}");`;

       console.log(addDeviceQuery);
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








