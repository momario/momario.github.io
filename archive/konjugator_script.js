$(document).ready(function() {

    // Global script variables
    var correct_answers = 0;
    var selected_subject = null;
    var selected_verb = null;
    var correction_dict = null;
    var clicked_subject = null;
    var clicked_verb = null;

    // Define the regular verb conjugation JSON
    const regularVerbConjugation = {
        "ar": {
            "present": ["o", "as", "a", "amos", "áis", "an"],
            "preterite": ["é", "aste", "ó", "amos", "asteis", "aron"],
            "imperfect": ["aba", "abas", "aba", "ábamos", "abais", "aban"],
            "future": ["aré", "arás", "ará", "aremos", "aréis", "arán"],
            "conditional": ["aría", "arías", "aría", "aríamos", "aríais", "arían"]
        },
        "er": {
            "present": ["o", "es", "e", "emos", "éis", "en"],
            "preterite": ["í", "iste", "ió", "imos", "isteis", "ieron"],
            "imperfect": ["ía", "ías", "ía", "íamos", "íais", "ían"],
            "future": ["eré", "erás", "erá", "eremos", "eréis", "erán"],
            "conditional": ["ería", "erías", "ería", "eríamos", "eríais", "erían"]
        },
        "ir": {
            "present": ["o", "es", "e", "imos", "ís", "en"],
            "preterite": ["í", "iste", "ió", "imos", "isteis", "ieron"],
            "imperfect": ["ía", "ías", "ía", "íamos", "íais", "ían"],
            "future": ["iré", "irás", "irá", "iremos", "iréis", "irán"],
            "conditional": ["iría", "irías", "iría", "iríamos", "iríais", "irían"]
        }
    };

    // Function to get the verb ending
    function getVerbEnding(verb) {
        // Get the last two characters of the verb
        const lastTwoCharacters = verb.slice(-2);
        // If the last two characters match a regular verb ending, return it
        if (lastTwoCharacters === "ar"
        || lastTwoCharacters === "er"
        ||  lastTwoCharacters === "ir") {
            return lastTwoCharacters;
        }
        // If the verb doesn't end in a regular verb ending, return null
        return null;
    }

    // Example usage:
    // const verb = "vivir";
    // const tense = "preterite"
    // const conjugation = conjugateRegularVerb(verb, tense);
    // console.log(conjugation);
    // Output:
    // {
    //   "yo": "como",
    //   "tú": "comes",
    //   "él/ella/usted": "come",
    //   "nosotros/nosotras": "comemos",
    //   "vosotros/vosotras": "coméis",
    //   "ellos/ellas/ustedes": "comen"
    // }
    // Function to conjugate a regular verb
    function conjugateRegularVerb(verb, tense) {
        // Get the verb ending
        const verbEnding = getVerbEnding(verb);
        // If the verb ending is null, return null
        if (verbEnding === null) {
            return null;
        }
        // Get the conjugation for the verb ending from the regular verb conjugation JSON
        const verbConjugation = regularVerbConjugation[verbEnding];
        // Conjugate the verb using the present tense conjugation
        const conjugation = {
            "yo": verb.slice(0, -2) + verbConjugation[tense][0],
            "tú": verb.slice(0, -2) + verbConjugation[tense][1],
            "él/ella/usted": verb.slice(0, -2) + verbConjugation[tense][2],
            "nosotros/nosotras": verb.slice(0, -2) + verbConjugation[tense][3],
            "vosotros/vosotras": verb.slice(0, -2) + verbConjugation[tense][4],
            "ellos/ellas/ustedes": verb.slice(0, -2) + verbConjugation[tense][5],
        };
        return conjugation;
    }


    // Functions for showing information boxes
    function hide_wrong_answer() {
        $("#wrong_div").css("display","none");
    }
    function hide_correct_answer() {
        $("#correct_div").css("display","none");
    }
    function show_wrong_answer() {
        $("#wrong_div").css("display","block");
    }
    function show_correct_answer() {
        $("#correct_div").css("display","block");
    }
    function show_all_correct_answer() {
        if(correct_answers === 6) {
        $("#all_correct_div").css("display","block");
        }
    }

    // Example usage:
    // var randomNumber = getRandomNumber(1, 10);
    // console.log(randomNumber);
    // Function to generate a random number between min (inclusive) and max (inclusive)
    function getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    $.getJSON("regulary_verbs.json", function(data) {
        const tense = "present" //present, preterite, imperfect, future, conditional
        var random_list_number = getRandomNumber(0, data.length-1);
        const random_verb = data[random_list_number];
        const random_verb_es = random_verb["es"];
        const random_verb_de = random_verb["de"];
        $("#random_verb_es").text(random_verb_es + " (" + random_verb_de + ")");
        $(document).on('click', '#next_verb', function() {
            location.reload();
        });

        // console.log(random_verb_es);
        // console.log(random_verb_de);
        const conjugation = conjugateRegularVerb(random_verb_es, tense);
        correction_dict = conjugation;
        console.log(correction_dict);
        /*console.log(data);*/

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
        console.log(shuffled_obj);

        $.each(shuffled_obj, function(subject, verb) {
        /*console.log(subject + ': ' + verb);*/
        $('#output_table').append('<tr><td><input type="submit" class="button subject-button" value="'+ subject +'"></td><td><input type="submit" class="button conjugation-button" value="'+ verb +'"></td></tr>');  
        });
    });

   
    $(document).on('click', '.subject-button', function() {
        selected_subject = $(this).val();
        clicked_subject = $(this);
        $("#wrong_div").css("display","none");
        $("#correct_div").css("display","none");
        if(selected_verb === null) {
        $('.subject-button').removeClass('selected');
        $('.conjugation-button').removeClass('selected');
        $(this).addClass('selected');
        } else {
        if(selected_verb === correction_dict[selected_subject]) {
            console.log("Answer is correct");
            clicked_subject.addClass('grayed-out');
            clicked_verb.addClass('grayed-out');
            clicked_subject.attr("disabled", "disabled");
            clicked_verb.attr("disabled", "disabled");
            correct_answers++;
            $("#correct_div").css("display","block");
            if(correct_answers === max_count) {
                $("#all_correct_div").css("display","block");
            }
        } else {
            $("#wrong_div").css("display","block");
        }
        $('.subject-button').removeClass('selected');
        $('.conjugation-button').removeClass('selected');
        selected_subject = null;
        selected_verb = null;
        clicked_subject = null;
        clicked_verb = null;
        }
    });

    $(document).on('click', '.conjugation-button', function() {
        selected_verb = $(this).val();
        clicked_verb = $(this);
        $("#wrong_div").css("display","none");
        $("#correct_div").css("display","none");
        if(selected_subject === null) {
        $('.subject-button').removeClass('selected');
        $('.conjugation-button').removeClass('selected');
        $(this).addClass('selected');
        } else {
        if(selected_verb === correction_dict[selected_subject]) {
            clicked_subject.addClass('grayed-out');
            clicked_verb.addClass('grayed-out');
            clicked_subject.attr("disabled", "disabled");
            clicked_verb.attr("disabled", "disabled");
            correct_answers++;
            $("#correct_div").css("display","block");
            if(correct_answers === max_count) {
                $("#all_correct_div").css("display","block");
            }
        } else {
            $("#wrong_div").css("display","block");
        }
        $('.subject-button').removeClass('selected');
        $('.conjugation-button').removeClass('selected');
        selected_subject = null;
        selected_verb = null;
        clicked_subject = null;
        clicked_verb = null;
        }
    });

});