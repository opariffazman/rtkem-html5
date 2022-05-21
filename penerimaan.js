function setInput(theForm) {
  let tarikh = (theForm.elements['tarikh']).value;
  let destinasi = (theForm.elements['destinasi']).value;
  let perkara = (theForm.elements['perkara']).value;
  let amaun = (theForm.elements['amaun']).value;
  let tabungDestinasi = '';

  if (destinasi == 'tabungA') {
    tabungDestinasi = 'amaunA';
  } else if (destinasi == 'tabungB') {
    tabungDestinasi = 'amaunB';
  } else if (destinasi == 'tabungC') {
    tabungDestinasi = 'amaunC';
  } else if (destinasi == 'tabungD') {
    tabungDestinasi = 'amaunD';
  }

  const tabungStorage = localStorage.getItem(tabungDestinasi) || 0;
  const amaunBaru = parseFloat(tabungStorage) + parseFloat(amaun);
  localStorage.setItem(tabungDestinasi, amaunBaru);

  addNewRekod(tarikh, destinasi, perkara, amaun);
  document.getElementById("rekod").reset();
}

function addNewRekod(tarikh, destinasi, perkara, amaun) {
  let destinasiTabung = localStorage.getItem(`${destinasi}`) || destinasi;

  console.log("Rekod: " + tarikh, destinasiTabung, perkara, amaun);

  var rekods = [];

  var rekod = {
    "tarikh": tarikh,
    "tabung": destinasiTabung,
    "perkara": perkara,
    "amaun": amaun
  };

  rekods.push(rekod);
  rekods = rekods.concat(JSON.parse(localStorage.getItem("rekods")||'[]'));
  console.log(rekods);

  localStorage.setItem("rekods", JSON.stringify(rekods));
};
