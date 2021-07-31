var db = require('../../database/databaseConnection');


/**
 * unit charge 
 * @param {*} requestData request body data
 * @returns 
 */
module.exports.getUnitChargesDataFun = (id) => {
    return new Promise(async (resolve, reject) => {

        console.log(id);
        console.log("inside getUnitChargesData");

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
                else {
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
                    console.log(result);

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
                            console.log(" this is result:", result.result1);
                            console.log(" end this is result:");

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

        if (id == "normal") {
            if (categoryName == "Unit") {
                console.log("inside normal Unit charges");
                var updateQuery = `UPDATE fixed_ucharge SET Unit_charge ='${newPrice}' WHERE Unit_category='${unitPeriod}';`;

            } else {
                console.log("inside normal Fixed charges");
                var updateQuery = `UPDATE fixed_ucharge SET Fixed_charge ='${newPrice}' WHERE Unit_category='${unitPeriod}';`;


            }
        } else {
            if (categoryName == "Unit") {
                console.log("inside tou Unit charges");
                var updateQuery = `UPDATE tou_ucharge SET Unit_charge ='${newPrice}' WHERE Time_category='${timePeriod}';`;

            } else {
                console.log("inside tou Fixed charges");
                var updateQuery = `UPDATE tou_ucharge SET Fixed_charge ='${newPrice}' WHERE Time_category='${timePeriod}';`;


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