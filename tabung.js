var parsedRekod = JSON.parse(localStorage.getItem("rekods")) || '[]';
var parsedTabung = JSON.parse(localStorage.getItem("tabungs")) || '[]';

function addTabung() {
  let answer = prompt('Isi nama tabung', 'Nama unik');

  if (!answer || answer == "Nama unik") return;

  let duplicateName = '';

  if (parsedTabung != '[]') // skip check for first time
    duplicateName = parsedTabung.find(element => element.nama === answer);

  if (duplicateName) return;

  if (parsedTabung.length > 6) return; // max tabung

  let tabungs = [];
  let tabung = {
    "nama": answer,
    "amaun": parseFloat('0').toFixed(2)
  };

  tabungs.push(tabung);
  tabungs = tabungs.concat(JSON.parse(localStorage.getItem("tabungs") || '[]'));
  console.log(tabungs);

  localStorage.setItem("tabungs", JSON.stringify(tabungs));
  parsedTabung = JSON.parse(localStorage.getItem("tabungs")); // updateTabung

  addTabungTable(tabung.nama, tabung.amaun);
}

function addTabungTable(nama, amaun) {
  let tabungHead = ['Tabung', 'Amaun'];
  let tabungTable = document.getElementById('tabung');
  let tableRow = tabungTable.insertRow(tabungTable.rows.length - 3); // insert in between

  for (let i = 0; i < tabungHead.length; i++) {
    let tableData = document.createElement('td'); // table definition.
    tableData = tableRow.insertCell(i);
    tableData.setAttribute('scope', 'row');
    tableData.setAttribute('data-label', tabungHead[i]);
    tableData.setAttribute('value', nama);

    let cellText = tabungHead[i] == 'Tabung' ? document.createTextNode(nama + " ") : document.createTextNode(amaun);
    tableData.appendChild(cellText);

    if (tabungHead[i] != 'Tabung') return;

    let cellIcon = document.createElement('button');
    cellIcon.setAttribute('class', "btnEmpty fa fa-pencil-square-o");
    cellIcon.setAttribute('value', `${nama}`)
    cellIcon.setAttribute('onclick', "editTabung(this.value)");
    tableData.appendChild(cellIcon);
  }
}

function editTabung(form) {
  let answer = prompt('Tukar nama tabung?', form);
  if (!answer) return;

  let objIndex = parsedTabung.findIndex((obj => obj.nama == form));
  parsedTabung = JSON.parse(localStorage.getItem("tabungs")); // updateTabung
  parsedTabung[objIndex].nama = answer;

  localStorage.setItem('tabungs', JSON.stringify(parsedTabung));
  location.reload();
  return false;
}

function initializeTabungTable() {

  if (parsedTabung == '[]') return; // skip tabung info build

  parsedTabung = JSON.parse(localStorage.getItem("tabungs"));

  let amaunSemua = 0.00;
  for (let i = parsedTabung.length - 1; i >= 0; i--) {
    let nama = parsedTabung[i].nama;
    let amaun = parsedTabung[i].amaun;

    addTabungTable(nama, amaun);
    amaunSemua = parseFloat(amaunSemua) + parseFloat(amaun);
  }

  parsedRekod = JSON.parse(localStorage.getItem("rekods"));

  let amaunTunai = 0.00;
  let amaunBank = 0.00;
  for (let i = 0; i < parsedRekod.length; i++) {
    if (parsedRekod[i].kategori == 'tunai') {
      amaunTunai = parseFloat(amaunTunai) + parseFloat(parsedRekod[i].amaun);
    } else {
      amaunBank = parseFloat(amaunBank) + parseFloat(parsedRekod[i].amaun);
    }
  }

  document.getElementById('amaunSemua').innerHTML = `RM ${parseFloat(amaunSemua).toFixed(2)}`;
  document.getElementById('amaunTunai').innerHTML = `RM ${parseFloat(amaunTunai).toFixed(2)}`;
  document.getElementById('amaunBank').innerHTML = `RM ${parseFloat(amaunBank).toFixed(2)}`;
}
