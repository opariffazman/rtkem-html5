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

function generateUID() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

function addRekod(transaksi, tarikh, tabung, perkara, amaun) {
  let uid = generateUID();
  console.log("Rekod: " + uid, transaksi, tarikh, tabung, perkara, amaun);

  let rekods = [];
  let rekod = {
    "uid": uid,
    "transaksi": transaksi,
    "tarikh": tarikh,
    "tabung": tabung,
    "perkara": perkara,
    "amaun": amaun
  };

  rekods.push(rekod);
  rekods = rekods.concat(JSON.parse(localStorage.getItem("rekods") || '[]'));
  console.log(rekods);

  transaksi == 'penerimaan' ? increaseAmaun(tabung, amaun) : decreaseAmaun(tabung, amaun);
  localStorage.setItem("rekods", JSON.stringify(rekods));
}
