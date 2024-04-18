const express = require('express');

const router = express.Router()
const { getDoctorInfoController, updateProfileController} = require("../controllers/doctorCtrl");
const authMiddleware = require('../middlewares/authMiddleware')


//post single doc info
router.post("/getDoctorInfo", authMiddleware , getDoctorInfoController)

//post update profile
router.post("/updateProfile", authMiddleware , updateProfileController)




module.exports = router;