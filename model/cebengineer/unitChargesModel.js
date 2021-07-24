var db = require('../../database/databaseConnection');


/**
 * unit charge 
 * @param {*} requestData request body data
 * @returns 
 */
module.exports.getUnitChargesDataFun = (id) => {
    return new Promise(async (resolve, reject) => {

        // console.log(requestData);
        console.log("inside getUnitChargesData");


        var selectQuery = `SELECT * From fixed_ucharge WHERE Unit_category="31-60" OR Unit_category="0-30";`;



        db.query(selectQuery, async function (error, result) {

            if (error) {
                console.log(error);

                reject({ status: false, mesg: "error getting data" });
            } else {
                // console.log(result);

                resolve({ status: true, data: result });

            }

        });
    });

}