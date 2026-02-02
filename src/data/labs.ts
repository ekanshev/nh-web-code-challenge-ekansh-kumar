import type { Lab } from '../types';

/**
 * Lab locations in the Denver metro area
 * These are sample lab locations for the clinician dispatch system
 */
export const labs: Lab[] = [
    {
        id: 'lab-1',
        name: 'Denver Health Medical Center Lab',
        address: '777 Bannock St, Denver, CO 80204',
        coordinates: { lat: 39.7294, lng: -104.9889 }
    },
    {
        id: 'lab-2',
        name: 'LabCorp Denver Tech Center',
        address: '7780 S Broadway, Littleton, CO 80122',
        coordinates: { lat: 39.5807, lng: -104.9881 }
    },
    {
        id: 'lab-3',
        name: 'Quest Diagnostics - Aurora',
        address: '1444 S Potomac St, Aurora, CO 80012',
        coordinates: { lat: 39.6934, lng: -104.8247 }
    },
    {
        id: 'lab-4',
        name: 'UCHealth Laboratory Services',
        address: '12605 E 16th Ave, Aurora, CO 80045',
        coordinates: { lat: 39.7428, lng: -104.8372 }
    },
    {
        id: 'lab-5',
        name: 'LabCorp Westminster',
        address: '2955 W 88th Ave, Westminster, CO 80031',
        coordinates: { lat: 39.8589, lng: -105.0261 }
    }
];
