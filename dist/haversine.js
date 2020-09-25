"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HaversineFormat = void 0;
var HaversineFormat;
(function (HaversineFormat) {
    HaversineFormat["LatLonArray"] = "[lat,lon]";
    HaversineFormat["LonLatArray"] = "[lon,lat]";
    HaversineFormat["LonLatObject"] = "{lon,lat}";
    HaversineFormat["LatLngObject"] = "{lat,lng}";
    HaversineFormat["GeoJSON"] = "geojson";
})(HaversineFormat = exports.HaversineFormat || (exports.HaversineFormat = {}));
var haversine = (function () {
    var RADII = {
        km: 6371,
        mile: 3960,
        meter: 6371000,
        nmi: 3440,
    };
    var toRad = function (num) { return (num * Math.PI) / 180; };
    var convertCoordinates = function (format, coordinates) {
        var LatLonArray = HaversineFormat.LatLonArray, LonLatArray = HaversineFormat.LonLatArray, LonLatObject = HaversineFormat.LonLatObject, LatLngObject = HaversineFormat.LatLngObject, GeoJSON = HaversineFormat.GeoJSON;
        switch (format) {
            case LatLonArray:
                return { latitude: coordinates[0], longitude: coordinates[1] };
            case LonLatArray:
                return { latitude: coordinates[1], longitude: coordinates[0] };
            case LonLatObject:
                return { latitude: coordinates.lat, longitude: coordinates.lon };
            case LatLngObject:
                return { latitude: coordinates.lat, longitude: coordinates.lng };
            case GeoJSON:
                return {
                    latitude: coordinates.geometry.coordinates[1],
                    longitude: coordinates.geometry.coordinates[0],
                };
            default:
                return coordinates;
        }
    };
    return function (startCoordinates, endCoordinates, options) {
        var R = (options === null || options === void 0 ? void 0 : options.unit) ? RADII[options.unit] : RADII.km;
        var start = convertCoordinates(options.format, startCoordinates);
        var end = convertCoordinates(options.format, endCoordinates);
        var dLat = toRad(end.latitude - start.latitude);
        var dLon = toRad(end.longitude - start.longitude);
        var lat1 = toRad(start.latitude);
        var lat2 = toRad(end.latitude);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };
})();
if (typeof module !== "undefined" && module.exports) {
    module.exports = haversine;
}
