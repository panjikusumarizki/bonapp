var express = require('express');
var router = express.Router();
const { 
    addPlayer, 
    getPlayers, 
    getPlayer
 } = require('./controller');

router.get('/', getPlayers)
router.get('/:id', getPlayer)
router.post('/create', addPlayer)

module.exports = router;