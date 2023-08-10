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
const mongoose = require('mongoose');
main().catch(err => console.log(err))
    

async function main(){
    await mongoose.connect(process.env.MONGO_URL);
    const User = mongoose.model('User',{
        name: String,
        age:Number
    });

    const firstPerson = new User({
        name:'alex',
        age:30
    });
    const secondPerson = new User({
        name:'Pauline',
        age:30
    });

    console.log(firstPerson,secondPerson);
    await firstPerson.save();
    await secondPerson.save();
}