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
  let sumber = (theForm.elements['sumber']).value;
  let perkara = (theForm.elements['perkara']).value;
  let amaun = (theForm.elements['amaun']).value;
  let tabungSumber = '';

  if (sumber == 'tabungA') {
    tabungSumber = 'amaunA';
  } else if (sumber == 'tabungB') {
    tabungSumber = 'amaunB';
  } else if (sumber == 'tabungC') {
    tabungSumber = 'amaunC';
  } else if (sumber == 'tabungD') {
    tabungSumber = 'amaunD';
  }

  const tabungStorage = localStorage.getItem(tabungSumber) || 0;
  const amaunBaru = parseFloat(tabungStorage) - parseFloat(amaun);
  localStorage.setItem(tabungSumber, amaunBaru);

  console.log(tarikh, sumber, perkara, amaun, amaunBaru);
  document.getElementById("rekod").reset();
}
