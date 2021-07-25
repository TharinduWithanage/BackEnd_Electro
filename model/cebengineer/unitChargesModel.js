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
            var selectQuery = `SELECT * From fixed_ucharge WHERE NOT Unit_category="31-60" AND NOT Unit_category="0-30"`;

        } else {
            if (id == "all") {
                var selectQuery = `SELECT * From fixed_ucharge;`;
                var selectQuery1 = `SELECT * From tou_ucharge;`;


            }
            else {
                var selectQuery = `SELECT * From fixed_ucharge WHERE Unit_category="31-60" OR Unit_category="0-30";`;

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
                    // console.log(result1);
                    db.query(selectQuery1, async function (error, result2) {

                        if (error) {
                            console.log(error);

                            reject({ status: false, mesg: "error getting data" });
                        } else {
                            // console.log(result2);
                            var result = { result1, result2 };
                            // console.log(result[0]);

                            resolve({ status: true, data: result });

                        }

                    });

                }

            });

        }

    });

}