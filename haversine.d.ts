declare module "haversine" {
  type GeoJSON = {
    type: "Feature";
    geometry: { coordinates: [number, number] };
  };

  type Options = {
    unit?: "km" | "mile" | "meter" | "nmi";
    format?: "[lat,lon]" | "[lon,lat]" | "{lat,lon}" | "geojson";
  };

  type Coordinates =
    | { latitude: number; longitude: number }
    | { lat: number; lon: number }
    | number[]
    | GeoJSON;

  function haversine(
    start: Coordinates,
    end: Coordinates,
    options?: Options
  ): number;
  function haversine(
    start: Coordinates,
    end: Coordinates,
    options?: Options & { threshold: number }
  ): boolean;

  export default haversine;
}
