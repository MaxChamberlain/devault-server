var express = require('express');
var router = express.Router();

const { insertOne, getAll, checkIn, checkOut, repair, request, deleteItem, changeCategory, addTag, removeTag, makeDamaged, reserve } = require('../utils/mongoCrudOperations');

router.post('/addone', insertOne)
router.post('/getall', getAll)
router.post('/checkin', checkIn)
router.post('/checkout', checkOut)
router.post('/repair', repair)
router.post('/request', request)
router.post('/delete', deleteItem)
router.post('/changecategory', changeCategory)
router.post('/addtag', addTag)
router.post('/removetag', removeTag)
router.post('/damaged', makeDamaged)
router.post('/reserve', reserve)


module.exports = router;
