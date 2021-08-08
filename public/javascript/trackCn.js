const displayCnData = document.querySelector("#displayCnData");

//----SEARCH CONTAINERS CLICK HANDLER----//
const searchCnContainer = async (event) => {
  //prevent default
  event.preventDefault();
  //select textarea
  const containerList = document.querySelector('.containerInput').value;
  //split and seperate all alphanumerics to array
  let containerArr = containerList.split(/\W/)
  //remove all blank array elements
  containerArr = containerArr.filter(container => {
    if (container !== "") {
      return container;
    }
  });
  //clear textarea and table display
  document.querySelector('.containerInput').value = "";
  displayCnData.innerHTML = "";

  //Call the tracker and pass container array
  const response = await fetch('/api/trackCn', {
    method: 'POST',
    body: JSON.stringify({
      containerArr
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  //if response is good
  if (response.ok) {
    response.json().then(data => {
      //if returned array is not zero
      if (data.length !== 0) {
        //create table and add class
        let cnDispTable = document.createElement("table");
        cnDispTable.classList.add('striped');
        //create table header
        let cnDispThead = document.createElement("thead");
        cnDispThead.innerHTML = `<tr>
        <th>Container#</th>
        <th>Destination</th>
        <th>ETA</th>
        <th>ETA description</th>
        <th>Status</th>
        <th>Status time</th>
        <th>Storage</th>
        </tr>`
        //create table body
        let cnDispBody = document.createElement("tbody");
        //empty inner body
        let tBodyInnerHtml = '';
        //loop each returned array element and extract data
        data.forEach(row => {
          //if no data is returned create blank rows
          if (row.container == "no data") {
            tBodyInnerHtml += `<tr><td>${row.containerNumFull}</td>
            <td>--</td>
            <td>--</td>
            <td>--</td>
            <td>--</td>
            <td>--</td>
            <td>--</td></tr>`
          }
          //if has data create rows with data
          else {
            tBodyInnerHtml += `<tr><td>${row.containerNumFull}</td>
            <td>${row.destination.Station}</td>
            <td>${row.eta.Time}</td>
            <td>${row.eta.Description}</td>
            <td>${row.event.Description}</td>
            <td>${row.event.Time}</td>
            <td>${row.storage.LastFreeDay}</td></tr>`
          }
        });
        //add to table body
        cnDispBody.innerHTML = tBodyInnerHtml
        //append to parent elements
        cnDispTable.appendChild(cnDispThead);
        cnDispTable.appendChild(cnDispBody);
        displayCnData.appendChild(cnDispTable);
      }
    })
  } 
  //if empty or no array
  else {
    displayCnData.innerHTML = ""
  }
  
};

//----EVENT LISTENERS----//
document.querySelector('.searchCnContainer').addEventListener('submit', searchCnContainer);