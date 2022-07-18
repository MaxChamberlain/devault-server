var express = require('express');
var router = express.Router();

const { insertOne, getAll, checkIn, checkOut, repair, request, deleteItem } = require('../utils/mongoCrudOperations');

router.post('/addone', insertOne)
router.post('/getall', getAll)
router.post('/checkin', checkIn)
router.post('/checkout', checkOut)
router.post('/repair', repair)
router.post('/request', request)
router.post('/delete', deleteItem)



module.exports = router;
