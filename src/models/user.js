const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User',{
    // name: {
    //     type:String,
    //     required:true
    // },
    // age:{
    //     type:Number,
    //     required:true,
    //     validate(c){
    //         if(v<0) throw new Error('Age doit être positif!')
    //     }
    // }
    email:{
        type:String,
        required:true,
        validate(v){
            if(!validator.isEmail(v)) throw new Error('Email non valide!');
        }
    },
    password:{
        type:String,
        required:true,
        validate(v){
            if(!validator.isLength(v,{min:4,max:20})) throw new Error('le mdp doit être entre 4 à 20 caractère');
        }
    }
});

module.exports = User;