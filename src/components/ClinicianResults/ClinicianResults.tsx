import React from 'react';
import type { MatchResult } from '../../types';
import './ClinicianResults.css';

interface ClinicianResultsProps {
    result: MatchResult;
    onNewSearch: () => void;
}

export const ClinicianResults: React.FC<ClinicianResultsProps> = ({ result, onNewSearch }) => {
    const formatDistance = (distance: number): string => {
        return distance.toFixed(1);
    };

    const formatTime = (ms: number): string => {
        if (ms < 1) return '<1ms';
        return `${ms.toFixed(1)}ms`;
    };

    const savings = result.allResults && result.allResults.length > 1
        ? result.allResults[result.allResults.length - 1].totalDistance - result.totalDistance
        : 0;

    return (
        <div className="clinician-results-container">
           
            <div className="primary-result">
                <div className="result-badge">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                            fill="currentColor"
                        />
                    </svg>
                    <span>Optimal Match</span>
                </div>

                <h2 className="clinician-name">{result.bestClinician}</h2>

                <div className="primary-stats">
                    <div className="stat-card highlight">
                        <div className="stat-value">{formatDistance(result.totalDistance)}</div>
                        <div className="stat-label">Total Miles</div>
                    </div>

                    {result.lab && (
                        <div className="stat-card">
                            <div className="stat-value">{result.lab.name}</div>
                            <div className="stat-label">Lab Destination</div>
                        </div>
                    )}

                    <div className="stat-card">
                        <div className="stat-value">{result.route.length - 1}</div>
                        <div className="stat-label">Total Stops</div>
                    </div>
                </div>

                <div className="route-breakdown">
                    <h3>Route Breakdown</h3>
                    <div className="route-steps">
                        {result.route.map((address, index) => (
                            <div key={index} className="route-step">
                                <div className="step-icon">
                                    {index === 0 && '🏠'}
                                    {index === 1 && '🏥'}
                                    {index === 2 && result.lab && '🔬'}
                                    {index === result.route.length - 1 && index !== 0 && '🏠'}
                                </div>
                                <div className="step-details">
                                    <div className="step-number">Step {index + 1}</div>
                                    <div className="step-address">{address}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {savings > 0 && (
                    <div className="savings-alert">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path
                                d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9V9h2v4zm0-6H9V5h2v2z"
                                fill="currentColor"
                            />
                        </svg>
                        <span>
                            This route saves <strong>{formatDistance(savings)} miles</strong> compared to the furthest clinician
                        </span>
                    </div>
                )}
            </div>

            {result.allResults && result.allResults.length > 1 && (
                <div className="alternative-results">
                    <h3>Alternative Options</h3>
                    <p className="alternatives-description">
                        Other clinicians available for this visit, ranked by total distance
                    </p>

                    <div className="alternatives-grid">
                        {result.allResults.slice(1, 4).map((alt, index) => (
                            <div key={index} className="alternative-card">
                                <div className="alt-rank">#{index + 2}</div>
                                <div className="alt-name">{alt.clinician.name}</div>
                                <div className="alt-distance">{formatDistance(alt.totalDistance)} mi</div>
                                <div className="alt-difference">
                                    +{formatDistance(alt.totalDistance - result.totalDistance)} mi vs optimal
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

          
            <div className="performance-metrics">
                <div className="metric">
                    <span className="metric-label">Calculation Time:</span>
                    <span className="metric-value">{formatTime(result.calculationTimeMs)}</span>
                </div>
                <div className="metric">
                    <span className="metric-label">Clinicians Evaluated:</span>
                    <span className="metric-value">{result.allResults?.length || 1}</span>
                </div>
                <div className="metric">
                    <span className="metric-label">Algorithm:</span>
                    <span className="metric-value">Haversine Distance</span>
                </div>
            </div>

            <button onClick={onNewSearch} className="new-search-button">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                        d="M4 10h12M10 4l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                New Search
            </button>
        </div>
    );
};
