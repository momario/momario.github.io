$(document).ready(function() {

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

  $(document).on('click', '#view_language', function() {
    $("#header").load("view/back.html", function() {
      $("#content").load("view/settings.html", function() {

        function resetLanguageSelection() {
          // Remove the 'selected' class from all elements (just in case)
          $(".langfrom, .langto").removeClass("selected");

          // Add the 'selected' class to the currently selected languages
          $(".langfrom").filter(function() {
            return $(this).text().trim() === getCookie("langfrom");
          }).addClass("selected");

          $(".langto").filter(function() {
            return $(this).text().trim() === getCookie("langto");
          }).addClass("selected");
          $("#view_language").html(getCookieString());
        }

        // reset language
        resetLanguageSelection();

        // Event handlers
        $(".langfrom").click(function() {
          setCookie("langfrom", $(this).text().trim(), 7);
          resetLanguageSelection();
        });

        $(".langto").click(function() {
          setCookie("langto", $(this).text().trim(), 7);
          resetLanguageSelection();
        });

        $("#langreset").click(function() {
          resetCookie();
          resetLanguageSelection();
        });
      });
    });
  });

  $(document).on('click', '#view_home', function() {
    $("#header").load("view/back.html", function() {
      $("#content").load("view/home.html");
    });
  });


  $('.exercise_button').each(function() {
    $(this).click(function() {
      var exerciseButtonId = this.id;
      $("#content").load("view/vocabulary_exercise.html");
      $.getJSON('json/' + exerciseButtonId + '.json').then(function(data) {
        if (data) {
          // Overwrite max_count if list too short. NOT DONE YET
          correct_counter = 0;
          mistake_counter = 0;
          colorLists = shuffleAndSlice(data, max_count);
          correctionList = createCorrectionList(colorLists, languageIndex1, languageIndex2);
          // Set global vars
                      [shuffledList1, shuffledList2] = shuffleAndSelectLanguages(colorLists, languageIndex1, languageIndex2);
        } else {
          console.log("Failed to load JSON.");
        }
      });
    });
  });

  function speech_text(text) {
    let language = 'en-us';
    switch (getCookie("langto").toUpperCase()) {
      case 'GERMAN':
        language = 'de-de';
        break;
      case 'ENGLISH':
        language = 'en-us';
        break;
      case 'SLOVENIAN':
        language = 'sl-si';
        break;
      case 'SPANISH':
        language = 'es-es';
        break;
      case 'FRENCH':
        language = 'fr-fr';
        break;
      case 'ITALIAN':
        language = 'it-it';
        break;
      case 'DUTCH':
        language = 'nl-nl';
        break;
      case 'TURKISH':
        language = 'tr-tr';
        break;
      case 'KURDISH':
        language = 'tr-tr';
        break;
      default:
        language = 'en-us';
    }
    var apiKey = '83a7a15df9bb440380724e35be5a7e68';
    var audioSrc = 'http://api.voicerss.org/?key=' + apiKey + '&hl=' + language + '&c=MP3&f=44khz_16bit_stereo&src=' + encodeURIComponent(text);
    var audio = new Audio(audioSrc);
    audio.play();
  }

}); //END