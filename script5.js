$(document).ready(function() {

    // Global script variables
    var correct_answers = 0;
    let max_count = 0;
    var selected_subject = null;
    var selected_verb = null;
    var correction_dict = null;
    var clicked_subject = null;
    var clicked_verb = null;

    $.getJSON("regulary_verbs.json", function(data) {
        max_count = data.length;
        max_count = 10;
        var dict = {};
        let dict_counter = 0;
        for(var key in data) {
            if(dict_counter === 10) {
                break;
            }
            var value = data[key]["de"];
            // console.log(value);
            dict[data[key]["de"]] = data[key]["es"]
            dict_counter++;
        }
        console.log(dict);
        correction_dict = dict;

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
            clicked_subject.removeClass('subject-button');
            clicked_verb.removeClass('conjugation-button');
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
            clicked_subject.removeClass('subject-button');
            clicked_verb.removeClass('conjugation-button');
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

    $(document).on('click', '#next_verb', function() {
        location.reload();
    });

});