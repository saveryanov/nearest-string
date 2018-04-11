var levenshtein = require('fast-levenshtein');

function prepareString(something, toLowercase = true) {
    if (
        something.toString !== undefined && 
        typeof something.toString == 'function' && 
        something.toString() != '[object Object]'
    ) {
        something = something.toString();
    } else {
        something = JSON.stringify(something);
    }

    if (toLowercase) {
        return something.toLowerCase();
    } else {
        return something;
    }
}

module.exports = function (strings, compareString, caseInsensitive = false) {
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
            nearestStringValue = strings[stringKey];
        }
    }

    return {
        key: nearestStringKey,
        value: nearestStringValue,
        distance: minDistance,
        distances: distances
    };
}