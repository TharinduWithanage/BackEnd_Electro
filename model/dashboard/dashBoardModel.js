var db = require('../../database/databaseConnection');



/**
 * get dashboard data
 * @returns dashboard data
 */
module.exports.getDashboardDataFun = () => {
    return new Promise(async (resolve, reject) => {

        // console.log(requestData);
        console.log("inside profileGetDataFunc");

        var selectQuery = `SELECT COUNT(Cust_id) as coustomer_count From customer; `;



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
