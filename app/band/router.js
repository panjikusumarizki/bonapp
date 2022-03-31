var express = require('express');
var router = express.Router();
const { 
    addBand,
    getBands,
    getBand,
    editBand,
    addPlayerToBand
 } = require('./controller');

router.get('/', getBands)
router.get('/:id', getBand)
router.post('/create', addBand)
router.put('/edit/:id', editBand)
router.post('/personnel', addPlayerToBand)

module.exports = router;