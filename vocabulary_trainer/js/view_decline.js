$(document).ready(function() {

  $(document).on('click', '#view_test', function() {
    $("#header").load("view/back.html", function() {
      $("#content").load("view/navigation_decline.html");
    });
  });

  $(document).on('click', '.decline_button', function() {
    // Log the ID of the clicked button
    var decline_nav_button_id = $(this).attr('id');
    console.log(decline_nav_button_id);
    $("#header").load("view/back.html", function() {
      $("#content").load("view/decline.html", function() {
        $.getJSON('json/verbs.json').done(data => {
          if (data) {
            const decline_langfrom = getCookie("langfrom").toUpperCase();
            const decline_langto = getCookie("langto").toUpperCase();
            const verbname = $("#verbname");
            const verbs = Object.keys(data.verbs);
            const verbKey = verbs[decline_nav_button_id];
            const decline_selected_verb = data.verbs[verbKey];
            const verb_base_langfrom = decline_selected_verb.base[decline_langfrom];
            const verb_base_langto = decline_selected_verb.base[decline_langto];

            if (verb_base_langfrom && verb_base_langto) {
              verbname.html(`${verb_base_langfrom.toUpperCase()} - ${verb_base_langto.toUpperCase()}`);
            } else {
              console.error('Verb base forms are undefined or language mismatch.');
              verbname.html('Verb forms not found.');
            }

            const presenceSubjects = data.subjects[decline_langto];

            const updateVerbForms = (timePeriod) => {
              decline_selected_verb.languages[decline_langto][timePeriod].forEach((form, index) => {
                const element = $(`#${timePeriod}-${index + 1}`);
                if (element.length) {
                  element.text(presenceSubjects[index] + " " + form);
                  element.click(function() {
                    speech_text($(this).html());
                  });
                }
              });
            };

            updateVerbForms('presence');
            updateVerbForms('future');
            updateVerbForms('past');

            // Scroll one card to the right
            const cardWrapper = $('.cardwrapper');
            cardWrapper.animate({
              scrollLeft: '+=' + cardWrapper.width()
            }, 500); // Adjust duration (500ms) as needed

          }
        }).fail(() => {
          console.error('Failed to load JSON data.');
        });
      });
    });
  });
});