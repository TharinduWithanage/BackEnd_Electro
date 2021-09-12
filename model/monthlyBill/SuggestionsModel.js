var db = require('../../database/databaseConnection');

module.exports.getSuggestions = (billId, userId) => {
    return new Promise(async (resolve, reject) => {

        var selectDeviceWiseSuggestions = `SELECT * FROM suggestions WHERE Cust_id=${userId} AND bill_id=${billId};`;
        console.log(selectDeviceWiseSuggestions)

        db.query(selectDeviceWiseSuggestions, async function (error, result) {

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
