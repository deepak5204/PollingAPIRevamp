const mongoose = require('mongoose');

const mongoDB_URI = process.env.MONGODB_URI;

mongoose.connect(mongoDB_URI)
.then(
    console.log('db connected successfully')
)
.catch((err)=>{
    console.log(err)
})