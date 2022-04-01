var express = require('express');
var router = express.Router();
const { 
    createBand,
    getListBands,
    getDetailBand,
    editTheBand,
    addPlayerToTheBand
 } = require('./handler');

router.get('/', getListBands)
router.get('/:id', getDetailBand)
router.post('/create', createBand)
router.put('/edit/:id', editTheBand)
router.post('/personnel', addPlayerToTheBand)

module.exports = router;