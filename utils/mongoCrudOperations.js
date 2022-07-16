const connectToMongo = require('./connectToMongo');

async function insertOne(req, res) {
    let mongoClient

    const { 
        company_code,
        make,
        model,
        variant,
        options,
        serial,
        checked_out,
        reserved,
        owner,
        damaged,
        damage_description,
        type,
        category
    } = req.body

    try {
        mongoClient = await connectToMongo();
        const db = mongoClient.db('devault');
        const collection = db.collection('DEVICES-' + company_code);

        await collection.insertOne({
            make,
            model,
            variant,
            options,
            serial,
            checked_out,
            reserved,
            owner,
            damaged,
            damage_description,
            type,
            category
        })

        res.status(201).json({ message: 'Successfully inserted' })
    }catch(e){
        console.log(e)
        res.status(400).json({ error: 'Error inserting' })
    }finally {
        await mongoClient.close();
    }
 }

 async function getAll(req, res) {
    let mongoClient
    try{
        const { company_code } = req.body

        mongoClient = await connectToMongo();
        const db = mongoClient.db('devault');
        const collection = db.collection('DEVICES-' + company_code);

        const devices = await collection.find({}).toArray();

        res.status(201).json(devices)
    }catch(e){
        console.log(e)
        res.status(400).json({ error: 'Error finding!' })
    }finally {
        await mongoClient.close();
    }
 }

module.exports = { insertOne, getAll };