const express = require("express");
const multer = require("multer");
const FoodModel = require("../models/fooditem.model");
const authmiddleware = require("../midleware/auth.middleware");
const fodpartnerModel = require("../models/foodpartner");
//const storageservice = require("../services/food.service");
const storageservice=require('../services/cloudnery');

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

//create food items
router.post("/food/createfood",authmiddleware.foodpartnermidleware,upload.single("video"),async (req, res) =>{

      const fileresult = await storageservice.uploadVideo(req.file.buffer);
      
      const fooditems= await FoodModel.create({

        FoodName:req.body.FoodName,
        Discription:req.body.Discription,
        Image:fileresult.url,
        FoodPartner:req.Foodpartner._id,
      })

      res.status(201).json({
        message:"Food item created",
        fooditems
      })
});


//fatch food items

router.get("/food/fooditems", async (req, res) => {
  const fooditems = await FoodModel.find({});

  res.status(200).json({
    message: "Food items fetched successfully",
    fooditems,
  });
});




module.exports = router;