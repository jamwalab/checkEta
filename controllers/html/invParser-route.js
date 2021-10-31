const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('invParser', {"fileReady" : false});
})

module.exports = router;
