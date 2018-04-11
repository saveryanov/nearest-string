var levenshtein = require('fast-levenshtein');

module.exports = function (strings, compareString) {
    var distances;
    if (Array.isArray(strings)) {
        distances = [];
    } else {
        distances = {};
    }
    var minDistance = -1;
    var nearestStringKey = null;
    var nearestStringValue = null;
    for (let stringKey in strings) {
        var string = strings[stringKey];
        distances[stringKey] = levenshtein.get(
            string.toString !== undefined ? string.toString() : string, 
            compareString.toString !== undefined ? compareString.toString() : compareString
        );

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