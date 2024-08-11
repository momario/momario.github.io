console.log("languageselect.js loaded");

document.querySelectorAll(".langfrom").forEach(function(button) {
    button.addEventListener("click", function() {
        const langfrom = button.innerHTML.trim();
        setCookie("langfrom", langfrom, 7);
        updateLanguage();
        showCookie("updated");
    });
});

document.querySelectorAll(".langto").forEach(function(button) {
    button.addEventListener("click", function() {
        const langto = button.innerHTML.trim();
        setCookie("langto", langto, 7);
        updateLanguage();
        showCookie("updated");
    });
});

document.getElementById("langreset").addEventListener("click", function() {
    resetCookie();
    updateLanguage();
});