function loadJSON(json_file) {
    return fetch(json_file)
        .then(response => response.json())
        .catch(error => {
            console.error('Error loading JSON:', error);
            return null;
        });
}
//call the function and use then, to process the data from the promise object