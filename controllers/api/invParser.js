const router = require('express').Router();
const {getEquipData, getNewTkn} = require('../../utils/pfdParser')

router.get('/', (req,res) => {
  res.json({message: "Listening"});
});

router.post('/jane', async (req, res) => {
  let pdfFileSelect;
  let pdfFilePath;
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded");
  }

  //NAME OF THE INPUT PDF FILE SELECTED
  pdfFileSelect = req.files.pdfFileSelect;
  pdfFilePath = __dirname + '../../../assets/files/toConvert.pdf'
  console.log(pdfFileSelect)

  //USE mv TO MOVE FILE TO SERVER
  pdfFileSelect.mv(pdfFilePath).then(() => {
    console.log(res)
  })
    /*, (err) => {
    if (err) return res.status(500).send(err);

    res.send('File uploaded');
  })*/
})


module.exports = router;