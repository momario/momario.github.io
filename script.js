$(document).ready(function () {

    $('.excercise_button').click(function (e) {
        e.preventDefault();
        var excercise_button_id = $(this).attr('id');
        // alert(excercise_button_id);
        $("#content").load("view/category_template.html", function () {
            var json_file = 'json/' + excercise_button_id + '.json';
            load_output_table(json_file);
        });

        window.onbeforeunload = function () {
            return "Prevent page reload";
        };
    });//END

    $('#settings').click(function (e) {
        e.preventDefault();
        $("#content").load("settings.html");
    });//END

    $('#impressum').click(function (e) {
        e.preventDefault();
        $("#content").load("impressum.html");
    });//END

    $('#home_link').click(function () {
        window.onbeforeunload = null;
    });//END

    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;SameSite=Lax";
    }//END

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
    }//END

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
    }//END

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

    // Global script variables
    var correct_answers = 0;
    var max_count = 6;
    var selected_subject = null;
    var selected_verb = null;
    var clicked_subject = null;
    var clicked_verb = null;
    var fromlang_dict = [];
    var tolang_dict = [];
    var fromlang_correct_dict = [];

    //['GERMAN', 'ENGLISH', 'SLOVENIAN','ITALIAN', 'DUTCH', 'FRENCH', 'SPANISH', 'TURKISH', 'KURDISH']

    // from language specific variables
    var fromlang_id = 1;
    switch (getCookie("fromlang").toUpperCase()) {
        case 'GERMAN':
            fromlang_id = 0;
            break;
        case 'ENGLISH':
            fromlang_id = 1;
            break;
        case 'SLOVENIAN':
            fromlang_id = 2;
            break;
        case 'SPANISH':
            fromlang_id = 6;
            break;
        case 'FRENCH':
            fromlang_id = 5;
            break;
        case 'ITALIAN':
            fromlang_id = 3;
            break;
        case 'DUTCH':
            fromlang_id = 4;
            break;
        case 'TURKISH':
            fromlang_id = 7;
            break;
        case 'KURDISH':
            fromlang_id = 8;
            break;
        default:
            fromlang_id = 1;
    }

    var tolang_id = 1;
    language = 'en-us';
    switch (getCookie("tolang").toUpperCase()) {
        case 'GERMAN':
            tolang_id = 0;
            language = 'de-de';
            break;
        case 'ENGLISH':
            tolang_id = 1;
            language = 'en-us';
            break;
        case 'SLOVENIAN':
            tolang_id = 2;
            language = 'sl-si';
            break;
        case 'SPANISH':
            tolang_id = 6;
            language = 'es-es';
            break;
        case 'FRENCH':
            tolang_id = 5;
            language = 'fr-fr';
            break;
        case 'ITALIAN':
            tolang_id = 3;
            language = 'it-it';
            break;
        case 'DUTCH':
            tolang_id = 4;
            language = 'nl-nl';
            break;
        case 'TURKISH':
            tolang_id = 7;
            language = 'tr-tr';
            break;
        case 'KURDISH':
            tolang_id = 8;
            language = 'tr-tr';
            break;
        default:
            tolang_id = 1;
            language = 'en-us';
    }

    // Shuffle the data array to get random sublists
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function getElementId(list, element) {
        for (let i = 0; i < list.length; i++) {
            if (list[i] === element) {
                return i;
            }
        }
        return "";
    }

    function load_output_table(json_file) {
        // var json_file = {};
        $.getJSON(json_file, function (data) {
            if (data.length <= max_count) {
                // alert("There are not enough elements in the data array to select random keys. Aborting.");
                // return;
                max_count = data.length;
            }

            // Choose how many random sublists you want
            const numRandomSublists = max_count;

            // Get the random sublists
            const shuffledData = shuffleArray(data);
            const randomSublists = shuffledData.slice(0, numRandomSublists);
            // console.log(randomSublists);
            // DE - EN - SL - IT - NL - FR - ES - TR - KU
            // [["Hund", "dog", "pes", "cane", "hond", "chien", "perro", "köpek", "sî"], ...] : length = 8

            fromlang_dict = [];
            for (var key in randomSublists) {
                fromlang_dict.push(randomSublists[key][fromlang_id]);
                fromlang_correct_dict.push(randomSublists[key][tolang_id]);
            }

            tolang_dict = [];
            for (var key in randomSublists) {
                tolang_dict.push(randomSublists[key][tolang_id]);
            }

            // console.log(fromlang_dict);
            // console.log(tolang_dict);
            var shuffledtolang_dict = shuffleArray(tolang_dict);
            // console.log(shuffledtolang_dict);

            for (var i = 0; i < max_count; i++) {
                $('#output_table').append('<tr><td><input type="submit" class="left_button" value="' + fromlang_dict[i] + '"></td><td><input type="submit" class="right_button" value="' + shuffledtolang_dict[i] + '"></td></tr>');
            }
        });
    }

    $(document).on('click', '.left_button', function () {
        selected_subject = $(this).val();
        clicked_subject = $(this);
        if (selected_verb === null) {
            $('.left_button').removeClass('selected');
            $('.right_button').removeClass('selected');
            $('.left_button').removeClass('error_button');
            $('.right_button').removeClass('error_button');
            $(this).addClass('selected');
        } else {
            if (getElementId(fromlang_dict, selected_subject) === getElementId(fromlang_correct_dict, selected_verb)) {
                clicked_subject.addClass('grayed_out');
                clicked_verb.addClass('grayed_out');
                clicked_subject.attr("disabled", "disabled");
                clicked_verb.attr("disabled", "disabled");
                correct_answers++;
                if (correct_answers === max_count) {
                    $("#next_button").css("visibility", "visible");
                }
            } else {
                $(this).addClass('error_button');
                $(this).addClass('error_shake');
                setTimeout(function () {
                    $(this).removeClass('error_shake');
                }, 600);
            }
            $('.left_button').removeClass('selected');
            $('.right_button').removeClass('selected');
            selected_subject = null;
            selected_verb = null;
            clicked_subject = null;
            clicked_verb = null;
        }
    });

    $(document).on('click', '.right_button', function () {
        selected_verb = $(this).val();
        clicked_verb = $(this);
        if (selected_subject === null) {
            $('.left_button').removeClass('selected');
            $('.right_button').removeClass('selected');
            $('.left_button').removeClass('error_button');
            $('.right_button').removeClass('error_button');
            $(this).addClass('selected');
        } else {
            if (getElementId(fromlang_dict, selected_subject) === getElementId(fromlang_correct_dict, selected_verb)) {
                clicked_subject.addClass('grayed_out');
                clicked_verb.addClass('grayed_out');
                clicked_subject.attr("disabled", "disabled");
                clicked_verb.attr("disabled", "disabled");
                correct_answers++;
                if (correct_answers === max_count) {
                    $("#next_button").css("visibility", "visible");
                }
            } else {
                $(this).addClass('error_button');
                $(this).addClass('error_shake');
                setTimeout(function () {
                    $(this).removeClass('error_shake');
                }, 600);
            }
            $('.left_button').removeClass('selected');
            $('.right_button').removeClass('selected');
            selected_subject = null;
            selected_verb = null;
            clicked_subject = null;
            clicked_verb = null;
        }
    });

    $(document).on('click', '#next_button', function (e) {
        e.preventDefault();
        //shuffle of objects not implemented
        // $('.left_button').removeClass('grayed_out');
        // $('.left_button').removeAttr('disabled');
        // $('.right_button').removeClass('grayed_out');
        // $('.right_button').removeAttr('disabled');
        // $('#next_button').css('visibility','hidden');
        //so the next button goes to home instead
        window.onbeforeunload = null;
        window.location.reload();
    });//END

    $(document).on('click', '.right_button', function () {
        var apiKey = '83a7a15df9bb440380724e35be5a7e68';
        var text = $(this).val();
        var audioSrc = 'http://api.voicerss.org/?key=' + apiKey + '&hl=' + language + '&c=MP3&f=44khz_16bit_stereo&src=' + encodeURIComponent(text);
        var audio = new Audio(audioSrc);
        audio.play();
    });

});