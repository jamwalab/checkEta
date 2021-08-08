const router = require('express').Router();
require('dotenv').config();
const {getEquipData, getNewTkn} = require('../../utils/getCnData')

router.get('/', (req,res) => {
  res.json({message: "Listening"});
});

//----CN API CALL LOGIC----//
router.post('/', async (req, res) => {
  //get array in request body
  const containerArr = req.body.containerArr;
  //empty equipment declaration
  let equipment = "";
  //convert to CN format (10 digit and seperated by comma)
  containerArr.forEach(container => {
    equipment += container.substring(0, 10) + ",";
  });
  //Call function to get CN data
  let equipEtaData = await getEquipData(equipment)
    .then(data => {
      return data;
    })
    .catch(err => {
      //If token expired call new token function
      if (err.status === 401) {
        return getNewTkn(equipment);
      }
    })
  //Blank array for data output
  let equipData = [];
  
  containerArr.forEach(container => {
    //Find index
    const index = equipEtaData.response.findIndex(eachEquip => {
      return eachEquip.EquipmentId === container.substring(0, 10)
    })
    //If index is a match push data
    if (index !== -1) {
      console.log(equipEtaData.response[index]);
      equipData.push({
        container: equipEtaData.response[index].EquipmentId,
        destination: equipEtaData.response[index].Destination,
        eta: equipEtaData.response[index].ETA,
        event: equipEtaData.response[index].Event,
        storage: equipEtaData.response[index].StorageCharge,
        containerNumFull: container
      });
    } 
    //if not a match push container number with blank
    else {
      equipData.push({
        container: "no data",
        containerNumFull: container
      });
    }
  });
  //return data
  res.json(equipData);
})

module.exports = router;