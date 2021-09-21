var db = require('../../database/databaseConnection');


module.exports.getMonthlyBillPlans = (CustId) => {

    return new Promise(async (resolve, reject) => {


        var selectQuery = `SELECT LEAST(Total_cost_tou,Total_cost_fixed) AS total_cost, bill_id, Best_model FROM ebill_monthly_plan WHERE Cust_id = ${CustId}; `;

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

module.exports.deleteBillPlanFunc = (CustId, deleteData) => {
    return new Promise(async (resolve, reject) => {
        var bill_id = deleteData.bill_id;

        console.log("Inside get deleteBillPlanFunc function query"+ bill_id);
        console.log("Inside get deleteBillPlanFunc function query"+ CustId);

        var deleteQuery = `DELETE FROM ebill_monthly_plan WHERE bill_id='${bill_id}' AND Cust_id='${CustId}';`;

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

module.exports.deleteBillPlanDevices = (CustId, deleteData) => {
    return new Promise(async (resolve, reject) => {
        var bill_id = deleteData.bill_id;

        console.log("Inside get deleteBillPlanDevices function query"+ bill_id);
        console.log("Inside get deleteBillPlanDevices function query"+ CustId);

        var deleteQuery = `DELETE FROM electric_device_mplan WHERE bill_id='${bill_id}' AND Cust_id='${CustId}';`;

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

module.exports.deleteAllSug = (CustId, bill_id) => {
    return new Promise(async (resolve, reject) => {


        var deleteQuery = `DELETE FROM suggestions WHERE bill_id='${bill_id}' AND Cust_id='${CustId}';`;

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
