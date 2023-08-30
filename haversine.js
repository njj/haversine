const RADII = {
  km: 6371,  // kilometer
  mile: 3960,
  meter: 6371000,
  nmi: 3440  // nautical mile
};

// num: coordinate difference
function convertToRadian(num) {
  return num * Math.PI / 180;
}

// convert coordinates to standard format based on the passed format option
function convertCoordinates(format, coordinates) {
  switch (format) {
    case '[lat,lon]':
      return { latitude: coordinates[0], longitude: coordinates[1] };
    case '[lon,lat]':
      return { latitude: coordinates[1], longitude: coordinates[0] };
    case '{lon,lat}':
      return { latitude: coordinates.lat, longitude: coordinates.lon };
    case '{lat,lng}':
      return { latitude: coordinates.lat, longitude: coordinates.lng };
    case 'geojson':
      return { latitude: coordinates.geometry.coordinates[1], longitude: coordinates.geometry.coordinates[0] };
    case undefined:
      return coordinates;
    default:
      throw new TypeError(`Invalid format provided. Got ${JSON.stringify(format)}`);
  }
}

/**
 *  Retrieves a single file by id.
 *  @param {startCoordinates} starting coordinates in the format provided `format`
 *  @param {endCoordinates} ending coordinate in the format provided `format`
 *  @param {Object} options supply { unit = 'km', threshold, format }
 *  @param {'km' | 'meter' | 'mile' | 'nmi'} options.unit unit to use for return value and threshold comparison
 *  @param {number} [options.threshold=undefined] if defined, return boolean if coordinates are within this disitance apart
 *  @param {*} [options.format=undefined] coordinate format for starting and ending
 *  @returns {number|boolean} distance apart of threshold is undefined, else a boolean for if the distance apart is within the threshold
 */
function haversine(startCoordinates, endCoordinates, { unit = 'km', threshold, format } = {}) {
  if (!(unit in RADII)) throw new TypeError(`Invalid unit provided to haversine. Got ${unit}`);

  var R = RADII[unit];
  try {
    var start = convertCoordinates(format, startCoordinates);
    var end = convertCoordinates(format, endCoordinates);
  } catch (e) {
    throw e;
  }

  const dLat = convertToRadian(end.latitude - start.latitude);
  const dLon = convertToRadian(end.longitude - start.longitude);
  const lat1 = convertToRadian(start.latitude);
  const lat2 = convertToRadian(end.latitude);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  if (threshold) return threshold > (R * c);
  return R * c;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = haversine
}
