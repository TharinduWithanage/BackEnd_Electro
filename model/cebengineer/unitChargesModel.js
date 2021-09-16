var db = require('../../database/databaseConnection');


/**
 * unit charge 
 * @param {*} requestData request body data
 * @returns 
 */
module.exports.getUnitChargesDataFun = (id) => {
    return new Promise(async (resolve, reject) => {

        //console.log(id);
        //console.log("inside getUnitChargesData");

        if (id == "60+") {
            var selectQuery = `SELECT * From fixed_ucharge WHERE NOT Unit_category="31-60" AND NOT Unit_category="00-30";`;

        } else {
            if (id == "all") {
                var selectQuery = `SELECT * From fixed_ucharge;`;
                var selectQuery1 = `SELECT * From tou_ucharge;`;


            } else {
                if (id == "tou") {
                    var selectQuery = `SELECT * From tou_ucharge;`;

                }
                else if (id == "fixed_") {
                    var selectQuery = `SELECT * From fixed_ucharge;`;

                } else {
                    var selectQuery = `SELECT * From fixed_ucharge WHERE Unit_category="31-60" OR Unit_category="00-30";`;
                }
            }
        }




        if (id != "all") {
            db.query(selectQuery, async function (error, result) {

                if (error) {
                    console.log(error);

                    reject({ status: false, mesg: "error getting data" });
                } else {
                    //console.log(result);

                    resolve({ status: true, data: result });

                }

            });
        } else {

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

                            var result = { result1, result2 };
                            //console.log(" this is result:", result.result1);
                            //console.log(" end this is result:");

                            resolve({ status: true, data: result });

                        }

                    });

                }

            });

        }

    });

}


/**
 * unit charges update
 * @param {*} requestData request body data
 * @returns 
 */
module.exports.updateUnitChargesDataFun = (requestData, id) => {
    return new Promise(async (resolve, reject) => {


        console.log("inside updateUnitChargesDataFun");
        // var id = requestData.id;
        var newPrice = requestData.newPrice;
        var categoryName = requestData.categoryName;
        var timePeriod = requestData.timePeriod;
        var unitPeriod = requestData.unitPeriod;
        var today = new Date();
        var requestedDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        if (id == "normal") {
            if (categoryName == "Unit") {
                console.log("inside normal Unit charges");
                var updateQuery = `UPDATE fixed_ucharge SET Update_unit_charges ='${newPrice}',Update_ucharge_status='1',Unit_charges_requested_date='${requestedDate}' WHERE Unit_category='${unitPeriod}';`;

            } else {
                console.log("inside normal Fixed charges");
                var updateQuery = `UPDATE fixed_ucharge SET Update_fixed_charges ='${newPrice}',Update_fcharge_status='1',Fixed_charges_requested_date='${requestedDate}' WHERE Unit_category='${unitPeriod}';`;


            }
        } else {
            if (categoryName == "Unit") {
                console.log("inside tou Unit charges");
                var updateQuery = `UPDATE tou_ucharge SET Update_unit_charges ='${newPrice}',Update_ucharge_status='1',Unit_charges_requested_date='${requestedDate}' WHERE Time_category='${timePeriod}';`;

            } else {
                console.log("inside tou Fixed charges");
                var updateQuery = `UPDATE tou_ucharge SET Update_fixed_charges ='${newPrice}',Update_fcharge_status='1',Fixed_charges_requested_date='${requestedDate}' WHERE Time_category='${timePeriod}';`;


            }
        }



        db.query(updateQuery, async function (err, result) {

            if (err) {
                console.log(err);

                reject({ status: false, mesg: "error updating user" });
            } else {
                console.log("updated successfully11")
                resolve({ status: true, mesg: "updated successfully" });



                // resolve({ status: false, mesg: "user updated sucessfully" });

            }

        });
    });

}


/**
 * unit charges update
 * @param {*} requestData request body data
 * @returns 
 */
