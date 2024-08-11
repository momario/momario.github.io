//console.log("cookie.js loaded");

if(!document.cookie) {
  resetCookie();
  updateLanguage();
} else {
  updateLanguage();
}

function updateLanguage() {
  let langfrom = getCookie("langfrom");
  let langto = getCookie("langto");
  //console.log(langfrom);
  //console.log(langto);
  document.getElementById("view_language").innerHTML = langfrom + "-" + langto;
}

function showCookie(message) {
  console.log("cookie " + message + ": " + document.cookie);
}

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    let cookieArr = document.cookie.split(";");
    for(let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].trim();
        if (cookiePair.startsWith(name + "=")) {
            return cookiePair.substring(name.length + 1);
        }
    }
    return null;
}

function resetCookie() {
  setCookie("langfrom", "DE", 7);
  setCookie("langto", "EN", 7);
  showCookie("reset");
}