export interface HaversineCoordinates {
  latitude: number;
  longitude: number;
}

export interface HaversineOptions {
  unit?: string;
  format?: string;
  threshold?: number;
}

export interface HaverineRadii {
  km: number;
  mile: number;
  meter: number;
  nmi: number;
}

export enum HaversineFormat {
  LatLonArray = "[lat,lon]",
  LonLatArray = "[lon,lat]",
  LonLatObject = "{lon,lat}",
  LatLngObject = "{lat,lng}",
  GeoJSON = "geojson",
}

const haversine = (() => {
  const RADII: HaverineRadii = {
    km: 6371,
    mile: 3960,
    meter: 6371000,
    nmi: 3440,
  };

  const toRad = (num: number): number => (num * Math.PI) / 180;

  const convertCoordinates = (
    format: string,
    coordinates: any
  ): HaversineCoordinates => {
    const {
      LatLonArray,
      LonLatArray,
      LonLatObject,
      LatLngObject,
      GeoJSON,
    } = HaversineFormat;

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

  return (
    startCoordinates: number,
    endCoordinates: number,
    options?: HaversineOptions
  ): number => {
    const R = options?.unit ? RADII[options.unit] : RADII.km;

    const start = convertCoordinates(options.format, startCoordinates);
    const end = convertCoordinates(options.format, endCoordinates);

    const dLat = toRad(end.latitude - start.latitude);
    const dLon = toRad(end.longitude - start.longitude);
    const lat1 = toRad(start.latitude);
    const lat2 = toRad(end.latitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };
})();

if (typeof module !== "undefined" && module.exports) {
  module.exports = haversine;
}
