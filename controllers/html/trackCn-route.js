const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('trackCn');
})

module.exports = router;