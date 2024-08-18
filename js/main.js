$(document).ready(function() {

  if (!document.cookie) {
    resetCookie();
  }

  // initial page load
  $("#header").load("view/navigation.html", function() {
    // view_language is only available, when navigation.html is loaded
    $("#view_language").html(getCookieString());
    $("#content").html("");
  });

  $(document).on('click', '#view_back', function() {
    $("#header").load("view/navigation.html", function() {
      $("#view_language").html(getCookieString());
      $("#content").html("");
    });
  });

  $(document).on('click', '#view_home', function() {
    $("#header").load("view/back.html", function() {
      $("#content").load("view/home.html", function() {
        $('.exercise_button').each(function() {
          $(this).click(function() {
            var exerciseButtonId = this.id;
            $("#content").load("view/vocabulary_exercise.html");
            $.getJSON('json/' + exerciseButtonId + '.json').then(function(data) {
              if (data) {
                var max_count = 6;
                var correct_counter;
                var mistake_counter;
                var languageIndex1;
                var languageIndex2;
                var correctionList;
                var shuffledList1;
                var shuffledList2;
                var xfromLangEntry;
                var xfromLangEntryElement;
                var xtoLangEntry;
                var xtoLangEntryElement;
                console.log(data);
                // Overwrite max_count if list too short. NOT DONE YET
                correct_counter = 0;
                mistake_counter = 0;
                colorLists = shuffleAndSlice(data, max_count);
                correctionList = createCorrectionList(colorLists, languageIndex1, languageIndex2);
                // Set global vars
                              [shuffledList1, shuffledList2] = shuffleAndSelectLanguages(colorLists, languageIndex1, languageIndex2);



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
                  popupBtn.innerHTML = 'Mistakes: <b style="color: ' + mistakeColor + ';">' + mistake_counter + '</b><br>Restart';
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




              } else {
                console.log("Failed to load JSON.");
              }
            });
          });
        });
      });
    });
  });

}); //END