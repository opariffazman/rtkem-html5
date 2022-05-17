const localStorage = window.localStorage;
function initializeTabung() {
  if (localStorage) {
    const tabungA = localStorage.getItem("tabungA") || "A";
    const tabungB = localStorage.getItem("tabungB") || "B";
    const tabungC = localStorage.getItem("tabungC") || "C";
    const tabungD = localStorage.getItem("tabungD") || "D";

    document.getElementById("tabungA").innerHTML = `${tabungA}`;
    document.getElementById("tabungB").innerHTML = `${tabungB}`;
    document.getElementById("tabungC").innerHTML = `${tabungC}`;
    document.getElementById("tabungD").innerHTML = `${tabungD}`;
  }
}

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

  console.log(tarikh, destinasi, perkara, amaun, amaunBaru);
  document.getElementById("rekod").reset();
}
