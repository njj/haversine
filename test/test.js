var haversine = require('../haversine');

start = {
  latitude: 30.849635,
  longitude: -83.24559
}

end = {
  latitude: 27.950575,
  longitude: -82.457178
}

// inserting values directly
console.log(haversine({latitude: 12, longitude: 11}, {latitude: 10, longitude: 10}))

// using objects
console.log(haversine(start, end))

// using objects with unit conversion
console.log(haversine(start, end, {unit: 'km'}))

// utilizing the threshold option
console.log(haversine(start, end, {threshold: 1}))

// utilizing the threshold option & unit conversion
console.log(haversine(start, end, {threshold: 1, unit: 'km'}))