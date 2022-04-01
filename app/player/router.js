var express = require('express');
var router = express.Router();
const { 
    createPlayer, 
    getListPlayers, 
    getThePlayer
 } = require('./handler');

router.get('/', getListPlayers)
router.get('/:id', getThePlayer)
router.post('/create', createPlayer)

module.exports = router;