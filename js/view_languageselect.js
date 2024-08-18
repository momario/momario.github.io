$(document).ready(function() {
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
});