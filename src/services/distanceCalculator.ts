import type { Coordinates } from '../types';
import { haversineDistance, randomDistance } from '../utils/haversine';


export interface DistanceCalculationResult {
    distance: number;
    method: 'haversine' | 'random';
}


export const calculateDistance = (
    address1: string,
    address2: string,
    coord1?: Coordinates,
    coord2?: Coordinates
): DistanceCalculationResult => {

    if (coord1 && coord2) {
        return {
            distance: haversineDistance(coord1, coord2),
            method: 'haversine'
        };
    }

    
    return {
        distance: randomDistance(),
        method: 'random'
    };
};


export const calculateTotalDistance = (
    addresses: string[],
    coordinates?: Coordinates[]
): number => {
    let total = 0;

    for (let i = 0; i < addresses.length - 1; i++) {
        const coord1 = coordinates?.[i];
        const coord2 = coordinates?.[i + 1];

        const result = calculateDistance(
            addresses[i],
            addresses[i + 1],
            coord1,
            coord2
        );

        total += result.distance;
    }

    return total;
};
