export interface Coordinates {
    lat: number;
    lng: number;
}

export interface Clinician {
    name: string;
    address: string;
    coordinates?: Coordinates;
}

export interface Lab {
    name: string;
    address: string;
    coordinates?: Coordinates;
}

export interface VisitRequest {
    patientAddress: string;
    requiresLabDropoff: boolean;
}

export interface RouteCalculation {
    clinician: Clinician;
    totalDistance: number;
    route: string[];
    routeCoordinates?: Coordinates[];
    lab?: Lab;
    calculationTimeMs: number;
}

export interface MatchResult {
    bestClinician: string;
    clinicianAddress: string;
    totalDistance: number;
    route: string[];
    routeCoordinates?: Coordinates[];
    lab?: Lab;
    calculationTimeMs: number;
    allResults?: RouteCalculation[]; 
}

export interface ValidationError {
    field: string;
    message: string;
}
