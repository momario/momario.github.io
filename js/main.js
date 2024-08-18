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
      $("#content").load("view/home.html");
    });
  });

  $(document).on('click', '.exercise_button', function() {
    var exerciseButtonId = this.id;
    $("#content").load("view/vocabulary_exercise.html", function() {
      //console.log(exerciseButtonId);
      //testx();
      $.getJSON('json/' + exerciseButtonId + '.json').then(function(data) {
        if (data) {
          max_count = 6;
          correct_counter = 0;
          mistake_counter = 0;
          languageIndex1 = getLanguageIndex(getCookie("langfrom"));
          languageIndex2 = getLanguageIndex(getCookie("langto"));
          let correctionList;
          let shuffledList1
          let shuffledList2;
          let xfromLangEntry
          let xtoLangEntry;
          let xfromLangEntryElement;
          let xtoLangEntryElement;

          colorLists = shuffleAndSlice(data, max_count);
          correctionList = createCorrectionList(colorLists, languageIndex1, languageIndex2);
          [shuffledList1, shuffledList2] = shuffleAndSelectLanguages(colorLists, languageIndex1, languageIndex2);

          var exerciseDiv = $('#exercise');
          exerciseDiv.empty(); // Clear any previous content

          for (let i = 0; i < max_count; i++) {
            const fromLangEntry = shuffledList1[i];
            const toLangEntry = shuffledList2[i];

            // Create a new row div
            const rowDiv = $('<div>').addClass('exercise_wrapper');

            // Create the buttons
            const fromLangButton = $('<button>').addClass('fromlang').text(fromLangEntry);
            const toLangButton = $('<button>').addClass('tolang').text(toLangEntry);

            // Append buttons to the row div
            rowDiv.append(fromLangButton).append(toLangButton);

            // Append the row div to the exercise div
            exerciseDiv.append(rowDiv);
          }

          // Event delegation for handling button clicks
          $(document).on('click', '.fromlang', function() {
            handleClick(this, true);
          });

          $(document).on('click', '.tolang', function() {
            handleClick(this, false);
          });

          function resetSelections() {
            $('.fromlang, .tolang').removeClass('selected notcorrect');
          }

          function handleClick(element, isFromLang) {
            resetSelections();
            $(element).addClass('selected');

            if (isFromLang) {
              xfromLangEntry = $(element).text();
              xfromLangEntryElement = element;
            } else {
              xtoLangEntry = $(element).text();
              xtoLangEntryElement = element;
            }

            if (xfromLangEntry && xtoLangEntry) {
              if (check(correctionList, xfromLangEntry, xtoLangEntry)) {
                $(xfromLangEntryElement).removeClass('selected').addClass('correct').prop('disabled', true);
                $(xtoLangEntryElement).removeClass('selected').addClass('correct').prop('disabled', true);
                correct_counter++;
                if (correct_counter == max_count) {
                  showPopup();
                }
              } else {
                $(xfromLangEntryElement).removeClass('selected').addClass('notcorrect');
                $(xtoLangEntryElement).removeClass('selected').addClass('notcorrect');
                mistake_counter++;
              }

              xfromLangEntry = undefined;
              xtoLangEntry = undefined;
              xfromLangEntryElement = undefined;
              xtoLangEntryElement = undefined;
            }
          }

          function showPopup() {
            var popupBg = $('<div>').addClass('popupbg');
            var popupBtn = $('<button>').addClass('popupbtn');

            // Determine color based on mistake_counter
            const mistakeColor = mistake_counter === 0 ? 'green' : 'red';
            popupBtn.html('Mistakes: <b style="color: ' + mistakeColor + ';">' + mistake_counter + '</b><br>Restart');

            $('body').append(popupBg).append(popupBtn);

            // Reload the page when the button is clicked
            popupBtn.on('click', function() {
              popupBg.remove();
              popupBtn.remove();
              location.reload();
            });
          }

        } else {
          console.log("Failed to load JSON.");
        }
      });
    });
  });

}); //END