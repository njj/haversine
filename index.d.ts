declare namespace haversine {
  export interface Coordinate {
    longitude: number;
    latitude: number;
  }

  export interface Options {
    unit?: 'km' | 'mile' | 'meter' | 'nmi';
    threshold?: number;
  }
}

declare function haversine(
  start: haversine.Coordinate,
  end: haversine.Coordinate,
  options?: haversine.Options
): number

export = haversine;
