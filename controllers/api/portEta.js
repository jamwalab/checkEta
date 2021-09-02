const router = require('express').Router();
const axios = require('axios');

router.get('/', (req,res) => {
  res.json({message: "Listening"});
});

//----MAERSK CONTAINER STATUS LOGIC----//
router.post('/maersk', async (req, res) => {
  const config = {
    method: 'GET',
    url: `https://api.maersk.com/track/${req.body.container}?operator=MAEU`,
  };

  console.log(`https://api.maersk.com/track/${req.body.container}?operator=MAEU`)
  axios(config)
    .then(response => {
      const timeFormat = response.data.containers[0].eta_final_delivery.split("T");
      response.data.containers[0].eta_final_delivery = timeFormat.join(", Time: ")
      console.log(response.status);
      console.log(response.config.url);
      console.log(response.data);
      console.log(response.data.containers);
      res.json({
        container: req.body.container,
        destination: response.data.destination.terminal,
        etaFinalDel: response.data.containers[0].eta_final_delivery,
        etaLatest: response.data.containers[0].latest,
        storage: "NA"
      });
    })
    .catch(err => {
      res.json({
        container: req.body.container,
        destination: false,
        etaFinalDel: false,
        etaLatest: false
      });
    })
});

module.exports = router;