# nearest-string

[![NPM version](https://img.shields.io/npm/v/nearest-string.svg)](https://www.npmjs.com/package/nearest-string)

Find the nearest string with a given string (used Levenstein distance for compare string).

## Install

```
npm install --save nearest-string
```

## Usage

Basic usage:

```js
var nearestString = require('nearest-string');

var strings = [
    'foo',
    'bar',
    'baz'
];

var nearestStringKey = nearestString(strings, 'fooo').key;      // expected: 0
var nearestStringValue = nearestString(strings, 'fooo').value;  // expected: foo
var nearestStringDistance = nearestString(strings, 'fooo').distance;  // expected: 1 - Levenstein distance
var nearestStringDistances = nearestString(strings, 'fooo').distances;  // expected: [ 1, 4, 4 ] - array of Levenstein distances

```

If you want to find nearest string case insensitive use third argument as true (it's false by default):

```js
nearestString(strings, 'fooo', false).distance;  // expected: 1 - Levenstein distance case sensitive
nearestString(strings, 'Fooo', false).distance;  // expected: 2 - Levenstein distance case sensitive
nearestString(strings, 'fooo', true).distance;   // expected: 1 - Levenstein distance case insensitive
nearestString(strings, 'Fooo', true).distance;   // expected: 1 - Levenstein distance case insensitive
```

## Test

```
npm test
```
