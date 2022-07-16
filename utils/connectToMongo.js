const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://admin:Administrator123@cluster0.q7rfn.mongodb.net/devault'

async function connectToMongo() {
    let mongoClient;
 
    try {
        mongoClient = new MongoClient(uri);
        console.log('Connecting to MongoDB Atlas cluster...');
        await mongoClient.connect();
        console.log('Successfully connected to MongoDB Atlas!');
        return mongoClient;
    } catch (error) {
        console.error('Connection to MongoDB Atlas failed!', error);
        process.exit();
    }
 }

 module.exports = connectToMongo;