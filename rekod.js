var parsedTabung = JSON.parse(localStorage.getItem("tabungs")) || '[]';
var parsedRekod = JSON.parse(localStorage.getItem("rekods")) || '[]';

function setInput(theForm) {
  let transaksi = (theForm.elements['transaksi']).value;
  let tarikh = (theForm.elements['tarikh']).value;
  let tabung = (theForm.elements['tabung']).value;
  let perkara = (theForm.elements['perkara']).value;
  let amaun = (theForm.elements['amaun']).value;

  addRekod(transaksi, tarikh, tabung, perkara, amaun);
  document.getElementById("rekod").reset();
}

function addRekod(transaksi, tarikh, tabung, perkara, amaun) {
  console.log("Rekod: " + transaksi + tarikh, tabung, perkara, amaun);

  let rekods = [];
  let rekod = {
    "transaksi": transaksi,
    "tarikh": tarikh,
    "tabung": tabung,
    "perkara": perkara,
    "amaun": amaun
  };

  rekods.push(rekod);
  rekods = rekods.concat(JSON.parse(localStorage.getItem("rekods") || '[]'));
  console.log(rekods);

  transaksi == 'penerimaan' ? increaseAmaun(tabung, amaun): decreaseAmaun(tabung, amaun);
  localStorage.setItem("rekods", JSON.stringify(rekods));
}

function increaseAmaun(tabung, amaun) {
  parsedTabung = JSON.parse(localStorage.getItem("tabungs"));

  let objIndex = parsedTabung.findIndex((obj => obj.nama == tabung));
  parsedTabung[objIndex].amaun = parseFloat(parseFloat(parsedTabung[objIndex].amaun) + parseFloat(amaun)).toFixed(2);

  localStorage.setItem('tabungs', JSON.stringify(parsedTabung));
}

function decreaseAmaun(tabung, amaun) {
  parsedTabung = JSON.parse(localStorage.getItem("tabungs"));

  let objIndex = parsedTabung.findIndex((obj => obj.nama == tabung));
  parsedTabung[objIndex].amaun = parseFloat(parseFloat(parsedTabung[objIndex].amaun) - parseFloat(amaun)).toFixed(2);

  localStorage.setItem('tabungs', JSON.stringify(parsedTabung));
}
