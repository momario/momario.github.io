$(document).ready(function() {
  $(document).on('click', '#view_numbers', function() {
    $("#header").load("view/back.html", function() {
      $("#content").load("view/numbers.html", function() {
        var $numberText = $('#numbertext');
        var $numberInput = $('#numberinput');
        var $removeButton = $('#numberremove');
        var $submitButton = $('#numbersubmit');
        var $hintButton = $('#numberhint');
        var $nextButton = $('#numbernext');
        //functions
        var randomnumber = getRandomNumber();
        //functions
        var langtocookie = getCookie("langto");
        $numberText.val(showrandomnumberastext(langtocookie, randomnumber));

        // Bind buttons' click events directly
        $('.numbers').on('click', 'button', function() {
          playSound($(this).html());
          $numberInput.val($numberInput.val() + $(this).text());
        });

        $removeButton.click(function() {
          $numberInput.val("");
          $submitButton.show();
          $hintButton.show();
          $numberText.removeClass("notcorrect correct");
          $numberInput.removeClass("notcorrect correct");
        });

        $submitButton.click(function() {
          if (!checknumber($numberInput.val(), randomnumber)) {
            $submitButton.hide();
            $hintButton.hide();
            $numberText.addClass("notcorrect");
            $numberInput.addClass("notcorrect");
          } else {
            $removeButton.hide();
            $submitButton.hide();
            $hintButton.hide();
            $numberText.addClass("correct");
            $numberInput.addClass("correct");
            speech_text(showrandomnumberastext(langtocookie, randomnumber));
          }
        });
        
        $hintButton.click(function() {
          $numberInput.val(randomnumber);
        });

        $nextButton.click(function() {
          randomnumber = getRandomNumber();
          $numberText.val(showrandomnumberastext(langtocookie, randomnumber));
          $numberInput.val("");
          $removeButton.show();
          $submitButton.show();
          $hintButton.show();
          $numberText.removeClass("notcorrect correct");
          $numberInput.removeClass("notcorrect correct");
        });
      });
    });
  });
});