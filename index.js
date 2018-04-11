var levenshtein = require('fast-levenshtein');

function prepareString(string, toLowercase = true) {
    string = string.toString !== undefined ? string.toString() : string; 
    if (toLowercase) {
        return string.toLowerCase();
    } else {
        return string;
    }
}

module.exports = function (strings, compareString, caseInsensitive = true) {
    var distances;
    if (Array.isArray(strings)) {
        distances = [];
    } else {
        distances = {};
    }
    var minDistance = -1;
    var nearestStringKey = null;
    var nearestStringValue = null;

    compareString = prepareString(compareString, caseInsensitive); 

    for (let stringKey in strings) {
        var string = prepareString(strings[stringKey], caseInsensitive);
        distances[stringKey] = levenshtein.get(string, compareString);

        if (minDistance == -1 || minDistance > distances[stringKey]) {
            minDistance = distances[stringKey];
            nearestStringKey = stringKey;
            nearestStringValue = string;
        }
    }

    return {
        key: nearestStringKey,
        value: nearestStringValue,
        distance: minDistance,
        distances: distances
    };
}