module.exports.acceptedUnitChargesUpdateFun = (requestData, id) => {
    return new Promise(async (resolve, reject) => {


        console.log("inside acceptedUnitChargesUpdateFun");
        // var id = requestData.id;
        var newPrice = requestData.newPrice;
        var categoryName = requestData.categoryName;
        var timePeriod = requestData.timePeriod;
        var unitPeriod = requestData.unitPeriod;
        var today = new Date();
        var acceptDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        if (id == "normal") {
            if (categoryName == "Unit") {
                console.log("inside normal Unit charges");

                var updateQuery = `UPDATE fixed_ucharge SET Unit_charge ='${newPrice}',Update_ucharge_status='0',Unit_charges_accepted_date='${acceptDate}' WHERE Unit_category='${unitPeriod}' AND Update_ucharge_status=1;`;

            } else {
                console.log("inside normal Fixed charges");
                var updateQuery = `UPDATE fixed_ucharge SET Fixed_charge ='${newPrice}',Update_fcharge_status='0',Fixed_charges_accepted_date='${acceptDate}' WHERE Unit_category='${unitPeriod}' AND Update_fcharge_status=1;`;


            }
        } else {
            if (categoryName == "Unit") {
                console.log("inside tou Unit charges");
                var updateQuery = `UPDATE tou_ucharge SET Unit_charge ='${newPrice}',Update_ucharge_status='0',Unit_charges_accepted_date='${acceptDate}' WHERE Time_category='${timePeriod}' AND Update_ucharge_status=1 ;`;

            } else {
                console.log("inside tou Fixed charges");
                var updateQuery = `UPDATE tou_ucharge SET Fixed_charge ='${newPrice}',Update_fcharge_status='0',Fixed_charges_accepted_date='${acceptDate}' WHERE Time_category='${timePeriod}' AND Update_fcharge_status=1;`;


            }
        }



        db.query(updateQuery, async function (err, result) {

            if (err) {
                console.log(err);

                reject({ status: false, mesg: "error updating user" });
            } else {
                console.log("updated successfully11")
                resolve({ status: true, mesg: "updated successfully" });



                // resolve({ status: false, mesg: "user updated sucessfully" });

            }

        });
    });

}

/**
 * reject unit charges update admin model
 * @param {*} requestData 
 * @param {*} id 
 * @returns 
 */
module.exports.rejectUnitChargesUpdateFun = (requestData, id) => {
    return new Promise(async (resolve, reject) => {


        console.log("inside rejectUnitChargesUpdateFun");
        // var id = requestData.id;
        // var newPrice = requestData.newPrice;
        var categoryName = requestData.categoryName;
        var timePeriod = requestData.timePeriod;
        var unitPeriod = requestData.unitPeriod;

        if (id == "normal") {
            if (categoryName == "Unit") {
                // console.log("inside normal Unit charges");

                var updateQuery = `UPDATE fixed_ucharge SET Update_ucharge_status='0' WHERE Unit_category='${unitPeriod}' AND Update_ucharge_status=1;`;

            } else {
                // console.log("inside normal Fixed charges");
                var updateQuery = `UPDATE fixed_ucharge SET Update_fcharge_status='0' WHERE Unit_category='${unitPeriod}' AND Update_fcharge_status=1;`;


            }
        } else {
            if (categoryName == "Unit") {
                // console.log("inside tou Unit charges");
                var updateQuery = `UPDATE tou_ucharge SET Update_ucharge_status='0' WHERE Time_category='${timePeriod}' AND Update_ucharge_status=1 ;`;

            } else {
                // console.log("inside tou Fixed charges");
                var updateQuery = `UPDATE tou_ucharge SET Update_fcharge_status='0' WHERE Time_category='${timePeriod}' AND Update_fcharge_status=1;`;


            }
        }



        db.query(updateQuery, async function (err, result) {

            if (err) {
                console.log(err);

                reject({ status: false, mesg: "error updating user" });
            } else {
                // console.log("updated successfully11")
                resolve({ status: true, mesg: "updated successfully" });



                // resolve({ status: false, mesg: "user updated sucessfully" });

            }

        });
    });

}