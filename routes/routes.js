const express = require("express");
var router = express.Router();
var userRegisterController = require("../controller/authentication/userRegisterController");
var userProfileController = require("../controller/user/userProfileController");
var unitChargesController = require("../controller/cebengineer/unitChargesController");
var monthlyBillCalculate = require("../controller/monthlyBill/monthlyBillCalculate");
var dashBoardController = require("../controller/dashboard/dashBoardController");
var deviceWiseUsageController = require("../controller/customer/deviceWiseUsageController");
var calculation = require("../controller/monthlyBill/calculation");
var deviceWiseController = require("../controller/monthlyBill/deviceWiseController");


var authService = require('../service/authServices');

const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// app.post('/sign-up', (req, res) => {
//     console.log(request.body);
//     res.send(request.body);
// })

//user register route
router.route("/sign-up").post(userRegisterController.createUser);

//user login route
router.route("/sign-in").post(userRegisterController.loginUser);

//forgot password route
router.route("/forgot-password").post(userRegisterController.checkEmail);

//reset password route
router.route("/reset-password/:eid").post(userRegisterController.resetPassword);

//user profile update route
router.route("/user-profile/:id").put(authService.validateToken, userProfileController.profileUpdate);

//user profile  route
router.route("/user-profile/:id").get(authService.validateToken, userProfileController.profileGetData);

//unit charges route
router.route("/unit-charges/:id").get(authService.validateToken, unitChargesController.getUnitChargesData);


//unit charges update route
router.route("/unit-charges-update/:id").post(authService.validateToken, unitChargesController.updateUnitChargesData);

//accepted unit charges update route
router.route("/accepted-unit-charges-update/:id").post(authService.validateToken, unitChargesController.acceptedUnitChargesUpdate);

//reject unit charges update admin route
router.route("/reject-unit-charges-update/:id").post(authService.validateToken, unitChargesController.rejectUnitChargesUpdate);


//add new ceb engineer route
router.route("/add-cebengineer").post(authService.validateToken, userRegisterController.addNewCebEngineer);

//get ceb engineer route
router.route("/manager-cebengineer").get(authService.validateToken, userRegisterController.getCebEngineer);

//remove ceb engineer route
router.route("/remove-cebengineer/:id").get(authService.validateToken, userRegisterController.removeCebEngineer);

//unit charges information route
router.route("/information/:id").get(unitChargesController.getUnitChargesData);

// //add device data
router.route("/add-device-main-bill/:id").post(authService.validateToken, monthlyBillCalculate.AddDeviceDataMain);

// //Update device data
router.route("/update-device-main-bill/:id").post(authService.validateToken, monthlyBillCalculate.updateDeviceDataMain);

// //delete device data
router.route("/delete-device-main-bill/:id").post(authService.validateToken, monthlyBillCalculate.deleteDeviceDataMain);

// get devices for bill whitch currently working in front end 
router.route("/get-device-main-bill/:id").post(authService.validateToken, monthlyBillCalculate.getDeviceDataMain);

//get dash board details
router.route("/dashboard-details/:id").get(authService.validateToken, dashBoardController.getDashboardData);

//get Bill id for front end
router.route("/get-bill-id/:id").get(authService.validateToken, monthlyBillCalculate.getBillId);

//calculate the main bill
router.route("/calculate-main-bill/:id").post(authService.validateToken, calculation.calculatedBillValue);

//get device details  
// router.route("/#").get(authService.validateToken, deviceWiseUsageController.getDeviceDetail);

//get special event device detail TOU
// router.route("#").post(authService.validateToken, spEventBillCalculateController.AddSpEventDeviceDataTOU);

//get special event device detail fixed
// router.route("#").post(authService.validateToken, spEventBillCalculateController.AddSpEventDeviceDataFixed);

//get device wise usage tou main
router.route("/get-device-wise-usage-tou-main/:id").post(authService.validateToken, deviceWiseController.getTouDeviceWise);


//calculate the main bill
router.route("/get-calculated-main-bill/:id").post(authService.validateToken, calculation.getcalculatedBillValue);

//get device wise usage fixed main
router.route("/get-device-wise-usage-fixed-main/:id").post(authService.validateToken, deviceWiseController.getFixedDeviceWise);


module.exports = router;
