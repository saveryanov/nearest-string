var chai = require('chai'),
    nearestString = require("../index");


describe("nearest-string case sensitive for 'Fooo' from ['foo', 'bar', 'baz']", function () {
    var strings = [
        'foo',
        'bar',
        'baz'
    ];
    var results = nearestString(strings, 'Fooo', false);

    it('Have all properties', function () {
        chai.should().exist(results.key);
        chai.should().exist(results.value);
        chai.should().exist(results.distance);
        chai.should().exist(results.distances);
    });

    it('Have expected key property', function () {
        chai.expect('0').to.equal(results.key);
    });

    it('Have expected value property', function () {
        chai.expect('foo').to.equal(results.value);
    });

    it('Have expected distance property', function () {
        chai.expect(2).to.equal(results.distance);
    });

    it('Have expected distances property', function () {
        chai.expect([ 2, 4, 4 ]).to.deep.equal(results.distances);
    });

});




describe("nearest-string case insensitive for 'Fooo' from ['foo', 'bar', 'baz']", function () {
    var strings = [
        'foo',
        'bar',
        'baz'
    ];
    var results = nearestString(strings, 'Fooo', true);

    it('Have all properties', function () {
        chai.should().exist(results.key);
        chai.should().exist(results.value);
        chai.should().exist(results.distance);
        chai.should().exist(results.distances);
    });

    it('Have expected key property', function () {
        chai.expect('0').to.equal(results.key);
    });

    it('Have expected value property', function () {
        chai.expect('foo').to.equal(results.value);
    });

    it('Have expected distance property', function () {
        chai.expect(1).to.equal(results.distance);
    });

    it('Have expected distances property', function () {
        chai.expect([ 1, 4, 4 ]).to.deep.equal(results.distances);
    });

});



describe(
    "nearest-string for 'brown fox jump over the lazy dog'" +
    " from {" + 
    "one: 'bar', " +
    "two: 'The quick brown fox jumps over the lazy dog', " + 
    "threee: 'Grumpy wizards make toxic brew for the evil queen and jack'}", function () {
    var strings = {
        one: 'bar',
        two: 'The quick brown fox jumps over the lazy dog',
        threee: 'Grumpy wizards make toxic brew for the evil queen and jack'
    };
    var results = nearestString(strings, 'brown fox jump over the lazy dog');

    it('Have all properties', function () {
        chai.should().exist(results.key);
        chai.should().exist(results.value);
        chai.should().exist(results.distance);
        chai.should().exist(results.distances);
    });

    it('Have expected key property', function () {
        chai.expect('two').to.equal(results.key);
    });

    it('Have expected value property', function () {
        chai.expect('The quick brown fox jumps over the lazy dog').to.equal(results.value);
    });

    it('Have expected distance property', function () {
        chai.expect(11).to.equal(results.distance);
    });

    it('Have expected distances property', function () {
        chai.expect({ one: 30, two: 11, threee: 43 }).to.deep.equal(results.distances);
    });

});




describe(
    "nearest-string don't die for object of mixed array", function () {
    var strings = {
        one: {name: 'james'},
        two: 'bar',
        threee: [1, 2, 3, 4, 5],
        four: {date: '03.01.1990', name: 'James Dudeson'},
        five: {james: "Dudeson"}
    };
    var results = nearestString(strings, {name: 'James Dudeson'});

    it('Have all properties', function () {
        chai.should().exist(results.key);
        chai.should().exist(results.value);
        chai.should().exist(results.distance);
        chai.should().exist(results.distances);
    });

    it('Have expected key property', function () {
        chai.expect('one').to.equal(results.key);
    });

    it('Have expected value property', function () {
        chai.expect({ name: 'james' }).to.deep.equal(results.value);
    });

    it('Have expected distance property', function () {
        chai.expect(8).to.equal(results.distance);
    });

    it('Have expected distances property', function () {
        chai.expect({ one: 8, two: 23, threee: 24, four: 20, five: 8 }).to.deep.equal(results.distances);
    });

});