const express = require("express");
const router = express.Router();
const authmiddleware = require("../midleware/auth.middleware");
const likeModel = require("../models/like.model");
const SaveModel = require("../models/save.model");
const userModel = require("../models/database.model");
const FoodPartnerModel = require("../models/foodpartner");
const FoodModel = require("../models/fooditem.model");

// Get Food Partner Profile + Uploaded Videos
router.get("/foodpartner/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find Food Partner
    const partner = await FoodPartnerModel.findById(id);

    if (!partner) {
      return res.status(404).json({
        success: false,
        message: "Food Partner not found",
      });
    }

    // Find all uploaded videos of this partner
    const foods = await FoodModel.find({
      FoodPartner: id,
    }).sort({ _id: -1 });

    return res.status(200).json({
      success: true,
      foodpartner: partner,
      foods,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
});

router.post('/food/like',authmiddleware.usermiddleware,async(req,res)=>{
  const {foodId}=req.body;
  const user=req.user;

  const isAlreadyLiked=await likeModel.findOne({user:user._id,food:foodId});

  if(isAlreadyLiked){
    await likeModel.deleteOne({user:user._id,food:foodId});

    await FoodModel.findByIdAndUpdate(foodId,{
      $inc:{likecount:-1}
    })
    return res.status(200).json({
      message:"Food unliked successfully"
    })
  }

  const like=await likeModel.create({
    user:user._id,
    food:foodId
  })

  await FoodModel.findByIdAndUpdate(foodId,{
    $inc:{likecount:1}
  })
  return res.status(200).json({
    message:"Food liked successfully",
    like
  })

});

router.post('/food/save',authmiddleware.usermiddleware,async(req,res)=>{
  const {foodId}=req.body;
  const user=req.user;  

  const isAlreadySaved=await SaveModel.findOne({user:user._id,food:foodId});

  if(isAlreadySaved){
    await SaveModel.deleteOne({user:user._id,food:foodId});

    return res.status(200).json({
      message:"Food unsaved successfully"
    })
  } 

  const save=await SaveModel.create({
    user:user._id,
    food:foodId
  })

  return res.status(200).json({
    message:"Food saved successfully",
    save
  })

});

module.exports = router;