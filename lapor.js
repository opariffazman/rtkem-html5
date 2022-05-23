var parsedTabung = JSON.parse(localStorage.getItem("tabungs")) || '[]';
var parsedRekod = JSON.parse(localStorage.getItem("rekods")) || '[]';

// only list available Tahun
function setTahun(byTabung) {
  let selectTahun = document.getElementById('tahun');
  for (a in selectTahun.options) { selectTahun.options.remove(0); }

  let years = [];
  // loop through all records in local storage
  for (let i = 0; i < parsedRekod.length; i++) {
    let tabung = parsedRekod[i].tabung;
    if (byTabung == tabung) {
      let tahun = parsedRekod[i].tarikh.slice(0, 4);
      years.push(tahun);
    }
  }

  // build unique years as available options
  let uniqueYear = [...new Set(years)];

  for (let i = 0; i < uniqueYear.length; i++) {
    let tahun = uniqueYear[i];
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

  if (!filtered.length) return;

  let tableHead = ['Tarikh', 'Perkara', 'Amaun'];
  let tableFull = document.getElementById('laporan');

  for (let i = 0; i < filtered.length; i++) {
    let transaksi = filtered[i].transaksi;
    let tarikh = filtered[i].tarikh;
    let perkara = filtered[i].perkara;
    let amaun = filtered[i].amaun;
    let tableRow = tableFull.insertRow(tableFull.rows.length); // the table row.

    for (let i = 0; i < tableHead.length; i++) {
      let tableData = document.createElement('td'); // table definition.
      tableData = tableRow.insertCell(i);
      tableData.setAttribute('scope', 'row');
      tableData.setAttribute('data-label', tableHead[i]);
      let cellText = '';

      if (tableHead[i] == 'Tarikh') {
        cellText = document.createTextNode(tarikh);
      } else if (tableHead[i] == 'Perkara') {
        cellText = document.createTextNode(perkara);
      } else {
        cellText = transaksi == 'penerimaan' ? document.createTextNode(parseFloat(amaun).toFixed(2)) : document.createTextNode(parseFloat(-amaun).toFixed(2));
      }

      tableData.appendChild(cellText);
    }

  }
}
