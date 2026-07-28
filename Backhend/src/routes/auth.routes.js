const express = require('express');
const router = express.Router();
const multer = require("multer");
const userModel = require('../models/database.model');
const Foodpartnermodel = require('../models/foodpartner');
const uploadImage = require('../services/cloudnery');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const upload = multer({
  storage: multer.memoryStorage(),
});

// USER APIS

// Register
router.post("/user/register", async (req, res) => {
    const { FullName, Email, Address,Contact, Password } = req.body;

    const isUserAlreadyExist = await userModel.findOne({ Email });

    if (isUserAlreadyExist) {
        return res.status(400).json({
            message: "User Already Exists"
        });
    }

    const hashPassword = await bcrypt.hash(Password, 10);

    const user = await userModel.create({
        FullName,
        Email,
        Address,
        Contact,
        Password: hashPassword
    });

    const token = jwt.sign(
        {
            _id: user._id,
        },
        process.env.JWT_SECRET
    );

    res.cookie("token", token);

    res.status(201).json({
        message: "User registered successfully",
        user: {
            _id: user._id,
            FullName: user.FullName,
            Email: user.Email,
            Address:user.Address,
            Contact:user.Contact
        }
    });
});

// Login
router.post("/user/login", async (req, res) => {
    const { Email, Password } = req.body;

    const user = await userModel.findOne({ Email });

    if (!user) {
        return res.status(400).json({
            message: "Invalid Email or Password"
        });
    }


    const isPasswordValid = await bcrypt.compare(
        Password,
        user.Password
    );

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid Email or Password"
        });
    }

    const token = jwt.sign(
        {
            _id: user._id,
        },
        process.env.JWT_SECRET
    );

    res.cookie("token", token);

    res.status(200).json({
        message: "User Login Successfully",
        user: {
            _id: user._id,
            FullName: user.FullName,
            Email: user.Email
        }
    });
});

// Logout
router.get("/user/logout", (req, res) => {
    res.clearCookie("token");

    res.status(200).json({
        message: "User Logout Successfully"
    });
});

//  FOOD PARTNER APIS

// Register
router.post(
  "/foodpartner/register",
  upload.fields([
    { name: "ProfileImage", maxCount: 1 },
    { name: "BannerImage", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const {
        BusinessName,
        FullName,
        Email,
        Address,
        Contact,
        Password,
      } = req.body;

      // Check user exists
      const isFoodPartnerExist = await Foodpartnermodel.findOne({
        Email,
      });

      if (isFoodPartnerExist) {
        return res.status(400).json({
          message: "Food Partner Already Exists",
        });
      }

      // Check images
      if (
        !req.files ||
        !req.files.ProfileImage ||
        !req.files.BannerImage
      ) {
        return res.status(400).json({
          message: "ProfileImage and BannerImage are required",
        });
      }

      // Upload Images
      const profileImageResult = await uploadImage.uploadImage(
        req.files.ProfileImage[0].buffer
      );

      const bannerImageResult = await uploadImage.uploadImage(
        req.files.BannerImage[0].buffer
      );

      // Hash Password
      const hashPassword = await bcrypt.hash(Password, 10);

      // Create Food Partner
      const foodpartner = await Foodpartnermodel.create({
        BusinessName,
        FullName,
        Email,
        Address,
        Contact,
        ProfileImage: profileImageResult.url,
        BannerImage: bannerImageResult.url,
        Password: hashPassword,
      });

      // Generate Token
      const token = jwt.sign(
        {
          _id: foodpartner._id,
        },
        process.env.JWT_SECRET
      );

      res.cookie("token", token, {
        httpOnly: true,
      });

      res.status(201).json({
        success: true,
        message: "Food Partner Registered Successfully",
        foodpartner: {
          _id: foodpartner._id,
          BusinessName: foodpartner.BusinessName,
          FullName: foodpartner.FullName,
          Email: foodpartner.Email,
          Address: foodpartner.Address,
          Contact: foodpartner.Contact,
          ProfileImage: foodpartner.ProfileImage,
          BannerImage: foodpartner.BannerImage,
        },
      });
    } catch (err) {
      console.log(err);

      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
);

// Login
router.post("/foodpartner/login", async (req, res) => {

    const { Email, Password } = req.body;

    const foodpartner = await Foodpartnermodel.findOne({
        Email,
    });

    if (!foodpartner) {
        return res.status(400).json({
            message: "Invalid Email or Password"
        });
    }

    const isCheckPassword = await bcrypt.compare(
        Password,
        foodpartner.Password
    );

    if (!isCheckPassword) {
        return res.status(400).json({
            message: "Invalid Email or Password"
        });
    }

    const token = jwt.sign(
        {
            _id: foodpartner._id,
        },
        process.env.JWT_SECRET
    );

    res.cookie("token", token);

    res.status(200).json({
        message: "Food Partner Login Successfully",
        foodpartner: {
            _id: foodpartner._id,
            FullName: foodpartner.FullName,
            Email: foodpartner.Email
        }
    });
});

// Logout
router.get("/foodpartner/logout", (req, res) => {

    res.clearCookie("token");

    res.status(200).json({
        message: "Food Partner Logout Successfully"
    });
});

module.exports = router;