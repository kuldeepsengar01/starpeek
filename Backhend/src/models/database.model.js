const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    FullName:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        unique:true,
        required:true,
    },
    Address:{
        type:String,
        required:true
    },
    Contact:{
        type:Number,
        required:true,
    },
    Password:{
        type:String,
        required:true
    }
},
{
    timestamps:true
}
)

const userModel=mongoose.model('user',userSchema);

module.exports=userModel;