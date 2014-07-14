# Haversine
A simple haversine formula module for Node.js

I created this small module for an application I created and figured I would package it up to share.

## Installation
`$ npm install haversine`

## Usage
### haversine(start, end, options)

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
    console.log(haversine(start, end, {unit: 'km'}))
    console.log(haversine(start, end, {threshold: 1}))
    console.log(haversine(start, end, {threshold: 1, unit: 'km'}))
    
-
[MIT License](http://opensource.org/licenses/MIT)
