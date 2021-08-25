var db = require('../../database/databaseConnection');



/**
 * get count of unit charges update request and customers
 * @returns dashboard data
 */
module.exports.empDashboardDataFun = () => {
    return new Promise(async (resolve, reject) => {

        // console.log(requestData);
        console.log("inside getReqCountFun");

        var selectQuery = `SELECT SUM(Update_ucharge_status + Update_fcharge_status) AS request_count FROM tou_ucharge;`;
        var selectQuery1 = `SELECT SUM(Update_ucharge_status + Update_fcharge_status) AS request_count FROM fixed_ucharge;`;
        var selectQuery2 = `SELECT COUNT(Cust_id) AS user_count FROM customer;`;

        db.query(selectQuery, async function (error, result1) {

            if (error) {
                console.log(error);

                reject({ status: false, mesg: "error getting data" });
            } else {
                db.query(selectQuery1, async function (error, result2) {

                    if (error) {
                        console.log(error);

                        reject({ status: false, mesg: "error getting data" });
                    } else {

                        db.query(selectQuery2, async function (error, result3) {

                            if (error) {
                                console.log(error);

                                reject({ status: false, mesg: "error getting data" });
                            } else {
                                var result = { result1, result2, result3 }
                                resolve({ status: true, data: result });
                            }

                        });
                    }

                });


            }

        });
    });

}

/**
 * 
 * @returns customer dashboard data
 */
module.exports.custDashboardDataCountFun = (Cust_id) => {
    return new Promise(async (resolve, reject) => {

        // console.log(requestData);
        console.log("inside getReqCountFun");

        var selectQuery = `SELECT COUNT(bill_id) AS normalBill_count FROM ebill_monthly_plan WHERE Cust_id=${Cust_id};`;
        var selectQuery1 = `SELECT COUNT(bill_id) AS specialBill_count FROM ebill_specialevent WHERE Cust_id=${Cust_id};`;

        db.query(selectQuery, async function (error, result1) {

            if (error) {
                console.log(error);

                reject({ status: false, mesg: "error getting data" });
            } else {
                db.query(selectQuery1, async function (error, result2) {

                    if (error) {
                        console.log(error);

                        reject({ status: false, mesg: "error getting data" });
                    } else {

                        var result = { result1, result2 }
                        resolve({ status: true, data: result });
                    }

                });


            }

        });
    });

}