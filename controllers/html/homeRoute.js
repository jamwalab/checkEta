const router = require('express').Router();

//----HOMEPAGE ROUTE----//
router.get('/', (req, res) => {
  res.render('homePage');
})

module.exports = router;