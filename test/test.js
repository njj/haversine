var haversine = require('../haversine')
  , assert = require('assert')

suite('haversine', function(){

    var start = {
      latitude: 38.898556,
      longitude: -77.037852
    }
    var startLatLon = [38.898556, -77.037852]
    var startLonLat = [-77.037852, 38.898556]
    var startLatLonObject = {
      lat: 38.898556,
      lon: -77.037852
    }
    var startLatLngObject = {
      lat: 38.898556,
      lng: -77.037852
    }
    var startGeoJson = {
      geometry: {
        coordinates: [-77.037852, 38.898556]
      }
    }

    var end = {
      latitude: 38.897147,
      longitude: -77.043934
    }
    var endLatLon = [38.897147, -77.043934]
    var endLonLat = [-77.043934, 38.897147]
    var endLatLonObject = {
      lat: 38.897147,
      lon: -77.043934
    }
    var endLatLngObject = {
      lat: 38.897147,
      lng: -77.043934
    }
    var endGeoJson = {
      geometry: {
        coordinates: [-77.043934, 38.897147]
      }
    }

    // All tests are rounded for sanity.

    var tests = [
        [start, end, 0.341],
        [start, end, 0.549],
        [startLatLon, endLatLon, 0.341, { format: '[lat,lon]' }],
        [startLatLon, endLatLon, 0.549, { format: '[lat,lon]' }],
        [startLonLat, endLonLat, 0.341, { format: '[lon,lat]' }],
        [startLonLat, endLonLat, 0.549, { format: '[lon,lat]' }],
        [startLatLonObject, endLatLonObject, 0.341, { format: '{lon,lat}' }],
        [startLatLonObject, endLatLonObject, 0.549, { format: '{lon,lat}' }],
        [startLatLngObject, endLatLngObject, 0.341, { format: '{lat,lng}' }],
        [startLatLngObject, endLatLngObject, 0.549, { format: '{lat,lng}' }],
        [startGeoJson, endGeoJson, 0.341, { format: 'geojson' }],
        [startGeoJson, endGeoJson, 0.549, { format: 'geojson' }],
    ]

    tests.forEach(function(t, i) {
        if (i % 2 === 0) {
            test('it should return ' + t[2] + ' mi for ' + t[0] + ' .. ' + t[1], function(){
                assert.equal(Math.abs((haversine(t[0], t[1], Object.assign({unit: 'mile'}, t[3]))-t[2])/t[2]).toFixed(2), "0.00")
            })
        } else {
            test('it should return ' + t[2] + ' km for ' + t[0] + ' .. ' + t[1], function(){
                assert.equal(Math.abs((haversine(t[0], t[1], Object.assign({}, t[3]))-t[2])/t[2]).toFixed(2), "0.00")
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
