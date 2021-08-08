var axios = require('axios');

//CN data API call function
const getEquipData = async (equipment) => {
  //set axios config
  const config = {
    method: 'GET',
    url: `https://api.cn.ca/customers/v1/shipments/tracking?equipmentIds=${equipment}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ process.env.CN_AC_TKN,
    }
  };
  //return result output data
  return new Promise((res, rej) => {
    axios(config)
    .then((response) => {
      res ({
        status: response.status,
        response: response.data.ThirdPartyIntermodalShipment.Equipment
      })
    })
    //On error return error status code
    .catch((error) => {
      rej ({
        status: error.response.status,
        response: error.response
      })
    });
  })
};

//Post call to generate new token
const getNewTkn = async (equipment) => {
  const config = {
    method: 'POST',
    url: `https://api.cn.ca/v1/oauth/jwt-token/accesstokenJWT?grant_type=client_credentials`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic '+ process.env.CN_AUTH,
      'x-apikey': process.env.CN_XAPKEY
    }
  };

  return await axios(config)
  .then(async (response) => {
    //Update tkn variable
    process.env.CN_AC_TKN = response.data.access_token;
    //get data with new tkn
    return await getEquipData(equipment)
  })
  .catch(err => {
    return err;
  })

}
module.exports = {
  getEquipData,
  getNewTkn
}