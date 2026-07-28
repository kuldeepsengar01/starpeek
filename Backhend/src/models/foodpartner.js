const mongoose=require('mongoose');

const foodpartener=new mongoose.Schema({
    BusinessName:{
        type:String,
        required:true,
    },
    FullName:{
        type:String,
        required:true
    },

    Email:{
        type:String,
        required:true,
        unique:true,
    },
    Address:{
        type:String,
        required:true
    },
    Contact:{
        type:String,
        required:true,
    },
    BannerImage:{
        type:String,
        required:true 
    },
    ProfileImage:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true,
    },
})

const Foodpartnermodel=mongoose.model('FoodPartner',foodpartener);

module.exports=Foodpartnermodel;