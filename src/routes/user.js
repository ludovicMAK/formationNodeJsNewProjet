const express = require('express');
const User = require('../models/user');
const router = new express.Router();

router.post('/users',async (req,res,next)=>{

    //console.log(req.body);
    const user = new User(req.body);
    try{
        const authToken = await user.generateAuthTokenAndSaveUser();
        res.status(201).send({user,authToken});
    }catch(e){
        res.status(400).send(e);
    }
    
   
});

router.get('/users',async(req,res,next)=>{
    try{
        const users = await User.find({});
        res.send(users);
    }catch(e){
        res.status(500).send(e)
    }
});

router.get('/users/:id',async(req,res,next)=>{
    const userId = req.params.id;
    try{
        const user = await User.findById(userId);
        if(!user) return res.status(404).send('User not found');
        res.send(user);
    }catch(e){
        res.status(500).send(e)
    }
});

router.patch('/users/:id',async(req,res,next)=>{
    const updateInfo = Object.keys(req.body);
    const userId = req.params.id;
    try{
        const user = await User.findById(userId);
        updateInfo.forEach(update =>user[update] = req.body[update]);
        await user.save();
        if(!user) return res.status(404).send('User not found');
        res.send(user);
    }catch(e){
        res.status(500).send(e)
    }
})

router.delete('/users/:id',async(req,res,next)=>{
    const userId = req.params.id;
    try{
        const user = await User.findByIdAndDelete(userId);
        if(!user) return res.status(404).send('User not found');
        res.send(user);
    }catch(e){
        res.status(500).send(e)
    }
})

router.post('/users/login', async (req,res)=>{
    try{
        
        const user = await User.findUser(req.body.email,req.body.password);
        const authToken = await user.generateAuthTokenAndSaveUser();
        res.send({user,authToken});
    }catch(e){
        res.status(400).send("probleme");
    }
})

module.exports = router