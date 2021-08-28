var db = require('../../database/databaseConnection');

/**
 * Add device data to main bill plan
 * @param {*} devicedataTOU data of devices
 * @returns 
 */
module.exports.AddSpecialEventDeviceTOU = (devicedataTOU, id) => {
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

module.exports.AddSpecialEventDeviceFixed = (devicedataFixed, id) => {
    return new Promise(async (resolve, reject) => {
        //console.log(devicedataFixed);
        var bill_id = devicedataFixed.bill_id
        var appliance = devicedataFixed.appliance
        var quantity = devicedataFixed.quantity
        var hfixed = devicedataFixed.hours
        var mfixed = devicedataFixed.minutes
        var using_minutes_fixed = devicedataFixed.using_minutes_fixed
        var power = devicedataFixed.power
        var total_units_fixed = devicedataFixed.total_units_fixed
        //var numberOfDays = devicedataFixed.numberOfDays
        var Cust_id = id

        var addSpEvDeviceFixedQuery = `INSERT INTO electric_device_special_event_fixed 
        (bill_id, appliance, quantity, hfixed, mfixed, using_minutes_fixed, power, total_units_fixed,
         Cust_id) 
        VALUES("${bill_id}","${appliance}","${quantity}","${hfixed}","${mfixed}","${using_minutes_fixed}",
        "${power}","${total_units_fixed}", "${Cust_id}");`;



        db.query(addSpEvDeviceFixedQuery, async function (error, result) {

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


module.exports.getFixedBillIdFunc = (CustId) => {
    return new Promise(async (resolve, reject) => {


        //console.log("Inside get bill id model function query"+ CustId);

        var selectQuery = `SELECT MAX(Bill_id) As max_bill_id
        FROM ebill_specialevent
        Where Cust_id = ${CustId}; `;

        //console.log("Inside get bill id model function query"+ selectQuery);


        db.query(selectQuery, async function (error, result) {

            if (error) {
                console.log(error);

                reject({ status: false, mesg: "error getting data" });
            } else {
                
                resolve({ status: true, data: result[0].max_bill_id });

            }

        });
    });

}


module.exports.getSpecialEventDetailsFixed = (CustId,billId) => {
    return new Promise(async (resolve, reject) => {


        console.log("getSpecialEventDetailsFixed");
        console.log(billId);

        var selectQuery = `SELECT device_id,appliance,quantity,hfixed,mfixed,power FROM electric_device_special_event_fixed WHERE bill_id = ${billId} AND Cust_id = ${CustId}; `;

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




module.exports.updateSpecialEventDetailsFixed = (devicedata, id,bill_id) => {
    return new Promise(async (resolve, reject) => {
        console.log("update Special:",devicedata.appliance);
        var device_id = devicedata.device_id
        var appliance = devicedata.appliance
        var quantity = devicedata.quantity
        var hours=devicedata.hours;
        var minutes=devicedata.minutes;
        var total_minutes=devicedata.using_minutes_fixed
        var total_units_fixed=devicedata.total_units_fixed;
        var power = devicedata.power
        var Cust_id = id
 

        var updateSpecialEventDeviceQuery = `UPDATE electric_device_special_event_fixed
        SET appliance='${appliance}',quantity='${quantity}',hfixed='${hours}',mfixed='${minutes}',using_minutes_fixed='${total_minutes}',power='${power}',
        total_units_fixed='${total_units_fixed}' WHERE device_id='${device_id}' AND bill_id='${bill_id}' AND Cust_id='${Cust_id}';`;

       console.log(updateSpecialEventDeviceQuery);
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





