const mongoose = require('mongoose');

const schema = mongoose.Schema({
    username:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true
    },
    password:{
        type:String,
        trim:true,
        required:true
    }
});

const Schema = mongoose.model('Schema',schema);

module.exports=Schema;