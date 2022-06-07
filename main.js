const localStorage = window.localStorage;
var parsedTabung = JSON.parse(localStorage.getItem("tabungs")) || '[]';

function initializeTabung() {
  if (!localStorage) return;

  if (parsedTabung == '[]') return; // skip tabung info build

  let selectTabung = document.getElementById('tabung');
  for (let i = parsedTabung.length - 1; i >= 0; i--) {
    let nama = parsedTabung[i].nama;
    selectTabung.add(new Option(nama, nama));
  }

}

function menuFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

var storedTheme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
if (storedTheme)
  document.documentElement.setAttribute('data-theme', storedTheme);

function toggleMode() {
  var currentTheme = document.documentElement.getAttribute("data-theme");
  var targetTheme = "light";

  if (currentTheme == "light") {
    targetTheme = "dark";
  }

  document.documentElement.setAttribute('data-theme', targetTheme);
  localStorage.setItem('theme', targetTheme);
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
