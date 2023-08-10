require('dotenv').config();
// const {MongoClient} = require('mongodb');
// const client = new MongoClient(process.env.MONGO_URL)


// async function main(){
//     await client.connect();
//     console.log("connextion OK")
//     const db = client.db('myTask');
//     const collection = db.collection('documents');

//     //Create
//     // try{
//     //     const inserData = await collection.insertMany([
//     //         {
//     //             name:'Alex',
//     //             age:30,
//     //             sexe:'masculin',
//     //             hobby:'coding'
//     //         },
//     //         {
//     //             name:'Justine',
//     //             age:30,
//     //             sexe:'Féminin',
//     //             hobby:'coding'
//     //         },
//     //         {
//     //             name:'Pierre',
//     //             age:35,
//     //             sexe:'masculin',
//     //             hobby:'escalade'
//     //         }
//     //     ]);

//     //     console.log('Document insérés =>',inserData);
//     // } catch(e){
//     //     throw e;
//     // }

//     //Read
//     try{
//         // const findData = await collection.findOne({name:'Justine'});
//         // console.log('Document trouvé:',findData);

//         // const findMultipleData = await collection.find({age:30});
//         // console.log('Document trouvé:', await findMultipleData.toArray());
//     } catch(e){
//         throw e;
//     }

//     //Update
//     // try{
//     //     const UpdateAge = collection.updateMany({age:30},{
//     //         $set:{age:31}
//     //     });
        
//     //     console.log(await UpdateAge);
//     // } catch(e){
//     //     throw e;
//     // }

//     //delete
//     try{
//         const deletePierre = await collection.deleteOne({name:'Pauline'});
//         console.log(await deletePierre);

//         const deleteEveryone = await collection.deleteMany({age:31});
//         console.log(await deleteEveryone);
//     } catch(e){
//         throw e;
//     }
//     // const insertStuff = await collection.insertMany([{a:1},{b:2},{c:3},{d:4}]);
//     // console.log(`Documents insérés => `, insertStuff);
//     return 'done'
// }

const {connectDb} = require('./src/services/mongoose')

const User = require('./src/models/user');
const express = require('express');
const app = express();
const port = process.env.Port || 3000;

connectDb().catch(err => console.log(err));

app.use(express.json())

app.post('/users',async (req,res,next)=>{

    //console.log(req.body);
    const user = new User(req.body);
    try{
        const saveUser = await user.save();
        res.status(201).send(saveUser)
    }catch(e){
        res.status(400).send(e);
    }
    
   
});

app.get('/users',async(req,res,next)=>{
    try{
        const users = await User.find({});
        res.send(users);
    }catch(e){
        res.status(500).send(e)
    }
});

app.get('/users/:id',async(req,res,next)=>{
    const userId = req.params.id;
    try{
        const user = await User.findById(userId);
        if(!user) return res.status(404).send('User not found');
        res.send(user);
    }catch(e){
        res.status(500).send(e)
    }
});

app.patch('/users/:id',async(req,res,next)=>{
    const userId = req.params.id;
    try{
        const user = await User.findByIdAndUpdate(userId,req.body,{
            new:true,
            runValidators:true
        });
        if(!user) return res.status(404).send('User not found');
        res.send(user);
    }catch(e){
        res.status(500).send(e)
    }
})

app.delete('/users/:id',async(req,res,next)=>{
    const userId = req.params.id;
    try{
        const user = await User.findByIdAndDelete(userId);
        if(!user) return res.status(404).send('User not found');
        res.send(user);
    }catch(e){
        res.status(500).send(e)
    }
})

app.listen(port,()=>{
    console.log(`Le serveur est lancé à: http://localhost:${port}`);
});

    
// REST API = REpresentation state transfer - Application programming interface
// Api = outil pour vous aider à programmer (module npm/fs)
// REST = web app d'accéder et manipuler des ressources en utilisant des opération prédéfinie
//Ressources = Utilisateur/todo
// Opérations = créer un todo/ supprimer un todo / supprimer un utilisateur

