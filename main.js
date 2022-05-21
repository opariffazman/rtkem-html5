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

function toggleMode () {
  var currentTheme = document.documentElement.getAttribute("data-theme");
  var targetTheme = "light";

  if (currentTheme === "light") {
    targetTheme = "dark";
  }

  document.documentElement.setAttribute('data-theme', targetTheme);
  localStorage.setItem('theme', targetTheme);
}
