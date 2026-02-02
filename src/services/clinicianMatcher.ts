import type { Clinician, Lab, VisitRequest, MatchResult, RouteCalculation, Coordinates } from '../types';
import { clinicians } from '../data/clinicians';
import { labs } from '../data/labs';
import { calculateTotalDistance } from './distanceCalculator';
import { haversineDistance } from '../utils/haversine';


const findNearestLab = (patientCoords: Coordinates): Lab => {
    let nearestLab = labs[0];
    let minDistance = Infinity;

    labs.forEach(lab => {
        if (lab.coordinates) {
            const distance = haversineDistance(patientCoords, lab.coordinates);
            if (distance < minDistance) {
                minDistance = distance;
                nearestLab = lab;
            }
        }
    });

    return nearestLab;
};


const buildRoute = (
    clinician: Clinician,
    patientAddress: string,
    patientCoords: Coordinates,
    requiresLabDropoff: boolean
): { addresses: string[]; coordinates: Coordinates[]; lab?: Lab } => {
    const addresses: string[] = [clinician.address];
    const coordinates: Coordinates[] = [clinician.coordinates!];

    addresses.push(patientAddress);
    coordinates.push(patientCoords);

    let selectedLab: Lab | undefined;

  
    if (requiresLabDropoff) {
        selectedLab = findNearestLab(patientCoords);
        addresses.push(selectedLab.address);
        coordinates.push(selectedLab.coordinates!);
    }


    addresses.push(clinician.address);
    coordinates.push(clinician.coordinates!);

    return { addresses, coordinates, lab: selectedLab };
};


export const findOptimalClinician = (
    request: VisitRequest,
    patientCoords: Coordinates
): MatchResult => {
    const startTime = performance.now();

    const allResults: RouteCalculation[] = [];
    let bestResult: RouteCalculation | null = null;
    let minDistance = Infinity;

    
    clinicians.forEach(clinician => {
        if (!clinician.coordinates) {
            return; 
        }

       
        const { addresses, coordinates, lab } = buildRoute(
            clinician,
            request.patientAddress,
            patientCoords,
            request.requiresLabDropoff
        );

     
        const totalDistance = calculateTotalDistance(addresses, coordinates);

        const result: RouteCalculation = {
            clinician,
            totalDistance,
            route: addresses,
            routeCoordinates: coordinates,
            lab,
            calculationTimeMs: 0
        };

        allResults.push(result);


        if (totalDistance < minDistance) {
            minDistance = totalDistance;
            bestResult = result;
        }
    });

    const endTime = performance.now();
    const calculationTimeMs = endTime - startTime;

    if (!bestResult) {
        throw new Error('No available clinicians found');
    }

  
    allResults.sort((a, b) => a.totalDistance - b.totalDistance);

    const matchedResult = bestResult as RouteCalculation;

    return {
        bestClinician: matchedResult.clinician.name,
        clinicianAddress: matchedResult.clinician.address,
        totalDistance: matchedResult.totalDistance,
        route: matchedResult.route,
        routeCoordinates: matchedResult.routeCoordinates,
        lab: matchedResult.lab,
        calculationTimeMs,
        allResults: allResults.slice(0, 3) 
    };
};


export const getDistanceSavings = (matchResult: MatchResult): number => {
    if (!matchResult.allResults || matchResult.allResults.length < 2) {
        return 0;
    }

    const worstDistance = matchResult.allResults[matchResult.allResults.length - 1].totalDistance;
    const bestDistance = matchResult.totalDistance;

    return worstDistance - bestDistance;
};
