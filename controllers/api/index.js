const router = require('express').Router();

const trackCn = require('./trackCn');
const portEta = require('./portEta');
const invParser = require('./invParser');

router.use('/trackCn', trackCn);
router.use('/portEta', portEta);
router.use('/parser', invParser);

module.exports = router;