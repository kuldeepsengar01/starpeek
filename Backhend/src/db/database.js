const mongoose=require('mongoose')

async function Connectdb(){
    await mongoose.connect(process.env.MONGO_URI);

    console.log('Connected to Database');
}

module.exports=Connectdb;