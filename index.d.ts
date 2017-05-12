interface LatLng {
  latitude: number;
  longitude: number;
}
export default function haversine(start: LatLng, end: LatLng, options?: {unit: string, threshold?: number}): number | boolean;
