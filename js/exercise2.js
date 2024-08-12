var exerciseDiv = document.getElementById('exercise');
for (let i = 0; i < max_count; i++) {
  const fromLangEntry = shuffledList1[i];
  const toLangEntry = shuffledList2[i];

  // Create a new row div
  const rowDiv = document.createElement('div');
  rowDiv.className = 'exercise_wrapper';

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


fromlangelements = document.querySelectorAll('.fromlang');
tolangelements = document.querySelectorAll('.tolang');
for (let i = 0; i < max_count; i++) {
  fromlangelements[i].addEventListener('click', function() {
    fromlangelements.forEach(function(fromlang) {
      fromlang.classList.remove('selected');
    });
    tolangelements.forEach(function(tolang) {
      tolang.classList.remove('selected');
    });
    this.classList.add('selected');

    xfromLangEntry = this.innerHTML;
    xfromLangEntryElement = this;
    if (xfromLangEntry && xtoLangEntry) {
      if (check(correctionList, xfromLangEntry, xtoLangEntry)) {
        xfromLangEntryElement.classList.remove('selected');
        xtoLangEntryElement.classList.remove('selected');
        xfromLangEntryElement.classList.add('correct');
        xtoLangEntryElement.classList.add('correct');
      } else {
        console.log("not correct");
      }
      xfromLangEntry = undefined;
      xtoLangEntry = undefined;
      xfromLangEntryElement = undefined;
      xtoLangEntryElement = undefined;
    }
  });
  tolangelements[i].addEventListener('click', function() {
    fromlangelements.forEach(function(fromlang) {
      fromlang.classList.remove('selected');
    });
    tolangelements.forEach(function(tolang) {
      tolang.classList.remove('selected');
    });
    this.classList.add('selected');

    xtoLangEntry = this.innerHTML;
    xtoLangEntryElement = this;
    if (xfromLangEntry && xtoLangEntry) {
      if (check(correctionList, xfromLangEntry, xtoLangEntry)) {    
        xfromLangEntryElement.classList.remove('selected');
        xtoLangEntryElement.classList.remove('selected');
        xfromLangEntryElement.classList.add('correct');
        xtoLangEntryElement.classList.add('correct');
      } else {
        console.log("not correct");
      }
      xfromLangEntry = undefined;
      xtoLangEntry = undefined;
      xfromLangEntryElement = undefined;
      xtoLangEntryElement = undefined;
    }
  });
}