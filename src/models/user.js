const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt  = require('jsonwebtoken');

// request > verify authentication >route

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
            if(!validator.isLength(v,{min:4})) throw new Error('le mdp doit être entre 4 à 20 caractère');
        }
    }
    ,
    authTokens:[{
        authToken:{
            type:String,
            required:true
        }
    }]
})




userSchema.statics.findUser = async(email,password)=>{
    const user = await User.findOne({email});
   
    if(!user) throw new Error('Erreur, pas possible de se connecter');
    const isPasswordValide = await bcrypt.compare(password,user.password);
    if(!isPasswordValide) throw new Error('Erreur, pas possible de se connecter');
    return user;
}

userSchema.methods.generateAuthTokenAndSaveUser = async function()
{
    const authToken = jwt.sign({ _id: this._id.toString() },'foo');
    this.authTokens.push({authToken});
    await this.save();
    return authToken;

}

userSchema.pre('save', async function(){
    if (this.isModified('password')) this.password = await bcrypt.hash(this.password,8);
})
const User = mongoose.model('User',userSchema);

module.exports = User;