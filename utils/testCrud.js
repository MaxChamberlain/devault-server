const testNative = require('./testNative');

async function testCrud(req, res) {
    let mongoClient

    const { company_code } = req.body

    try {
        mongoClient = await testNative();
        const db = mongoClient.db('devault');
        const collection = db.collection('DEVICES-' + company_code);
        await collection.insertOne({
            name: 'test',
            company_code: company_code,
            device_id: 'test',
            device_type: 'test',
            device_model: 'test',
            device_manufacturer: 'test',
            device_os: 'test',
            device_os_version: 'test',
            device_serial: 'test',
            device_imei: 'test',
            device_iccid: 'test',
        })
        res.status(201).json({})
        console.log(await collection.find().toArray());
    } finally {
        await mongoClient.close();
    }
 }

module.exports = testCrud;  