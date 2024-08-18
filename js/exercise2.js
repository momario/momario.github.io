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

function resetSelections() {
  fromlangelements.forEach(function(fromlang) {
    fromlang.classList.remove('selected', 'notcorrect');
  });
  tolangelements.forEach(function(tolang) {
    tolang.classList.remove('selected', 'notcorrect');
  });
}

function handleClick(element, isFromLang) {
  resetSelections();
  element.classList.add('selected');

  if (isFromLang) {
    xfromLangEntry = element.innerHTML;
    xfromLangEntryElement = element;
  } else {
    xtoLangEntry = element.innerHTML;
    xtoLangEntryElement = element;
  }

  if (xfromLangEntry && xtoLangEntry) {
    if (check(correctionList, xfromLangEntry, xtoLangEntry)) {
      xfromLangEntryElement.classList.remove('selected');
      xtoLangEntryElement.classList.remove('selected');
      xfromLangEntryElement.classList.add('correct');
      xtoLangEntryElement.classList.add('correct');
      xfromLangEntryElement.disabled = true;
      xtoLangEntryElement.disabled = true;
      correct_counter++;
      if (correct_counter == max_count) {
        showPopup();
      }
    } else {
      xfromLangEntryElement.classList.remove('selected');
      xtoLangEntryElement.classList.remove('selected');
      xfromLangEntryElement.classList.add('notcorrect');
      xtoLangEntryElement.classList.add('notcorrect');
      mistake_counter++;
    }

    xfromLangEntry = undefined;
    xtoLangEntry = undefined;
    xfromLangEntryElement = undefined;
    xtoLangEntryElement = undefined;
  }
}

function showPopup() {
  var popupBg = document.createElement('div');
  popupBg.className = 'popupbg';
  var popupBtn = document.createElement('button');
  // Determine color based on mistake_counter
  const mistakeColor = mistake_counter === 0 ? 'green' : 'red';
  popupBtn.innerHTML = 'Mistakes: <b style="color: '+mistakeColor+';">'+mistake_counter+'</b><br>Restart';
  popupBtn.className = 'popupbtn';
  document.body.appendChild(popupBg);
  document.body.appendChild(popupBtn);

  // Reload the page when the button is clicked
  popupBtn.addEventListener('click', function() {
    document.body.removeChild(popupBg); // Corrected
    document.body.removeChild(popupBtn); // Corrected
    location.reload();
  });
}

for (let i = 0; i < max_count; i++) {
  fromlangelements[i].addEventListener('click', function() {
    handleClick(this, true);
  });
  tolangelements[i].addEventListener('click', function() {
    handleClick(this, false);
  });
}