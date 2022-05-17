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

    const amaunA = parseFloat(localStorage.getItem("amaunA") || 0).toFixed(2);
    const amaunB = parseFloat(localStorage.getItem("amaunB") || 0).toFixed(2);
    const amaunC = parseFloat(localStorage.getItem("amaunC") || 0).toFixed(2);
    const amaunD = parseFloat(localStorage.getItem("amaunD") || 0).toFixed(2);

    document.getElementById("amaunA").innerHTML = `${amaunA}`;
    document.getElementById("amaunB").innerHTML = `${amaunB}`;
    document.getElementById("amaunC").innerHTML = `${amaunC}`;
    document.getElementById("amaunD").innerHTML = `${amaunD}`;

    const amaunSemua = parseFloat(amaunA) + parseFloat(amaunB) + parseFloat(amaunC) + parseFloat(amaunD);
    document.getElementById("amaunSemua").innerHTML = `RM ${parseFloat(amaunSemua).toFixed(2)}`;
  }
}

var tdA = document.getElementById('tabungA')

tdA.addEventListener('input', function () {
  localStorage.setItem("tabungA", tdA.innerHTML)
  console.log(tdA.innerHTML)
})

var tdB = document.getElementById('tabungB')

tdB.addEventListener('input', function () {
  localStorage.setItem("tabungB", tdB.innerHTML)
  console.log(tdB.innerHTML)
})

var tdC = document.getElementById('tabungC')

tdC.addEventListener('input', function () {
  localStorage.setItem("tabungC", tdC.innerHTML)
  console.log(tdC.innerHTML)
})

var tdD = document.getElementById('tabungD')

tdD.addEventListener('input', function () {
  localStorage.setItem("tabungD", tdD.innerHTML)
  console.log(tdD.innerHTML)
})
