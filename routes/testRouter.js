var express = require('express');
var router = express.Router();
const validateToken = require('../utils/validateToken');
const testCrud = require('../utils/testCrud');

router.post('/', validateToken)
router.post('/testcrud', testCrud)



module.exports = router;
