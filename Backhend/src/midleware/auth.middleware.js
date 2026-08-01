const Foodpartnermodel = require('../models/foodpartner');
const userModel=require('../models/database.model')
const jwt = require('jsonwebtoken');

async function foodpartnermidleware(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Please Login first"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const Foodpartner = await Foodpartnermodel.findById(decoded._id);

        if (!Foodpartner) {
            return res.status(404).json({
                message: "Food Partner not found"
            });
        }

        req.Foodpartner = Foodpartner;

        next();

    } catch (err) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
}

async function usermiddleware(req,res,next){

    const token=req.cookies.token

    if(!token){
        res.status(401).json({
            message:"please login first"
        })
    }
    try{
  
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user=await userModel.findById(decoded._id);
        if(!user){
            return res.status(404).json({
                message:"User not found"
            })
        }
        req.user=user;
        next();
    }catch(err){
        return res.status(401).json({
            message:"Invalid token"
        })
    }


}



module.exports = {
    foodpartnermidleware,
    usermiddleware
};