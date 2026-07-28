require('dotenv').config();
const app=require('./src/app');
const Connectdb=require('./src/db/database');

Connectdb();


app.listen(3000,()=>{
  console.log('Server run on port 3000');
})