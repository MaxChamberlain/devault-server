const connectToMongo = require('./connectToMongo');
const mongodb = require('mongodb');

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

 async function checkIn(req, res) {
    let mongoClient
    try{
        const { serial, company_code } = req.body

        mongoClient = await connectToMongo();
        const db = mongoClient.db('devault');
        const collection = db.collection('DEVICES-' + company_code);

        const devices = await collection.updateOne({ serial }, {$set: {checked_out: false, requested: false, owner: null}});

        res.status(201).json({message: 'Checked In!!'})
    }catch(e){
        console.log(e)
        res.status(400).json({ error: 'Error finding!' })
    }finally {
        await mongoClient.close();
    }
 }

 async function checkOut(req, res) {
    let mongoClient
    try{
        const { serial, owner, company_code } = req.body


        mongoClient = await connectToMongo();
        const db = mongoClient.db('devault');
        const collection = db.collection('DEVICES-' + company_code);

        const devices = await collection.updateOne({ serial }, {$set: {checked_out: true, owner: owner}});

        res.status(201).json({message: 'Checked Out!'})
    }catch(e){
        console.log(e)
        awaitres.status(400).json({ error: 'Error finding!' })
    }finally {
        await mongoClient.close();
    }
 }

 async function repair(req, res) {
    let mongoClient
    try{
        const { serial, company_code } = req.body

        mongoClient = await connectToMongo();
        const db = mongoClient.db('devault');
        const collection = db.collection('DEVICES-' + company_code);

        const devices = await collection.updateOne({ serial }, {$set: {damaged: false, damage_description: null}});

        res.status(201).json({message: 'Status Changed!'})
    }catch(e){
        console.log(e)
        res.status(400).json({ error: 'Error finding!' })
    }finally {
        await mongoClient.close();
    }
 }

 async function request(req, res) {
    let mongoClient
    try{
        const { serial, owner, company_code } = req.body

        mongoClient = await connectToMongo();
        const db = mongoClient.db('devault');
        const collection = db.collection('DEVICES-' + company_code);

        const devices = await collection.updateOne({ serial }, {$set: {owner: owner, requested: true}});

        res.status(201).json({message: 'Device Requested!'})
    }catch(e){
        console.log(e)
        res.status(400).json({ error: 'Error finding!' })
    }finally {
        await mongoClient.close();
    }
 }

 async function deleteItem(req, res) {
    let mongoClient
    try{
        const { _id, company_code } = req.body

        mongoClient = await connectToMongo();
        const db = mongoClient.db('devault');
        const collection = db.collection('DEVICES-' + company_code);

        console.log(new mongodb.ObjectID(_id))

        const devices = await collection.deleteOne({ _id: new mongodb.ObjectID(_id) });

        res.status(201).json({message: 'Device Removed!'})
    }catch(e){
        console.log(e)
        res.status(400).json({ error: 'Error finding!' })
    }finally {
        await mongoClient.close();
    }
 }

 async function changeCategory(req, res) {
    let mongoClient
    try{
        const { _id, category, company_code } = req.body

        mongoClient = await connectToMongo();
        const db = mongoClient.db('devault');
        const collection = db.collection('DEVICES-' + company_code);

        const devices = await collection.updateOne({ _id: new mongodb.ObjectID(_id) }, {$set: {category: category}});

        res.status(201).json({message: 'Category Changed!'})
    }catch(e){
        console.log(e)
        res.status(400).json({ error: 'Error finding!' })
    }finally {
        await mongoClient.close();
    }
 }

 async function removeTag(req, res) {
    let mongoClient
    try{
        const { _id, tag, company_code } = req.body

        mongoClient = await connectToMongo();
        const db = mongoClient.db('devault');
        const collection = db.collection('DEVICES-' + company_code);

        await collection.updateOne({ _id: new mongodb.ObjectID(_id) }, {$pull: {options: tag}});

        res.status(201).json({message: 'Tag Removed!'})
    }catch(e){
        console.log(e)
        res.status(400).json({ error: 'Error finding!' })
    }finally {
        await mongoClient.close();
    }
 }

 async function addTag(req, res) {
    let mongoClient
    try{
        const { _id, tag, company_code } = req.body

        mongoClient = await connectToMongo();
        const db = mongoClient.db('devault');
        const collection = db.collection('DEVICES-' + company_code);

        const data = await collection.updateOne({ _id: new mongodb.ObjectID(_id) }, {$push: {options: tag}});

        res.status(201).json({message: 'Tag Added!'})
    }catch(e){
        console.log(e)
        res.status(400).json({ error: 'Error finding!' })
    }finally {
        await mongoClient.close();
    }
 }

 async function makeDamaged(req, res) {
    let mongoClient
    try{
        const { _id, damage_description, company_code } = req.body

        mongoClient = await connectToMongo();
        const db = mongoClient.db('devault');
        const collection = db.collection('DEVICES-' + company_code);

        const data = await collection.updateOne({ _id: new mongodb.ObjectID(_id) }, {$set: { damaged: true, damage_description: damage_description }});

        res.status(201).json({message: 'Status Changed.'})
    }catch(e){
        console.log(e)
        res.status(400).json({ error: 'Error changing status!' })
    }finally {
        await mongoClient.close();
    }
 }

module.exports = { insertOne, getAll, checkIn, checkOut, repair, request, deleteItem, changeCategory, addTag, removeTag, makeDamaged };