import type { Coordinates } from '../types';


export const haversineDistance = (coord1: Coordinates, coord2: Coordinates): number => {
    const R = 3959; 

    const lat1Rad = toRadians(coord1.lat);
    const lat2Rad = toRadians(coord2.lat);
    const deltaLat = toRadians(coord2.lat - coord1.lat);
    const deltaLon = toRadians(coord2.lng - coord1.lng);

    const a =
        Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(lat1Rad) * Math.cos(lat2Rad) *
        Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;

 
    return Math.round(distance * 100) / 100;
};


export const randomDistance = (): number => {
   
    const distance = Math.random() * 49 + 1;

    return Math.round(distance * 100) / 100;
};

const toRadians = (degrees: number): number => {
    return degrees * (Math.PI / 180);
};
