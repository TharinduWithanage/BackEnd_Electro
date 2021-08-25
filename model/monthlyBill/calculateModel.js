var db = require('../../database/databaseConnection');


// get bill data for calculate bill value to compare each models

module.exports.getCalculatedValues = (BillId, CustId) => {

    return new Promise(async (resolve, reject) => {


        //console.log("Inside get bill id model function query"+ CustId);
        

        var selectQuery = `SELECT SUM(total_cost_TOU) AS TOU_bill_sum, SUM(total_units_fixed) AS TotalUnits 
        FROM electric_device_mplan
        Where Cust_id = ${CustId} AND bill_id=${BillId}; `;

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