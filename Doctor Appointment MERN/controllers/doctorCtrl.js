const doctorModel = require('../models/doctorModel')

const getDoctorInfoController = async(req , res) => {
    try{
        const doctor = await doctorModel.findOne({userId: req.body.userId})
        res.status(200).send({
            success: true,
            message: "doctor data fetch success",
            data: doctor,
        });
}catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message: 'Error in Fetching Doctor details'

        })
    }

};

//update the doctors list controller
const updateProfileController = async(req,res)=>{
    try{
        const doctor = await doctorModel.findOneAndUpdate(
        {userId:req.body.userId},
        req.body
        );
        res.status(201).send({
            success:true,
            message: 'Doctor Profile Updated',
            data: doctor,

        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message: 'Doctor Profile Update issue'

        })
    }
};

module.exports = { getDoctorInfoController , updateProfileController };