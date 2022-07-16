var express = require('express');
var router = express.Router();
const { getTeams, getTeam } = require('../controllers/teamsController')

router.post('/getall', getTeams)
router.post('/get', getTeam)



module.exports = router;
