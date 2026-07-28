const express=require('express');
const authroutes=require('../src/routes/auth.routes');
const foodroutes=require('../src/routes/food.routes');
const Foodrouter=require('../src/routes/foodpartner.route');
const userrouter=require('../src/routes/user.profile');
const cookieparser=require('cookie-parser');
const cors=require('cors');

const app=express();
app.use(express.json());
app.use(cookieparser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use('/api',authroutes);
app.use('/api',foodroutes);
app.use('/api',Foodrouter);
app.use('/api',userrouter);

module.exports=app;