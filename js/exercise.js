console.log("exercise.js loaded");

document.getElementById("colors").addEventListener("click", function() {
    loadContent("view/colors.html");
    //console.log(shuffledList1);
    const exerciseDiv = document.getElementById('exercise');
    for (let i = 0; i < max_count; i++) {
      const fromLangEntry = shuffledList1[i];
      const toLangEntry = shuffledList2[i];

      // Create a new row div
      const rowDiv = document.createElement('div');
      rowDiv.className = 'exercise-wrapper';
      rowDiv.style.display = 'flex';

      // Create the buttons
      const fromLangButton = document.createElement('button');
      fromLangButton.className = 'fromlang';
      fromLangButton.textContent = fromLangEntry;

      const toLangButton = document.createElement('button');
      toLangButton.className = 'tolang';
      toLangButton.textContent = toLangEntry;

      // Append buttons to the row div
      rowDiv.appendChild(fromLangButton);
      rowDiv.appendChild(toLangButton);

      // Append the row div to the exercise div
      exerciseDiv.appendChild(rowDiv);
    }
});