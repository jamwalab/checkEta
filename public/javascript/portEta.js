const displayPortEta = document.querySelector("#displayPortEta");

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems);
});

//---SEARCH SUBMIT BUTTON HANDLER---// 1
const searchPortEta = async (event) => {
  event.preventDefault();
  //select textarea
  let containerList = document.querySelector('.containerInput').value;
  //API only accepts uppercase letters
  containerList = containerList.toUpperCase();
  //split and seperate all alphanumerics to array
  let containerArr = containerList.split(/\W/);
  //If no containers
  if (!containerArr.length) {
    displayPortEta.innerHTML = "NO CONTAINERS ADDED! PLEASE TRY AGAIN!";
    return;
  }
  //remove all blank array elements
  containerArr = containerArr.filter(container => {
    if (container !== "") {
      return container.toUpperCase();
    }
  });

  //Shipping line / carrier / port
  const searchSite = document.querySelector('.searchSite').value;

  //clear textarea and table display
  document.querySelector('.containerInput').value = "";
  displayPortEta.innerHTML = "";
  switch(searchSite) {
    case "1":
      searchContainerCall("maersk", containerArr);
      break;
    default:
      displayPortEta.innerHTML = "INVALID SEARCH! PLEASE TRY AGAIN!";
  };
};

//---DISPLAY RESULE TABLE---//
const printTable = async (containerData) => {
  if (containerData.destination) {
    return `<tr><td>${containerData.container}</td>
    <td>${containerData.destination}</td>
    <td>${containerData.etaFinalDel}</td>
    <td>NA</td></tr>`
  }
  else {
    return `<tr><td>${containerData.container}</td>
    <td>--</td>
    <td>--</td>
    <td>--</td></tr>`
  }
}

//---SEARCH SHIPMENTS---// 2
const searchContainerCall = async (site, containerArr) => {
  //create table and add class
  let portDispTable = document.createElement("table");
  portDispTable.classList.add('striped');
  //create table header
  let portDispThead = document.createElement("thead");
  portDispThead.innerHTML = `<tr>
  <th>Container#</th>
  <th>Destination</th>
  <th>ETA</th>
  <th>Storage (if available)</th>
  </tr>`
  //create table body
  let portDispBody = document.createElement("tbody");
  //empty inner body
  
  
  Promise.all(
    containerArr.map( container => {  
      return new Promise(resolve => {
        fetch(`api/portEta/${site}`, {
          method: 'POST',
          body: JSON.stringify({
            container
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          return response.json()
        })
        .then(data => {
          resolve(printTable(data));
        })
      })
    })
  )
  .then(containerDataArr => {
    tBodyHtml = containerDataArr.join("")
    //add to table body
    portDispBody.innerHTML = tBodyHtml
    //append to parent elements
    portDispTable.appendChild(portDispThead);
    portDispTable.appendChild(portDispBody);
    displayPortEta.appendChild(portDispTable);
  });
  

  //FIXXXXXXXXXXX ASYNCCCCCC
  
}

//----EVENT LISTENERS----//
document.querySelector('.searchPortEta').addEventListener('submit', searchPortEta);