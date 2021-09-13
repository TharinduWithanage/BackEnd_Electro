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
        var hfixed = devicedataFixed.hfixed
        var mfixed = devicedataFixed.mfixed
        var using_minutes_fixed = devicedataFixed.using_minutes_fixed
        var power = devicedataFixed.power
        var total_units_fixed = devicedataFixed.total_units_fixed
        var numberOfDays = devicedataFixed.numberOfDays
        var Cust_id = id

        var addSpEvDeviceFixedQuery = `INSERT INTO electric_device_special_event_fixed 
        (bill_id, appliance, quantity, hfixed, mfixed, using_minutes_fixed, power, total_units_fixed,numberOfDays,
         Cust_id) 
        VALUES("${bill_id}","${appliance}","${quantity}","${hfixed}","${mfixed}","${using_minutes_fixed}",
        "${power}","${total_units_fixed}","${numberOfDays}", "${Cust_id}");`;



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
        FROM ebill_special_event
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


        console.log("Get Special Event Fixed More Details Model");
        console.log("Fixed Bill id",billId);

        var selectQuery = `SELECT device_id as id,appliance,quantity,power,hfixed,mfixed,numberOfDays FROM electric_device_special_event_fixed WHERE bill_id = ${billId} AND Cust_id = ${CustId}; `;

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




module.exports.updateSpecialEventDetailsFixed = (devicedata, id,bill_id) => {
    return new Promise(async (resolve, reject) => {
        console.log("update Special:",devicedata.appliance);
        var device_id = devicedata.device_id
        var appliance = devicedata.appliance
        var quantity = devicedata.quantity
        var hours=devicedata.hfixed;
        var minutes=devicedata.mfixed;
        var total_minutes=devicedata.using_minutes_fixed
        var total_units_fixed=devicedata.total_units_fixed;
        var power = devicedata.power
        var numberOfDays=devicedata.numberOfDays;
        var Cust_id = id
 

        var updateSpecialEventDeviceQuery = `UPDATE electric_device_special_event_fixed
        SET appliance='${appliance}',quantity='${quantity}',hfixed='${hours}',mfixed='${minutes}',using_minutes_fixed='${total_minutes}',power='${power}',
        total_units_fixed='${total_units_fixed}',numberOfDays='${numberOfDays}' WHERE device_id='${device_id}' AND bill_id='${bill_id}' AND Cust_id='${Cust_id}';`;

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




module.exports.deleteSpecialEventDeviceFunc = (CustId, deleteData) => {
    return new Promise(async (resolve, reject) => {
        var device_id = deleteData.device_id;
        var bill_id = deleteData.bill_id;

        //console.log("Inside get bill id model function query"+ CustId);

        var deleteQuery = `DELETE FROM electric_device_special_event_fixed WHERE device_id='${device_id}' AND bill_id='${bill_id}' AND Cust_id='${CustId}';`;

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





module.exports.getBillPlanName = (CustId,BillId) => {

    return new Promise(async (resolve, reject) => {


        console.log("Inside get all device derails :"+ CustId);
        

        var selectQuery = `SELECT bill_plan_name FROM ebill_special_event WHERE Cust_id = ${CustId} AND bill_id=${BillId}; `;

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



module.exports.updateBillPlanName = (Bill_details,Cust_id,bill_plan_name) => {

    return new Promise(async (resolve, reject) => {
        var bill_id = Bill_details.billId;
        var Total_units = Bill_details.total_units;
        

        

        console.log("Inside Update Bill Plan name :"+ Cust_id);
        

        var updateSpecialEventBillPlanName = `UPDATE ebill_special_event
        SET bill_plan_name='${bill_plan_name}',Total_units='${Total_units}' WHERE Cust_id='${Cust_id}' AND bill_id='${bill_id}' ;`;

        //console.log("Inside get bill id model function query"+ selectQuery);


        console.log(updateSpecialEventBillPlanName);
        db.query(updateSpecialEventBillPlanName, async function (error, result) {

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

module.exports.getDeviceDetailsToCalculate = (BillId, CustId) => {

    return new Promise(async (resolve, reject) => {


        console.log("Inside get all device derails :"+ CustId);
        

        var selectQuery = `SELECT SUM(total_units_fixed) AS total_units
        FROM electric_device_special_event_fixed Where Cust_id = ${CustId} AND bill_id=${BillId}; `;

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


module.exports.getPlanName= (BillId, CustId) => {

    return new Promise(async (resolve, reject) => {


        console.log("Inside get Plan name :"+ CustId);
        

        var selectQuery = `SELECT bill_plan_name FROM ebill_special_event  Where Cust_id = ${CustId} AND bill_id=${BillId}; `;

        //console.log("Inside get bill id model function query"+ selectQuery);
        console.log("Plan name is:",selectQuery);

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


module.exports.editSpecialEventFixed = (BillId, CustId) => {

    return new Promise(async (resolve, reject) => {


        console.log("Inside get all device derails :"+ CustId);
        

        var selectQuery = `SELECT SUM(total_units_fixed) AS total_units
        FROM electric_device_special_event_fixed Where Cust_id = ${CustId} AND bill_id=${BillId}; `;

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

module.exports.setSpecialEventPlan = (Bill_details, CustId,Plan_name) => {
    return new Promise(async (resolve, reject) => {

        console.log(Bill_details.units_day_time);
        var bill_id = Bill_details.billId;
        var Total_units = Bill_details.total_units;
        var Cust_id = CustId;
        var bill_model = "fixed"


        var addDeviceQuery = `INSERT INTO ebill_special_event 
        (bill_id,Total_units,bill_plan_name,bill_model,Cust_id) 
        VALUES("${bill_id}","${Total_units}","${Plan_name}","${bill_model}","${Cust_id}");`;


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

module.exports.deleteTOUBillPlanFunc = (CustId, bill_id) => {
    return new Promise(async (resolve, reject) => {
        

        console.log("Inside get deleteTOUBillPlanFunc function query"+ bill_id);
        console.log("Inside get deleteTOUBillPlanFunc function query"+ CustId);

        var deleteQuery = `DELETE FROM ebill_special_event_tou WHERE bill_id='${bill_id}' AND Cust_id='${CustId}';`;

        console.log( deleteQuery);


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

module.exports.deleteSpecialBillPlanFunc = (CustId, bill_id) => {
    return new Promise(async (resolve, reject) => {
        

        console.log("Inside get deleteTOUBillPlanFunc function query"+ bill_id);
        console.log("Inside get deleteTOUBillPlanFunc function query"+ CustId);

        var deleteQuery = `DELETE FROM ebill_special_event WHERE bill_id='${bill_id}' AND Cust_id='${CustId}';`;

        console.log( deleteQuery);


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

module.exports.deleteSpecialBillPlanDevices = (CustId, bill_id, bill_model) => {
    return new Promise(async (resolve, reject) => {
        

        console.log("Inside get deleteTOUBillPlanFunc function query"+ bill_id);
        console.log("Inside get deleteTOUBillPlanFunc function query"+ CustId);
        console.log("Inside get deleteTOUBillPlanFunc function query"+ bill_model);

        if(bill_model == "fixed"){
            var deleteQuery = `DELETE FROM electric_device_special_event_fixed WHERE bill_id='${bill_id}' AND Cust_id='${CustId}';`;
        }else{
            var deleteQuery = `DELETE FROM electric_device_special_event_tou WHERE bill_id='${bill_id}' AND Cust_id='${CustId}';`;
        }


        console.log( deleteQuery);


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










