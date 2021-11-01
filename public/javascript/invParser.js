const $fileDownloadLink = document.querySelector("#fileDownloadLink");
//--DATE TODAY--//
let date = new Date()
console.log(date)
//--SAVE FILE FROM BUFFER--//
const saveFileAsExcel = (buffer) => {
  //create new blob
  const excelData = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'})
  //save file
  saveAs(excelData, `JanePdfToExcel${date}.xls`)
}

//--LOFIV FOR WHEN SUBMIT IS CLICKED--//
const submitPdfLogic = async (event) => {
  event.preventDefault();
  //get selected file
  const file = document.querySelector('[type=file]').files;
  //create new form data for submit
  const formData = new FormData();
  formData.append("pdfFileSelect", file[0]);

  //post the pdf file for upload to server
  fetch('/api/parser/jane', {
    method: 'POST',
    body: formData
  }).then((response) => {
    //response from server (array of objects for each line)
    return response.json();
  }).then(data => {
    console.log(data)
    //workbook
    let wb = XLSX.utils.book_new();
    //worksheet
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "myWorkSheet");
    
    const excelFileBuffer = XLSX.write(wb, {bookType:'xls', type: 'array'});
    saveFileAsExcel(excelFileBuffer)
  })
}

document.querySelector('.uploadFile').addEventListener('submit', submitPdfLogic);
