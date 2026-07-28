const express = require("express");
const router = express.Router();

const userModel = require("../models/database.model");
const authmiddleware = require("../midleware/auth.middleware");


// Get User Profile

router.get("/user/profile", authmiddleware.usermiddleware, async(req,res)=>{

    try{

        const user = await userModel.findById(req.user._id)
        .select("-Password");


        if(!user){
            return res.status(404).json({
                message:"User not found"
            });
        }


        res.status(200).json({
            message:"User profile fetched successfully",
            user
        });


    }
    catch(err){

        res.status(500).json({
            message:err.message
        });

    }

});


module.exports = router;