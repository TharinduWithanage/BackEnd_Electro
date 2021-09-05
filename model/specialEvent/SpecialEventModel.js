var db = require('../../database/databaseConnection');

/**
 * Add device data to main bill plan
 * @param {*} devicedataTOU data of devices
 * @returns 
 */

module.exports.getSpecialEventBillDetail = (CustId,billId) => {
    return new Promise(async (resolve, reject) => {


        console.log("getSpecialEventDetailsFixed");
        console.log(billId);
        
        var selectQuery = `SELECT * FROM electric_device_special_event WHERE bill_id = ${billId} AND Cust_id = ${CustId}; `;

        //console.log("Inside get bill id model function query"+ selectQuery);


        db.query(selectQuery, async function (error, result) {

            if (error) {
                console.log(error);

                reject({ status: false, mesg: "error getting data" });
            } else {
                console.log("data is : "+result);
                resolve({ status: true,  data: result  });

            }

        });
    });

}

module.exports.getSpecialEventDetail = (CustId,billId,modelName) => {
    return new Promise(async (resolve, reject) => {


        if(modelName == "fixed"){
            var selectQuery = `SELECT appliance,quantity,total_units_fixed FROM electric_device_special_event_fixed WHERE bill_id = ${billId} AND Cust_id = ${CustId}; `;

    
            db.query(selectQuery, async function (error, result) {
    
                if (error) {
                    console.log(error);
    
                    reject({ status: false, mesg: "error getting data" });
                } else {
                    console.log("data is : "+result);
                    resolve({ status: true,  data: result  });
    
                }
    
            });
            
        }

        else if(modelName == "TOU"){
            var selectQuery = `SELECT appliance,quantity,cost_peak_time,cost_day_time,cost_off_peak_time,total_units,total_cost_TOU FROM electric_device_special_event_tou WHERE bill_id = ${billId} AND Cust_id = ${CustId}; `;

    
            db.query(selectQuery, async function (error, result) {
    
                if (error) {
                    console.log(error);
    
                    reject({ status: false, mesg: "error getting data" });
                } else {
                    console.log("data is : "+result);
                    resolve({ status: true,  data: result  });
    
                }
    
            });
            
        }

    });

}