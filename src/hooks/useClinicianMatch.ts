import { useState } from 'react';
import type { MatchResult, VisitRequest } from '../types';
import { findOptimalClinician } from '../services/clinicianMatcher';
import { geocodeAddress } from '../utils/validators';

interface UseClinicianMatchState {
    loading: boolean;
    result: MatchResult | null;
    error: string | null;
}

interface UseClinicianMatchReturn extends UseClinicianMatchState {
    findMatch: (request: VisitRequest) => Promise<void>;
    reset: () => void;
}


export const useClinicianMatch = (): UseClinicianMatchReturn => {
    const [state, setState] = useState<UseClinicianMatchState>({
        loading: false,
        result: null,
        error: null
    });

    const findMatch = async (request: VisitRequest): Promise<void> => {
        setState({ loading: true, result: null, error: null });

        try {
         
            const patientCoords = await geocodeAddress(request.patientAddress);

            if (!patientCoords) {
                throw new Error('Unable to geocode patient address. Please check the address and try again.');
            }

           
            const matchResult = findOptimalClinician(request, patientCoords);

            setState({
                loading: false,
                result: matchResult,
                error: null
            });
        } catch (err) {
            setState({
                loading: false,
                result: null,
                error: err instanceof Error ? err.message : 'An unexpected error occurred'
            });
        }
    };

    const reset = () => {
        setState({ loading: false, result: null, error: null });
    };

    return {
        ...state,
        findMatch,
        reset
    };
};
