//console.log("exercise.js loaded");

var exercise_button = document.getElementsByClassName('exercise_button');
for (var i = 0; i < exercise_button.length; i++) {
  exercise_button[i].addEventListener('click', function() {
    var exercise_button_Id = this.id;
    loadContent("view/vocabulary_exercise.html");
    loadJSON('json/' + exercise_button_Id + '.json').then(data => {
      if (data) {
        //overwrite max_count if list too short. NOT DONE YET
        correct_counter = 0;
        mistake_counter = 0;
        colorLists = shuffleAndSlice(data, max_count);
        correctionList = createCorrectionList(colorLists, languageIndex1, languageIndex2);
        //set global vars
        [shuffledList1, shuffledList2] = shuffleAndSelectLanguages(colorLists, languageIndex1, languageIndex2);
      } else {
        console.log("Failed to load JSON.");
      }
    });
  });
}