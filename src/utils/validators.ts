import type { ValidationError } from '../types';

export const validateAddress = (address: string): ValidationError | null => {
    const trimmed = address.trim();

    if (!trimmed) {
        return {
            field: 'patientAddress',
            message: 'Patient address is required'
        };
    }

    if (trimmed.length < 10) {
        return {
            field: 'patientAddress',
            message: 'Please enter a complete address'
        };
    }

    const hasNumber = /\d/.test(trimmed);
    const hasComma = trimmed.includes(',');

    if (!hasNumber) {
        return {
            field: 'patientAddress',
            message: 'Address should include a street number'
        };
    }

    if (!hasComma) {
        return {
            field: 'patientAddress',
            message: 'Please use format: Street, City, State ZIP'
        };
    }

    return null;
};


export const geocodeAddress = async (address: string): Promise<{ lat: number; lng: number } | null> => {
 
    const defaultCoordinates = { lat: 44.9778, lng: -93.2650 }; 

    return {
        lat: defaultCoordinates.lat + (Math.random() - 0.5) * 0.1,
        lng: defaultCoordinates.lng + (Math.random() - 0.5) * 0.1
    };
};
