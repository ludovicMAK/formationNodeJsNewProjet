require('dotenv').config();
const mongoose = require('mongoose');
const validator = require('validator')
    
// REST API = REpresentation state transfer - Application programming interface
// Api = outil pour vous aider à programmer (module npm/fs)
// REST = web app d'accéder et manipuler des ressources en utilisant des opération prédéfinie
//Ressources = Utilisateur/todo
// Opérations = créer un todo/ supprimer un todo / supprimer un utilisateur

async function connectDb(){
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Db connecté!');
}

module.exports={
    connectDb
}