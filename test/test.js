var haversine = require('../haversine')
  , assert = require('assert')

suite('haversine', function(){

    var start = {
      latitude: 38.898556,
      longitude: -77.037852
    }

    var end = {
      latitude: 38.897147,
      longitude: -77.043934
    }

    // All tests are rounded for sanity.

    var tests = [
        [start, end, 0.341],
        [start, end, 0.549]
    ]

    tests.forEach(function(t, i) {
        if (i === 0) {
            test('it should return ' + t[2] + ' mi for ' + t[0] + ' .. ' + t[1], function(){
                assert.equal(Math.abs((haversine(t[0],t[1], {unit: 'mile'})-t[2])/t[2]).toFixed(2), "0.00")
            })
        } else {
            test('it should return ' + t[2] + ' km for ' + t[0] + ' .. ' + t[1], function(){
                assert.equal(Math.abs((haversine(t[0],t[1])-t[2])/t[2]).toFixed(2), "0.00")
            })
        }
    })

    test('it should return false that distance is within 1 mi threshold', function(){
        assert.equal(false, haversine(tests[0], tests[0], {threshold: 1}))
    })

    test('it should return false that distance is within 1 km threshold', function(){
        assert.equal(false, haversine(tests[1], tests[1], {threshold: 1, unit: 'km'}))
    })
})
