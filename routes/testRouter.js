var express = require('express');
var router = express.Router();
const validateToken = require('../utils/validateToken');

router.post('/', validateToken)

module.exports = router;
