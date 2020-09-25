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
export declare enum HaversineFormat {
    LatLonArray = "[lat,lon]",
    LonLatArray = "[lon,lat]",
    LonLatObject = "{lon,lat}",
    LatLngObject = "{lat,lng}",
    GeoJSON = "geojson"
}
