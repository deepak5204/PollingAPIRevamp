const mongoose = require('mongoose');

const uri = 'mongodb://127.0.0.1:27017/test'

mongoose.connect(uri)
.then(
    console.log('db connected successfully')
)
.catch((err)=>{
    console.log(err)
})