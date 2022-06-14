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

  let tableHead = ['Tarikh', 'Perkara', 'Amaun', 'Kategori'];
  let tableFull = document.getElementById('laporan');

  for (let i = 0; i < filtered.length; i++) {
    let uid = filtered[i].uid;
    let transaksi = filtered[i].transaksi;
    let tarikh = filtered[i].tarikh;
    let perkara = filtered[i].perkara;
    let amaun = filtered[i].amaun;
    let kategori = filtered[i].kategori;
    let tableRow = tableFull.insertRow(tableFull.rows.length); // the table row.

    for (let i = 0; i < tableHead.length; i++) {
      let tableData = document.createElement('td'); // table definition.
      tableData = tableRow.insertCell(i);
      tableData.setAttribute('scope', 'row');
      tableData.setAttribute('data-label', tableHead[i]);
      let cellText = '';
      let cellIcon = document.createElement('button');
      cellIcon.setAttribute('class', "btnEmpty fa fa-pencil-square-o");
      cellIcon.setAttribute('value', uid)

      switch (tableHead[i]) {
        case 'Tarikh':
          cellText = document.createTextNode(tarikh + " ");
          tableData.setAttribute('value', tarikh);
          cellIcon.setAttribute('onclick', "editRekod(this.value, 'tarikh', 0)");
          break;
        case 'Perkara':
          cellText = document.createTextNode(perkara + " ");
          tableData.setAttribute('value', perkara);
          cellIcon.setAttribute('onclick', "editRekod(this.value, 'perkara', 0)");
          break;
        case 'Kategori':
          cellText = document.createElement("i");
          if (kategori == 'tunai') {
            cellText.innerHTML = `<i class="fa fa-money-bills" aria-hidden="true"></i>` + " "
          } else {
            cellText.innerHTML = `<i class="fa fa-bank" aria-hidden="true"></i>` + " "
          }
          tableData.setAttribute('value', kategori);
          cellIcon.setAttribute('onclick', "editRekod(this.value, 'kategori', 0)");
          break;
        default:
          if (transaksi == 'penerimaan') {
            cellText = document.createTextNode("+ " + parseFloat(amaun).toFixed(2) + " ")
            cellIcon.setAttribute('onclick', "editRekod(this.value, 'amaun', 'penerimaan')");
          } else {
            cellText = document.createTextNode("- " + parseFloat(amaun).toFixed(2) + " ")
            cellIcon.setAttribute('onclick', "editRekod(this.value, 'amaun', 'pengeluaran')");
          }
          tableData.setAttribute('value', amaun);
          break;
      }

      tableData.appendChild(cellText);
      tableData.appendChild(cellIcon);
    }

  }

  document.getElementById('penyata').innerHTML = `<i class="fa-solid fa-file-invoice-dollar" aria-hidden="true"></i> PENYATA ${tabung}`
}

function editRekod(form, value, opt) {
  parsedRekod = JSON.parse(localStorage.getItem("rekods")); // updateTabung
  let objIndex = parsedRekod.findIndex((obj => obj.uid == form));
  let answer;

  switch (value) {
    case 'tarikh':
      answer = prompt('Ubah Tarikh?', parsedRekod[objIndex].tarikh);
      if (!answer) return;
      parsedRekod[objIndex].tarikh = answer;
      break;
    case 'perkara':
      answer = prompt('Ubah Perkara?', parsedRekod[objIndex].perkara);
      if (!answer) return;
      parsedRekod[objIndex].perkara = answer;
      break;
    case 'kategori':
      answer = prompt('Ubah Kategori?', parsedRekod[objIndex].kategori);
      if (!answer) return;
      parsedRekod[objIndex].kategori = answer;
      break;
    case 'amaun':
      answer = prompt('Ubah Amaun?', parsedRekod[objIndex].amaun);
      if (!answer) return;
      parsedRekod[objIndex].amaun = answer;
      if (opt == 'penerimaan') {
        increaseAmaun(parsedRekod[objIndex].tabung, answer);
      } else {
        decreaseAmaun(parsedRekod[objIndex].tabung, answer);
      }
      break;
  }

  localStorage.setItem('rekods', JSON.stringify(parsedRekod));
  location.reload();
  return false;
}
