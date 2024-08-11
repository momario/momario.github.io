//console.log("load.js loaded");

// Default view
loadContent("view/home.html");

document.getElementById("view_home").addEventListener("click", function() {
    loadContent("view/home.html");
});

document.getElementById("view_impressum").addEventListener("click", function() {
    loadContent("view/impressum.html");
});

document.getElementById("view_language").addEventListener("click", function() {
    loadContent("view/settings.html");
});

function loadContent(file) {
    fetch(file)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            const contentElement = document.getElementById("content");
            contentElement.innerHTML = data;

            // Extract and execute scripts in the loaded content
            const scripts = contentElement.querySelectorAll("script");
            scripts.forEach(script => {
                const newScript = document.createElement("script");
                if (script.src) {
                    // If the script has a src attribute, copy it to the new script element
                    newScript.src = script.src;
                } else {
                    // Copy inline script content to the new script element
                    newScript.textContent = script.textContent;
                }
                document.head.appendChild(newScript); // Append the script to head to execute it
                document.head.removeChild(newScript); // Optional: remove the script after execution
            });
        })
        .catch(error => {
            console.error("There was a problem with the fetch operation:", error);
            document.getElementById("content").innerHTML = "<p>Sorry, an error occurred while loading the content.</p>";
        });
}