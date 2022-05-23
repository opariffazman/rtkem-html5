var parsedRekod = JSON.parse(localStorage.getItem("rekods")) || '[]';

function addTabung() {
  let answer = prompt('Nama tabung?');

  if (!answer) {
    console.log('no tabung name');
    return;
  }

  let parsedTabung = JSON.parse(localStorage.getItem("tabungs")) || '[]';
  let duplicateExists = '';

  if (parsedTabung != '[]') duplicateExists = parsedTabung.find(element => element.nama === answer);

  if (duplicateExists) {
    console.log('duplicate tabung name');
    return;
  }

  if (parsedTabung.length > 6) {
    console.log('max tabung reached');
    return;
  }

  let tabungs = [];
  let tabung = {
    "nama": answer,
    "amaun": parseFloat('0').toFixed(2)
  };

  tabungs.push(tabung);
  tabungs = tabungs.concat(JSON.parse(localStorage.getItem("tabungs") || '[]'));
  console.log(tabungs);

  localStorage.setItem("tabungs", JSON.stringify(tabungs));

  addTabungTable(tabung.nama, tabung.amaun);
}

function addTabungTable(nama, amaun) {
  let tabungHead = ['Tabung', 'Amaun'];
  let tabungTable = document.getElementById('tabung');
  let tableRow = tabungTable.insertRow(1); // insert in between

  for (let index = 0; index < tabungHead.length; index++) {
    let tableData = document.createElement('td'); // table definition.
    tableData = tableRow.insertCell(index);
    tableData.setAttribute('scope', 'row');
    tableData.setAttribute('data-label', tabungHead[index]);

    let cellText = tabungHead[index] == 'Tabung' ? document.createTextNode(nama + " ") : document.createTextNode(amaun);
    tableData.appendChild(cellText);

    if (tabungHead[index] != 'Tabung') return;

    let cellIcon = document.createElement('i');
    cellIcon.setAttribute('class', "fa fa-pencil-square-o");
    cellIcon.setAttribute('onclick', "editTabung()");
    tableData.appendChild(cellIcon);
  }
}

function editTabung() {
  window.alert('edit');
}

function initializeTabung() {

}

// function initializeTabung() {
//   if (localStorage) {
//     //
//     const tabungA = localStorage.getItem("tabungA") || "A";
//     const tabungB = localStorage.getItem("tabungB") || "B";
//     const tabungC = localStorage.getItem("tabungC") || "C";
//     const tabungD = localStorage.getItem("tabungD") || "D";

//     // set the innerHTML values to the vars above
//     document.getElementById("tabungA").innerHTML = `${tabungA}`;
//     document.getElementById("tabungB").innerHTML = `${tabungB}`;
//     document.getElementById("tabungC").innerHTML = `${tabungC}`;
//     document.getElementById("tabungD").innerHTML = `${tabungD}`;

//     let amaunA = 0;
//     let amaunB = 0;
//     let amaunC = 0;
//     let amaunD = 0;

//     // get amaun for each tabung
//     for (let index = 0; index < parsedRekod.length; index++) {
//       let amaun = parsedRekod[index].amaun;
//       let tabung = parsedRekod[index].tabung;

//       if (tabung == tabungA)
//         amaunA = parseFloat(amaunA) + parseFloat(amaun);
//       else if (tabung == tabungB)
//         amaunB = parseFloat(amaunB) + parseFloat(amaun);
//       else if (tabung == tabungC)
//         amaunC = parseFloat(amaunC) + parseFloat(amaun);
//       else if (tabung == tabungD)
//         amaunD = parseFloat(amaunD) + parseFloat(amaun);
//     }

//     document.getElementById("amaunA").innerHTML = `${amaunA}`;
//     document.getElementById("amaunB").innerHTML = `${amaunB}`;
//     document.getElementById("amaunC").innerHTML = `${amaunC}`;
//     document.getElementById("amaunD").innerHTML = `${amaunD}`;

//     const amaunSemua = parseFloat(amaunA) + parseFloat(amaunB) + parseFloat(amaunC) + parseFloat(amaunD);
//     document.getElementById("amaunSemua").innerHTML = `RM ${parseFloat(amaunSemua).toFixed(2)}`;
//   }
// }

// let tdA = document.getElementById('tabungA');
// let tdB = document.getElementById('tabungB');
// let tdC = document.getElementById('tabungC');
// let tdD = document.getElementById('tabungD');

// tdA.addEventListener('input', function () {
//   localStorage.setItem("tabungA", tdA.innerHTML)
// })

// tdB.addEventListener('input', function () {
//   localStorage.setItem("tabungB", tdB.innerHTML)
// })

// tdC.addEventListener('input', function () {
//   localStorage.setItem("tabungC", tdC.innerHTML)
// })

// tdD.addEventListener('input', function () {
//   localStorage.setItem("tabungD", tdD.innerHTML)
// })
