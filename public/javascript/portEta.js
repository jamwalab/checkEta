const displayCnData = document.querySelector("#displayPortEta");

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems);
});

const searchPortEta = async (event) => {
  event.preventDefault();
  
}

//----EVENT LISTENERS----//
document.querySelector('.searchPortEta').addEventListener('submit', searchPortEta);