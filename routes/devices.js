var express = require('express');
var router = express.Router();

const { insertOne, getAll } = require('../utils/mongoCrudOperations');

router.post('/addone', insertOne)
router.post('/getall', getAll)



module.exports = router;
