const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
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
        unique:true,
        trim:true,
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
})

userSchema.statics.findUser = async(email,password)=>{
    const user = await User.findOne({email});
   
    if(!user) throw new Error('Erreur, pas possible de se connecter');
    const isPasswordValide = await bcrypt.compare(password,user.password);
    if(!isPasswordValide) throw new Error('Erreur, pas possible de se connecter');
    return user;
}

userSchema.pre('save', async function(){
    if (this.isModified('password')) this.password = await bcrypt.hash(this.password,8);
})
const User = mongoose.model('User',userSchema);

module.exports = User;