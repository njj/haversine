# Haversine
A simple haversine formula module for Node.js

## Installation
`$ npm install haversine`

## Usage
### haversine (start, end, options)

    const haversine = require('haversine')

    const start = {
      latitude: 30.849635,
      longitude: -83.24559
    }

    const end = {
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
- `options.unit` - Unit of measurement applied to result (default `km`, available `km, mile, meter, nmi`)
- `options.threshold` - If passed, will result in library returning `boolean` value of whether or not the start and end points are within that supplied threshold.  (default `null`)
- `options.format` - The format of start and end coordinate arguments. See table below for available values. (default `null`)

| Format        | Example
| ------------- |--------------------------|
| `undefined` (default) | `{ latitude: 30.849635, longitude: -83.24559] }`
| `[lat,lon]`   | `[30.849635, -83.24559]`
| `[lon,lat]`   | `[-83.24559, 30.849635]`
| `{lat,lon}`   | `{ lat: 30.849635, lon: -83.24559] }`
| `geojson`     | `{ type: 'Feature', geometry: { coordinates: [-83.24559, 30.849635] } }`


[MIT License](http://opensource.org/licenses/MIT)
