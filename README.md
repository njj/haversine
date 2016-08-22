# Haversine
A simple haversine formula module for Node.js

## Installation
`$ npm install haversine`

## Usage
### haversine (start, end, options)

    var haversine = require('haversine')

    start = {
      latitude: 30.849635,
      longitude: -83.24559
    }
    end = {
      latitude: 27.950575,
      longitude: -82.457178
    }

    console.log(haversine(start, end))
    console.log(haversine(start, end, {unit: 'mile'}))
    console.log(haversine(start, end, {unit: 'meter'}))
    console.log(haversine(start, end, {threshold: 1}))
    console.log(haversine(start, end, {threshold: 1, unit: 'mile'}))
    console.log(haversine(start, end, {threshold: 1, unit: 'meter'}))


#### api
- `options.unit` - Unit of measurement applied to result (default `km`)
- `options.threshold` - If passed, will result in library returning `boolean` value of whether or not the start and end points are within that supplied threshold.  (default `null`)


[MIT License](http://opensource.org/licenses/MIT)
