const { MongoClient } = require('mongodb');
const uri = 'mongodb+srv://admin:Administrator123@vidash.ckylswt.mongodb.net/devault?retryWrites=true&w=majority'

async function connectToMongoCluster() {
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

 module.exports = connectToMongoCluster;