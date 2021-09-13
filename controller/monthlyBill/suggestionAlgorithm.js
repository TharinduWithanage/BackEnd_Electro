var commonResponseService = require("../../service/responseService");
var suggestionModel = require("../../model/monthlyBill/suggestionModel");
var unitChargesModel = require('../../model/cebengineer/unitChargesModel');

function suggestion() {
  const obj = {};
  obj.appliance = "";
  obj.priority = "";
  obj.quantity = 0;
  obj.cur_time = "";
  obj.change_time = "";
  obj.can_change_minutes_per_day = 0;
  obj.save_amount = 0.0;
  obj.Cust_id = 0;
  obj.bill_id = 0;
  obj.device_id = 0;
  return obj;
}

function getNoOfUnits(power, minutes, quantity){

    var numOfUnits = quantity* power * minutes * 60 * 30 / 3600000;
    return numOfUnits;
}

function getSavingAmount(units, curr_time_unit_cost, change_time_unit_cost){
    var saving_amount = parseFloat(units*curr_time_unit_cost) - parseFloat(units*change_time_unit_cost);
    return parseFloat(saving_amount);
}


async function makeSuggestions(devicedata, id) {
  try {
    const newSug = suggestion();

    var can_change_time;
    var can_change_unit;
    var DeviceId = await suggestionModel.getDeviceId(devicedata.bill_id ,id);
    var UnitPrice = await unitChargesModel.getUnitChargesDataFun("tou");
    // console.log("device id get from database", DeviceId.data);


    newSug.bill_id = devicedata.bill_id;
    newSug.appliance = devicedata.appliance;
    newSug.quantity = devicedata.quantity;
    newSug.priority = devicedata.priority;
    newSug.device_id = DeviceId.data[0].device_id;
    newSug.Cust_id = id;

    var using_minutes_peak_time = devicedata.using_minutes_peak_time
    var using_minutes_off_peak_time = devicedata.using_minutes_off_peak_time
    var using_minutes_day_time = devicedata.using_minutes_day_time


    

    var DayUnitCost = UnitPrice.data[0].Unit_charge;
    var OffPeakUnitCost = UnitPrice.data[1].Unit_charge;
    var PeakUnitCost = UnitPrice.data[2].Unit_charge;

   
// We don’t run the algorithm, if the priority is “high” peak = 240 , day = 780 , off_peak = 420
    if (devicedata.priority != "high") {

      // Get the saving amount when the device transfer from peak to Offpeak
      if (using_minutes_peak_time > 0 && (420 - using_minutes_off_peak_time) > 0) {

        if ( (420 - using_minutes_off_peak_time) >= using_minutes_peak_time) {

          can_change_time = using_minutes_peak_time;
          can_change_unit = getNoOfUnits( devicedata.power, can_change_time, devicedata.quantity);
          var Saving_amount_Switch_offPeak = getSavingAmount(can_change_unit, PeakUnitCost, OffPeakUnitCost);

        } else {

          can_change_time = 420 - using_minutes_off_peak_time;
          can_change_unit = getNoOfUnits( devicedata.power, can_change_time, devicedata.quantity);
          var Saving_amount_Switch_offPeak = getSavingAmount( can_change_unit, PeakUnitCost, OffPeakUnitCost);

        }

        newSug.cur_time = "peak";
        newSug.change_time = "off peak";
        newSug.can_change_minutes_per_day = can_change_time;
        newSug.save_amount = parseFloat(Saving_amount_Switch_offPeak);

        //add to suggestion to database
        suggestionModel.addSuggestion(newSug);

        
      }

      if (using_minutes_peak_time > 0 && 780 - using_minutes_day_time > 0) {
        if (780 - using_minutes_day_time >= using_minutes_peak_time) {

          can_change_time = using_minutes_peak_time;
          can_change_unit = getNoOfUnits( devicedata.power, can_change_time, devicedata.quantity);
          var Saving_amount_Switch_day = getSavingAmount(can_change_unit, PeakUnitCost, DayUnitCost);

        } else {

          can_change_time = 780 - using_minutes_day_time;
          can_change_unit = getNoOfUnits( devicedata.power, can_change_time, devicedata.quantity);
          var Saving_amount_Switch_day = getSavingAmount(can_change_unit, PeakUnitCost, DayUnitCost);

        }

        newSug.cur_time = "peak";
        newSug.change_time = "day";
        newSug.can_change_minutes_per_day = can_change_time;
        newSug.save_amount = parseFloat(Saving_amount_Switch_day);

        //add to suggestion to database
        suggestionModel.addSuggestion(newSug);

      }

      if (using_minutes_day_time > 0 && 420 - using_minutes_off_peak_time > 0) {
        if (420 - using_minutes_off_peak_time >= using_minutes_day_time) {

          can_change_time = using_minutes_day_time;
          can_change_unit = getNoOfUnits( devicedata.power, can_change_time, devicedata.quantity);
          var Saving_amount_Switch_offPeak = getSavingAmount(can_change_unit, DayUnitCost, OffPeakUnitCost);

        } else {

          can_change_time = 420 - using_minutes_off_peak_time;
          can_change_unit = getNoOfUnits( devicedata.power, can_change_time, devicedata.quantity);
          var Saving_amount_Switch_offPeak = getSavingAmount(can_change_unit , DayUnitCost, OffPeakUnitCost);

        }

        newSug.cur_time = "day";
        newSug.change_time = "off peak";
        newSug.can_change_minutes_per_day = can_change_time;
        newSug.save_amount = parseFloat(Saving_amount_Switch_offPeak);

        //add to suggestion to database
        suggestionModel.addSuggestion(newSug);
  
      }
    }


  } catch (error) {
    console.log(error);
  }
}

module.exports = { makeSuggestions };
