require('dotenv').config();
const app=require('./src/app');
const Connectdb=require('./src/db/database');
const PORT=process.env.PORT || 3000;

Connectdb();


app.listen(PORT,()=>{
  console.log('Server run on port 3000');
})