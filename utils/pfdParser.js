//---IMPORT DEPEMNDANCIES---//
PDFParser = require("pdf2json");

let allPdfData = [];

const parserFunction = async () => {
  //--FIND COODINATES OF THE COLUMNS
  let partNumber = -99;
  let yAxis = -999;
  let description = -111;
  let shade = -112;
  let hsCode = -115;
  let batch = -117;
  let quantity = -119;
  let netWeight = -122;
  let totWeight = -125;
  let unitPrice = -128;
  let vcc = -133;
  
  const pdfParser = new PDFParser();
  let filePath = __dirname + "/../assets/files/toConvert.pdf"
  pdfParser.loadPDF(filePath);
  //pdfParser.on("pdfParser_dataReady", pdfData => pdfData.Pages ? fs.writeFile("./testPdf/test.json", JSON.stringify(pdfData.Pages[6]), ()=>{console.log("Done.");}) : "All pages parsed");
  return new Promise ((res, rej) => {
    pdfParser.on("pdfParser_dataReady", pdfData => {
      if (pdfData.Pages) {
        //--CHECK DATA IN EACH PAGE--//
        pdfData.Pages.forEach(page => {
          let eachLine = {};
          //FOR EACH TEXT ON THE PAGE
          //ASSIGN LOCATION OF THE HEADERS
          page.Texts.forEach(text => {
            switch (text.R[0].T) {
              case "Item%20%23":
                partNumber = text.x;
                break;
              case "Name%20Tag":
                description = text.x;
                break;
              case "Shade":
                shade = text.x;
                break;
              case "HS%20Code":
                hsCode = text.x;
                break;
              case "Batch":
                batch = text.x;
                break;
              case "Shipped":
                quantity = text.x;
                break;
              case "Unit%20Price":
                unitPrice = text.x;
                break;
              case "Net%20WT%20":
                netWeight = text.x;
                break;
              case "Total%20WT":
                totWeight = text.x;
                break;
              case "Amount":
                vcc = text.x;
                break;
            }
            
            let str = "";
            let strArr = [];
            let index = -1;
            
            if (text.x >= partNumber-0.3 && text.x < description) {
              //--PART NUMBER COLUMN SECTION--//

              if (text.R[0].T.trim().match(/^\d+.+/)) {
                //If no Part number
                if (!eachLine["PartNumber"]) {
                  eachLine["PartNumber"] = text.R[0].T.trim();
                }
                else {
                  eachLine["COO"] = "USA";
                  if (eachLine["Description"]) {
                    eachLine["Description"] = eachLine["Description"].replace(/\s\s+/g, ' ').trim();
                  }
                  allPdfData.push(eachLine); //console.log(eachLine);
                  eachLine = {};
                  eachLine["PartNumber"] = text.R[0].T.trim();
                }
              }
              else if (eachLine["PartNumber"] && !eachLine["COO"]) {
                //COUNTRY OF ORIGIN
                str = text.R[0].T.trim().replace(/%20/g, " ");
                strArr = str.split(" ");
                //CHECK IF COO AVAILABLE
                if (strArr[0] === "Item" && strArr[1] === "Number") {
                  index = strArr.findIndex(ele => ele === "manufactured");
                  str = "";
                  for (let i = index+2; i <strArr.length; i++) {
                    str = str + strArr[i] + " ";
                  }
                  eachLine["COO"] = str.trim();
                  if (eachLine["Description"]) {
                    eachLine["Description"] = eachLine["Description"].replace(/\s\s+/g, ' ').trim();
                  }
                  allPdfData.push(eachLine); //console.log(eachLine);
                  eachLine = {};
                }  
              }
            } 
            else {
              if (eachLine["PartNumber"] && !eachLine["COO"]) {
                str = decodeURI(text.R[0].T).replace(/%2C/g, "").replace(/%20/g, " ").replace(/%2F/g, "/").trim();
                //str = text.R[0].T.trim().replace(/%2C/g, "").replace(/%20/g, " ");
                
                //--PART NUMBER COLUMN SECTION--//
                if (text.x >= description - 0.1 && text.x < shade) {
                  if (!eachLine["Description"]) {
                    eachLine["Description"] = str;
                  }
                  else {
                    eachLine["Description"] += str;
                  }
                }
                //--HS CODE COLUMN SECTION--//
                if (text.x >= hsCode - 0.1 && text.x < batch) {
                  eachLine["HSCode"] = str;
                }
                //--SHIPPED COLUMN SECTION--//
                if (text.x >= quantity - 0.1 && text.x < unitPrice) {
                  eachLine["shipped"] = str;
                }
                //--TOTAL WEIGHT COLUMN SECTION--//
                if (text.x >= totWeight - 0.1 && text.x < vcc) {
                  eachLine["totWeight"] = str;
                }
                //--AMOUNT COLUMN SECTION--//
                else if (text.x >= vcc - 0.4) {
                  eachLine["Amount"] = str;
                }
              }
  
              //fs.appendFileSync("./testPdf/test.json", eachLine + ", ");
  
            }
          })
        });
      }
  
      console.log(partNumber, description, hsCode, quantity, unitPrice, totWeight, vcc)
      //fs.writeFile("./testPdf/test.json", JSON.stringify(pdfData.Pages[6]), ()=>{console.log("Done.");})
      res(allPdfData);
      //fs.writeFile("./testPdf/test.json", JSON.stringify(allPdfData), ()=>{console.log("Done.");})
    }); 

  })
  
}
module.exports = {parserFunction};