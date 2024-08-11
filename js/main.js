//console.log('main.js loaded');

const max_count = 6;
const languageIndex1 = 1; 
const languageIndex2 = 2;
var correctionList;
var shuffledList1;
var shuffledList2;

//['GERMAN', 'ENGLISH', 'SLOVENIAN','ITALIAN', 'DUTCH', 'FRENCH', 'SPANISH', 'TURKISH', 'KURDISH']
loadJSON('json/colors.json').then(data => {
    if (data) {
        //console.log(data);
        //overwrite max_count if list too short.
        colorLists = shuffleAndSlice(data, max_count);
        
        //console.log(colorLists);
        correctionList = createCorrectionList(colorLists, 1, 2);
        
        //console.log(correctionList);
        
        //set global vars
        [shuffledList1, shuffledList2] = shuffleAndSelectLanguages(colorLists, languageIndex1, languageIndex2);

        //console.log("Shuffled List 1:", shuffledList1);
        //console.log("Shuffled List 2:", shuffledList2);
        
        //test = check(correctionList, shuffledList1[1], shuffledList2[1]);
        //console.log(test);
    } else {
        console.log("Failed to load JSON.");
    }
});