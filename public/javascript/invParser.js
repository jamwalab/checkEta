const $fileDownloadLink = document.querySelector("#fileDownloadLink");
let date = new Date()
console.log(date)
const saveFileAsExcel = (buffer) => {
  const excelData = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'})
  saveAs(excelData, `convertedExcel.xls`)
}

const submitPdfLogic = async (event) => {
  event.preventDefault();
  const file = document.querySelector('[type=file]').files;
  const formData = new FormData();
  console.log(file)
  formData.append("pdfFileSelect", file[0]);
  console.log(formData)
  fetch('/api/parser/jane', {
    method: 'POST',
    body: formData
  }).then((response) => {
    return response.json();
  }).then(data => {
    console.log(data)
    /*if (data.fileReady) {
      let respBody = document.createElement("div");
      respBody.innerHTML = `<a class="downloadLink" href="http://localhost:3001/assets/files/xlFileOutput.xls">Click here to download the excel file</a>`;
      $fileDownloadLink.appendChild(respBody);
    }*/
    let wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "myWorkSheet");

    const excelFileBuffer = XLSX.write(wb, {bookType:'xls', type: 'array'});
    saveFileAsExcel(excelFileBuffer)
  })
}

document.querySelector('.uploadFile').addEventListener('submit', submitPdfLogic);
