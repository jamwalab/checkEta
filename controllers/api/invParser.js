const router = require('express').Router();
const {parserFunction} = require('../../utils/pfdParser')
const XLSX = require('xlsx');
const path = require('path');

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
  pdfFilePath = path.join(__dirname + './assets/files/toConvert.pdf')
  
  xlsFilePath= __dirname + "../../../assets/files/xlFileOutput.xls";
  
  //USE mv TO MOVE FILE TO SERVER
  pdfFileSelect.mv(pdfFilePath).then(async () => {
    return await parserFunction()
  }).then(response => {
    res.json(response);
    ////XLSX MOVED TO FRONTEND -- BELOW CODE LEFT FOR REFERENCE IF IMPLEMENTED ON BACKEND
    /*console.log(response)
    let wb = XLSX.utils.book_new();
    //wb.SheetNames.push("pdfData");
    const ws = XLSX.utils.json_to_sheet(response);
    //wb.Sheets["pdfData"] = ws;
    console.log("aaaaa")
    XLSX.utils.book_append_sheet(wb, ws, "myWorkSheet");
    XLSX.writeFile(wb, xlsFilePath);

    //res.render('invParser', {"fileReady" : true});
    res.json({"fileReady" : true})
    //XLSX.writeFileAsync(xlsFilePath, wb)
    //const wbout = XLSX.write(wb, {bookType:'xls',  type: 'binary'});
    //console.log(wbout)
    //res.json(wbout);
    /*var ws = XLSX.utils.json_to_sheet(response);
    var wb = XLSX.utils.book_new();
    
    XLSX.utils.book_append_sheet(wb, ws, "outputExcel");
    var bin = XLSX.write(wb, {bookType:'xls',type: "binary"});
    return new Blob([this._binStr2ArrBuff(bin)], { type: "" });*/
  }).catch(err => console.log(err));
})


module.exports = router;