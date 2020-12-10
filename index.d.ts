type Input =
  | { latitude: number; longitude: number }
  | [number, number]
  | { lon: number; lat: number }
  | { lat: number; lng: number }

export default function (
  start: Input,
  end: Input,
  options?: {
    unit?: 'km' | 'mile' | 'meter' | 'nmi'
    threshold?: boolean
    format?: '[lat,lon]' | '[lon,lat]' | '{lon,lat}' | '{lat,lng}' | 'geojson'
  }
): number
