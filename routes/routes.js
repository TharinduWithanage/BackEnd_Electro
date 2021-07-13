const express = require('express');
var router = express.Router();
var userRegisterController = require('../controller/authentication/userRegisterController');
var userProfileController = require('../controller/user/userProfileController');



const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// app.post('/sign-up', (req, res) => {
//     console.log(request.body);
//     res.send(request.body);
// })
//user register route
router.route('/sign-up')
    .post(userRegisterController.createUser);

router.route('/sign-in')
    .post(userRegisterController.loginUser);

//user profile update route
router.route('/user-profile')
    .put(userProfileController.profileUpdate);

module.exports = router;