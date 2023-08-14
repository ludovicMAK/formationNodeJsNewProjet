const express = require('express');
const User = require('../models/user');
const router = new express.Router();
const authentification = require('../middlewares/authentification');

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

// router.get('/users',authentification,async(req,res,next)=>{
//     try{
//         const users = await User.find({});
//         res.send(users);
//     }catch(e){
//         res.status(500).send(e)
//     }
// });

router.get('/users/me',authentification,async(req,res,next)=>{
    res.send(req.user);
});

// router.get('/users/:id',async(req,res,next)=>{
//     const userId = req.params.id;
//     try{
//         const user = await User.findById(userId);
//         if(!user) return res.status(404).send('User not found');
//         res.send(user);
//     }catch(e){
//         res.status(500).send(e)
//     }
// });

router.patch('/users/me',authentification,async(req,res,next)=>{
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

router.delete('/users/me',authentification,async(req,res,next)=>{
    
    try{
        await req.user.remove();
        res.send(req.user);
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
});

router.post('/users/logout',authentification ,async (req,res)=>{
    try{
        req.user.authTokens = req.user.authTokens.filter((authToken) =>{
            return authToken.authToken !== req.authToken;
        });

        await req.user.save();
        res.send();
    }catch(e){
        res.status(500).send();
    }
})

router.post('/users/logout/all',authentification ,async (req,res)=>{
    try{
        req.user.authTokens= [];
        await req.user.save();
        res.send();
    }catch(e){
        res.status(500).send();
    }
})

module.exports = router