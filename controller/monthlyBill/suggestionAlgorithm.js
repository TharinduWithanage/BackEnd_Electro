// We don’t run the algorithm, if the priority is “high” peak =4 , day = 13 , off_peak =7
// If (priority != high) {
// 	// Get the saving amount when the device transfer from peak to Offpeak
// 	If (Using_hours_Peak > 0 && (7 - Using_hours_Off_peak  > 0)) {
// 		If  (7 - Using_hours_Off_peak  >= Using_hours_Peak) {
// 			Float can_change_time = Using_hours_Peak
// 			Float Saving_amount_Switch_offPeak = 
// PeaktoOffpeak(Using_hours_Peak, peak_cost);

// 		} else {
// Float can_change_time = 7 - Using_hours_Peak
// Float Saving_amount_Switch_offPeak = 
// PeaktoOffpeak( 7 - Using_hours_Peak , peak_cost );

// }

// Add new suggestion to Database {
// 	Current_time = “peak”;   
// Change_time = “off peak”;
// Change_time = can_change_time;
// Saving_cost = Saving_amount_Switch_offPeak;
// }
		
// }

// If (Using_hours_Peak > 0 && (13 - Using_hours_Day  > 0)) {
// 		If  (13 - Using_hours_Day  >= Using_hours_Peak){
// 			Float can_change_time = Using_hours_Peak
// 			Float Saving_amount_Switch_day = 
// PeaktoOffpeak(Using_hours_Peak, peak_cost);

// 		} else {
// 			Float can_change_time = 13 - Using_hours_Peak
// Float Saving_amount_Switch_day = 
// PeaktoOffpeak( 13 - Using_hours_Peak , peak_cost );
// }

// Add new suggestion to Database {
// 	Current_time = “peak”;   
// Change_time = “day”;
// Change_time = can_change_time;
// Saving_cost = Saving_amount_Switch_offPeak;
// }
// }


// If (Using_hours_Day > 0 && (7 - Using_hours_Off_peak  > 0)) {
// 		If  (7 - Using_hours_Off_peak  >= Using_hours_Day){
// 			Float can_change_time = Using_hours_Day
// 			Float Saving_amount_Switch_offPeak = 
// PeaktoOffpeak(Using_hours_Day, peak_cost);

// 		} else {
// 			Float can_change_time = 7 - Using_hours_Day
// Float Saving_amount_Switch_offPeak = 
// PeaktoOffpeak( 7 - Using_hours_Day, peak_cost );

// }

// Add new suggestion to Database {
// 	Current_time = “peak”;   
// Change_time = “off peak”;
// Change_time = can_change_time;
// Saving_cost = Saving_amount_Switch_offPeak;
// }
		
// }

// }
