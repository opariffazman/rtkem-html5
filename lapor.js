const parsedRekod = JSON.parse(localStorage.getItem("rekods")) || '[]';
const selectTabung = document.getElementById("tabung");
const selectTahun = document.getElementById("tahun");
// var selectBulan = document.getElementById("bulan");

// only list Tabung with available information
function setTabung() {

  let tabungs = [];

  for (let index = 0; index < parsedRekod.length; index++) {
    let tabung = parsedRekod[index].tabung;
    if (tabung)
      tabungs.push(tabung);
  }

  // build unique years as available options
  let uniqueTabung = [...new Set(tabungs)];

  for (let index = 0; index < uniqueTabung.length; index++) {
    let tabung = uniqueTabung[index];
    selectTabung.add(new Option(tabung, tabung));
  }
}

// only list available Tahun
function setTahun(byTabung) {
  for (a in selectTahun.options) { selectTahun.options.remove(0); }

  let years = [];
  // loop through all records in local storage
  for (let index = 0; index < parsedRekod.length; index++) {
    let tabung = parsedRekod[index].tabung;
    if (byTabung == tabung) {
      let tahun = parsedRekod[index].tarikh.slice(0, 4);
      years.push(tahun);
    }
  }

  // build unique years as available options
  let uniqueYear = [...new Set(years)];

  for (let index = 0; index < uniqueYear.length; index++) {
    let tahun = uniqueYear[index];
    selectTahun.add(new Option(tahun, tahun));
  }

  setBulan();
}

function setBulan() {
  let bulan = document.getElementById('bulan');
  bulan.value = '0';
}

function setLaporan(theForm) {
  let tabung = (theForm.elements['tabung']).value;
  let tahun = (theForm.elements['tahun']).value;
  let bulan = (theForm.elements['bulan']).value;
  let filtered = [];

  if (bulan != "0") {
    // to match months stored in records, eg: July is 07
    bulan = bulan.length == 1 ? '0' + bulan : bulan;
    filtered = parsedRekod.filter(rekod =>
      rekod.tabung == tabung &&
      rekod.tarikh.slice(0, 4) == tahun &&
      rekod.tarikh.slice(5, 7) == bulan);
  } else {
    filtered = parsedRekod.filter(rekod =>
      rekod.tabung == tabung &&
      rekod.tarikh.slice(0, 4) == tahun);
  }

  let mytbl = document.getElementById("laporan");
  mytbl.getElementsByTagName("tbody")[0].innerHTML = mytbl.rows[0].innerHTML;

  if (filtered.length) {
    let arrHead = ['Tarikh', 'Perkara', 'Amaun'];
    let empTab = document.getElementById('laporan');
    let rowCnt = empTab.rows.length; // table row count.

    for (let index = 0; index < filtered.length; index++) {
      let tarikh = filtered[index].tarikh;
      let perkara = filtered[index].perkara;
      let amaun = filtered[index].amaun;
      let tableRow = empTab.insertRow(rowCnt); // the table row.

      for (let index = 0; index < arrHead.length; index++) {
        let tableData = document.createElement('td'); // table definition.
        tableData = tableRow.insertCell(index);
        tableData.setAttribute('scope', 'row');
        tableData.setAttribute('data-label', arrHead[index]);
        let cellText = '';

        if (arrHead[index] == 'Tarikh') {
          cellText = document.createTextNode(tarikh);
        } else if (arrHead[index] == 'Perkara') {
          cellText = document.createTextNode(perkara);
        } else {
          cellText = document.createTextNode(parseFloat(amaun).toFixed(2));
        }

        tableData.appendChild(cellText);
      }
    }
  }
  else
    console.log("Tiada rekod");
}
