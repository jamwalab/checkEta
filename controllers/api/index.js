const router = require('express').Router();

const trackCn = require('./trackCn');

router.use('/trackCn', trackCn);

module.exports = router;