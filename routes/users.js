var express = require('express');
var router = express.Router();
const { registerUser, authUser, getUsers, makeAdmin, getUserPermissions } = require('../controllers/usersController');

router.post('/register', registerUser)
router.post('/login', authUser)
router.post('/getall', getUsers)
router.post('/makeadmin', makeAdmin)
router.post('/getpermissions', getUserPermissions)



module.exports = router;
