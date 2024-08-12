function shuffleArray(array) {
    // Create a shallow copy of the array to avoid mutating the original array
    const shuffledArray = array.slice();

    // Use the Fisher-Yates shuffle algorithm
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }

    return shuffledArray;
}

function shuffleAndSlice(array, max_count) {
    const shuffledArray = shuffleArray(array);
    return shuffledArray.slice(0, max_count);
}

function createCorrectionList(initialArray, languageIndex1, languageIndex2) {
    const correctionList = [];

    // Iterate over each sublist in the initial array
    for (let i = 0; i < initialArray.length; i++) {
        const yfromLangEntry = initialArray[i][languageIndex1];
        const ytoLangEntry = initialArray[i][languageIndex2];
        correctionList.push({ from: yfromLangEntry, to: ytoLangEntry });
    }

    return correctionList;
}

function shuffleAndSelectLanguages(colorLists, languageIndex1, languageIndex2) {
    // Shuffle the array of lists twice for two separate lists
    const shuffledColors1 = shuffleArray(colorLists);
    const shuffledColors2 = shuffleArray(colorLists);

    // Create two separate lists based on the language indexes
    const selectedColors1 = shuffledColors1.map(sublist => sublist[languageIndex1]);
    const selectedColors2 = shuffledColors2.map(sublist => sublist[languageIndex2]);

    return [selectedColors1, selectedColors2];
}

function check(correctionList, xxxfromLangEntry, xxxtoLangEntry) {
    for (let pair of correctionList) {
        if (pair.from === xxxfromLangEntry && pair.to === xxxtoLangEntry) {
            return true;
        }
    }
    return false;
}