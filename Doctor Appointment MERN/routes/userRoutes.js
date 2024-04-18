const express = require('express');
const { loginController, registerController, authController ,applyDoctorController , getAllNotificationController , deleteAllNotificationController} = require('../controllers/userCtrl');
const authMiddleware = require('../middlewares/authMiddleware');

//router onject
const router = express.Router()

//routes

//LOGIN || POST
router.post('/login', loginController);

//Register || POST
router.post('/register', registerController);

//Auth || POST
router.post('/getUserData' , authMiddleware , authController);
module.exports = router;

//User applying to be doctor || POST
router.post("/apply-doctor", authMiddleware , applyDoctorController);
module.exports = router;

//get all notifications
router.post("/get-all-notification" , authMiddleware , getAllNotificationController);
module.exports = router;

//delete all notifications
router.post("/delete-all-notification" , authMiddleware , deleteAllNotificationController);
module.exports = router;