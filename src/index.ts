export interface IHaversineCoordinates {
    latitude: number;
    longitude: number;
}

export interface IHaversineOptions {
    unit?: string;
    format?: string;
}

export enum HaversineFormat {
    LatLonArray = '[lat,lon]',
    LonLatArray = '[lon,lat]',
    LonLatObject = '{lon,lat}',
    LatLngObject = '{lat,lng}',
    GeoJSON = 'geojson'
}

export enum HaversineUnit {
    km = 'km',
    meter = 'meter',
    mile = 'mile',
    nmi = 'nmi'
}

class Haversine {
    private readonly RADII = {
        km: 6371,
        meter: 6371000,
        mile: 3960,
        nmi: 3440
    };

    public distance(startCoordinates: any, endCoordinates: any, options?: IHaversineOptions): number {
        const haversine = this.haversine(startCoordinates, endCoordinates, options);
        return haversine;
    }

    public withinDistance(
        startCoordinates: any,
        endCoordinates: any,
        threshold: number,
        options?: IHaversineOptions): boolean {
        const haversine = this.haversine(startCoordinates, endCoordinates, options);
        if (isNaN(Number(threshold))) {
            throw new TypeError('Invalid threshold value');
        }
        return haversine < threshold;
    }

    private haversine(startCoordinates: any, endCoordinates: any, options?: IHaversineOptions): number {
        options = options || {};

        const radius = options.unit in this.RADII
            ? this.RADII[options.unit]
            : this.RADII.km;

        const startCoords = this.convertCoordinates(options.format, startCoordinates);
        const endCoords = this.convertCoordinates(options.format, endCoordinates);

        const diffLat = this.toRad(endCoords.latitude - startCoords.latitude);
        const diffLng = this.toRad(endCoords.longitude - startCoords.longitude);
        const startLat = this.toRad(startCoords.latitude);
        const endLat = this.toRad(endCoords.latitude);

        const a = Math.sin(diffLat / 2) * Math.sin(diffLat / 2) +
            Math.sin(diffLng / 2) * Math.sin(diffLng / 2) * Math.cos(startLat) * Math.cos(endLat);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const result = radius * c;
        if (isNaN(result)) {
            throw new TypeError('Invalid haversine calculation');
        }
        return result;
    }

    private convertCoordinates(format: string, coordinates: any): IHaversineCoordinates {
        let convertedCoordinates: IHaversineCoordinates;
        switch (format) {
            case HaversineFormat.LatLonArray:
                convertedCoordinates = this.createHaversineCoordinates(coordinates[0], coordinates[1]);
                break;
            case HaversineFormat.LonLatArray:
                convertedCoordinates = this.createHaversineCoordinates(coordinates[1], coordinates[0]);
                break;
            case HaversineFormat.LonLatObject:
                convertedCoordinates = this.createHaversineCoordinates(coordinates.lat, coordinates.lon);
                break;
            case HaversineFormat.LatLngObject:
                convertedCoordinates = this.createHaversineCoordinates(coordinates.lat, coordinates.lng);
                break;
            case HaversineFormat.GeoJSON:
                convertedCoordinates = this.createHaversineCoordinates(
                    coordinates.geometry.coordinates[1],
                    coordinates.geometry.coordinates[0]);
                break;
            default:
                convertedCoordinates = coordinates;
        }
        return convertedCoordinates;
    }

    private createHaversineCoordinates(latitude: number, longitude: number): IHaversineCoordinates {
        return { latitude, longitude };
    }

    private toRad(num: number): number {
        return num * Math.PI / 180;
    }
}

export function distance(
    startCoordinates: any,
    endCoordinates: any,
    options?: IHaversineOptions
): number {
    return new Haversine().distance(startCoordinates, endCoordinates, options);
}

export function withinDistance(
    startCoordinates: any,
    endCoordinates: any,
    threshold: number,
    options?: IHaversineOptions
): boolean {
    return new Haversine().withinDistance(startCoordinates, endCoordinates, threshold, options);
}
