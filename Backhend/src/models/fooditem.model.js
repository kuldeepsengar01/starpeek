const mongoose=require('mongoose');

const foodSchema=new mongoose.Schema({
    FoodName:{
    type:String,
    required:true,
    },
    Video:{
        type:String,
        required:true
    },
    Discription:{
        type:String
    },
    FoodPartner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"FoodPartner",
    },
    likecount:{
        type:Number,
        default:0
    }
})

const FoodModel=mongoose.model("Fooditems",foodSchema);

module.exports=FoodModel;