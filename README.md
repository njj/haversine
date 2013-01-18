# Haversine
A simple haversine formula module for Node.js

I created this small module for an application I created and figured I would package it up to share.

## Installation
`$ npm install haversine`

## Usage
### haversine(start, end, options)

    var haversine = require('haversine')

    start = {
      latitude: 10,
      longitude: 11,
    }
    end = {
      latitude: 11,
      longitude: 10
    }

    console.log(haversine(start, stop))
    console.log(haversine(start, stop, {unit: 'km'}))

## Future
I plan on adding more options soon including a threshold check.