$(document).ready(function () {

    // Global script variables
    var correct_answers = 0;
    var wrong_answers = 0;
    var max_count = 8;
    var selected_subject = null;
    var selected_verb = null;
    var correction_dict = null;
    var clicked_subject = null;
    var clicked_verb = null;

    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;SameSite=Lax";
    }

    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function checkCookie() {
        let fromlang = getCookie("fromlang");
        let tolang = getCookie("tolang");
        if (fromlang != "" || tolang != "") {
            console.log("Cookie was already set: " + fromlang + " - " + tolang);
        } else {
            setCookie("fromlang", "german", 365);
            setCookie("tolang", "english", 365);
            alert("Cookie now set: german - english");
        }
    }                  

    $(document).on('click', '.language_select_button', function () {
        const language_split = $(this).text().split("-");
        const language_split_fromlang = language_split[0].toLowerCase();
        const language_split_tolang = language_split[1].toLowerCase();
        // alert(language_split_fromlang + language_split_tolang);
        setCookie("fromlang", language_split_fromlang, 365);
        setCookie("tolang", language_split_tolang, 365);
        alert("Cookie was changed to the values: " + language_split_fromlang + "-" + language_split_tolang);
    });

    // Always check if a Cookie is set and set the global vars
    checkCookie();
    var fromlang_cookie = getCookie("fromlang");
    var tolang_cookie = getCookie("tolang");
    $('#language_select').html(fromlang_cookie.toUpperCase() + " - " + tolang_cookie.toUpperCase());

    // TESTING THE MODAL BOX
    // $("#all_correct_div").css("display", "block");

    $.getJSON(json_file, function (data) {
        if (data.length <= max_count) {
            // alert("There are not enough elements in the data array to select random keys. Aborting.");
            // return;
            max_count = data.length;
        }

        var dict = {};

        for (var key in data) {
            dict[data[key][fromlang_cookie]] = data[key][tolang_cookie]
        }
        var correction_dict2 = dict;

        function selectRandomKeys(obj) {
            const keys = Object.keys(obj);
            const randomKeys = [];

            while (randomKeys.length < max_count) {
                const randomIndex = Math.floor(Math.random() * keys.length);
                const randomKey = keys[randomIndex];

                if (!randomKeys.includes(randomKey)) {
                    randomKeys.push(randomKey);
                }
            }

            const randomObj = {};

            randomKeys.forEach(key => {
                randomObj[key] = obj[key];
            });

            return randomObj;
        }
        const randomObj = selectRandomKeys(correction_dict2);
        correction_dict = randomObj;
        // console.log(correction_dict);

        /*shuffle function*/
        const correction_values = Object.values(correction_dict);
        // Shuffle correction_values
        for (let i = correction_values.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [correction_values[i], correction_values[j]] = [correction_values[j], correction_values[i]];
        }
        // Create new object
        const shuffled_dict = {};
        // Add key-value pairs to the new object
        const correction_keys = Object.keys(correction_dict);
        for (let i = 0; i < correction_keys.length; i++) {
            shuffled_dict[correction_keys[i]] = correction_values[i];
        }
        function shuffleObject(obj) {
            const entries = Object.entries(obj);
            const shuffled = shuffleArray(entries);
            return Object.fromEntries(shuffled);
        }
        function shuffleArray(arr) {
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr;
        }
        /*console.log(shuffled_dict);*/
        var shuffled_obj = shuffleObject(shuffled_dict);
        // console.log(shuffled_obj);

        $.each(shuffled_obj, function (subject, verb) {
            $('#output_table').append('<tr><td><input type="submit" class="button subject-button" value="' + subject + '"></td><td><input type="submit" class="button conjugation-button" value="' + verb + '"></td></tr>');
        });
    });

    $(document).on('click', '.subject-button', function () {
        selected_subject = $(this).val();
        clicked_subject = $(this);
        $("#wrong_div").css("display", "none");
        $("#correct_div").css("display", "none");
        if (selected_verb === null) {
            $('.subject-button').removeClass('selected');
            $('.conjugation-button').removeClass('selected');
            $(this).addClass('selected');
        } else {
            if (selected_verb === correction_dict[selected_subject]) {
                // console.log("Answer is correct");
                clicked_subject.addClass('grayed-out');
                clicked_verb.addClass('grayed-out');
                clicked_subject.attr("disabled", "disabled");
                clicked_verb.attr("disabled", "disabled");
                clicked_subject.removeClass('subject-button');
                clicked_verb.removeClass('conjugation-button');
                correct_answers++;
                if (correct_answers === max_count) {
                    if (wrong_answers === null || wrong_answers === "") {
                        wrong_answers = 0;
                    }
                    $("#wrong_answers_span").html(wrong_answers);
                    $("#all_correct_div").css("display", "block");
                } else {
                    $("#correct_div").css("display", "block");
                }
            } else {
                wrong_answers++;
                $("#wrong_div").css("display", "block");
            }
            $('.subject-button').removeClass('selected');
            $('.conjugation-button').removeClass('selected');
            selected_subject = null;
            selected_verb = null;
            clicked_subject = null;
            clicked_verb = null;
        }
    });

    $(document).on('click', '.conjugation-button', function () {
        selected_verb = $(this).val();
        clicked_verb = $(this);
        $("#wrong_div").css("display", "none");
        $("#correct_div").css("display", "none");
        if (selected_subject === null) {
            $('.subject-button').removeClass('selected');
            $('.conjugation-button').removeClass('selected');
            $(this).addClass('selected');
        } else {
            if (selected_verb === correction_dict[selected_subject]) {
                clicked_subject.addClass('grayed-out');
                clicked_verb.addClass('grayed-out');
                clicked_subject.attr("disabled", "disabled");
                clicked_verb.attr("disabled", "disabled");
                clicked_subject.removeClass('subject-button');
                clicked_verb.removeClass('conjugation-button');
                correct_answers++;
                if (correct_answers === max_count) {
                    if (wrong_answers === null || wrong_answers === "") {
                        wrong_answers = 0;
                    }
                    $("#wrong_answers_span").html(wrong_answers);
                    $("#all_correct_div").css("display", "block");
                } else {
                    $("#correct_div").css("display", "block");
                }
            } else {
                wrong_answers++;
                $("#wrong_div").css("display", "block");
            }
            $('.subject-button').removeClass('selected');
            $('.conjugation-button').removeClass('selected');
            selected_subject = null;
            selected_verb = null;
            clicked_subject = null;
            clicked_verb = null;
        }
    });

    $(document).on('click', '#next_verb', function () {
        wrong_answers = 0;
        location.reload();
    });

    $(document).on('click', '.conjugation-button', function() {
        switch(getCookie("tolang").toUpperCase()) {
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
            default:
                language = 'en-us';
        }
        var apiKey = '83a7a15df9bb440380724e35be5a7e68';
        var text = $(this).val();
        var audioSrc  = 'http://api.voicerss.org/?key=' + apiKey + '&hl=' + language + '&c=MP3&f=44khz_16bit_stereo&src=' + encodeURIComponent(text);
        var audio = new Audio(audioSrc);
        audio.play();
    });

});