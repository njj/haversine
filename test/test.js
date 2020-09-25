const haversine = require("../dist/haversine");
const assert = require("assert");

suite("haversine", () => {
  const start = {
    latitude: 38.898556,
    longitude: -77.037852,
  };
  const startLatLon = [38.898556, -77.037852];
  const startLonLat = [-77.037852, 38.898556];
  const startLatLonObject = {
    lat: 38.898556,
    lon: -77.037852,
  };
  const startLatLngObject = {
    lat: 38.898556,
    lng: -77.037852,
  };
  const startGeoJson = {
    geometry: {
      coordinates: [-77.037852, 38.898556],
    },
  };

  const end = {
    latitude: 38.897147,
    longitude: -77.043934,
  };
  const endLatLon = [38.897147, -77.043934];
  const endLonLat = [-77.043934, 38.897147];
  const endLatLonObject = {
    lat: 38.897147,
    lon: -77.043934,
  };
  const endLatLngObject = {
    lat: 38.897147,
    lng: -77.043934,
  };
  const endGeoJson = {
    geometry: {
      coordinates: [-77.043934, 38.897147],
    },
  };

  // All tests are rounded for sanity.

  const tests = [
    [start, end, 0.341],
    [start, end, 0.549],
    [startLatLon, endLatLon, 0.341, { format: "[lat,lon]" }],
    [startLatLon, endLatLon, 0.549, { format: "[lat,lon]" }],
    [startLonLat, endLonLat, 0.341, { format: "[lon,lat]" }],
    [startLonLat, endLonLat, 0.549, { format: "[lon,lat]" }],
    [startLatLonObject, endLatLonObject, 0.341, { format: "{lon,lat}" }],
    [startLatLonObject, endLatLonObject, 0.549, { format: "{lon,lat}" }],
    [startLatLngObject, endLatLngObject, 0.341, { format: "{lat,lng}" }],
    [startLatLngObject, endLatLngObject, 0.549, { format: "{lat,lng}" }],
    [startGeoJson, endGeoJson, 0.341, { format: "geojson" }],
    [startGeoJson, endGeoJson, 0.549, { format: "geojson" }],
  ];

  tests.forEach(function (t, i) {
    if (i % 2 === 0) {
      test(
        "it should return " + t[2] + " mi for " + t[0] + " .. " + t[1],
        function () {
          assert.equal(
            Math.abs(
              (haversine(t[0], t[1], Object.assign({ unit: "mile" }, t[3])) -
                t[2]) /
                t[2]
            ).toFixed(2),
            "0.00"
          );
        }
      );
    } else {
      test(
        "it should return " + t[2] + " km for " + t[0] + " .. " + t[1],
        function () {
          assert.equal(
            Math.abs(
              (haversine(t[0], t[1], Object.assign({}, t[3])) - t[2]) / t[2]
            ).toFixed(2),
            "0.00"
          );
        }
      );
    }
  });
});
