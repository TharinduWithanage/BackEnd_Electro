const express = require("express");
var router = express.Router();
var userRegisterController = require("../controller/authentication/userRegisterController");
var userProfileController = require("../controller/user/userProfileController");
var unitChargesController = require("../controller/cebengineer/unitChargesController");
var monthlyBillCalculate = require("../controller/monthlyBill/monthlyBillCalculate");
var dashBoardController = require("../controller/dashboard/dashBoardController");
var deviceWiseUsageController = require("../controller/customer/deviceWiseUsageController");


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

//unit charges information route
router.route("/information/:id").get(unitChargesController.getUnitChargesData);

// //add device data
router.route("/add-device-main-bill/:id").post(authService.validateToken, monthlyBillCalculate.AddDeviceDataMain);

// //add device data
router.route("/update-device-main-bill/:id").post(authService.validateToken, monthlyBillCalculate.updateDeviceDataMain);


router.route("/get-device-main-bill/:id").post(authService.validateToken, monthlyBillCalculate.getDeviceDataMain);


//get dash board details
router.route("/dashboard-details").get(authService.validateToken, dashBoardController.getDashboardData);


router.route("/get-bill-id/:id").get(authService.validateToken, monthlyBillCalculate.getBillId);

//get device details
// router.route("/#").get(authService.validateToken, deviceWiseUsageController.getDeviceDetail);


module.exports = router;
