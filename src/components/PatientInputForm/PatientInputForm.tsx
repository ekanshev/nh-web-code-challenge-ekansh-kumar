import React, { useState } from 'react';
import type { VisitRequest } from '../../types';
import { validateAddress } from '../../utils/validators';
import './PatientInputForm.css';

interface PatientInputFormProps {
    onSubmit: (request: VisitRequest) => void;
    loading: boolean;
}

export const PatientInputForm: React.FC<PatientInputFormProps> = ({ onSubmit, loading }) => {
    const [patientAddress, setPatientAddress] = useState('');
    const [requiresLabDropoff, setRequiresLabDropoff] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const validationError = validateAddress(patientAddress);
        if (validationError) {
            setError(validationError.message);
            return;
        }

       
        onSubmit({
            patientAddress: patientAddress.trim(),
            requiresLabDropoff
        });
    };

    const exampleAddresses = [
        '123 Main St, Minneapolis, MN 55401',
        '456 Oak Ave, St Paul, MN 55102',
        '789 Pine Road, Bloomington, MN 55420'
    ];

    const fillExample = (address: string) => {
        setPatientAddress(address);
        setError(null);
    };

    return (
        <div className="patient-input-form-container">
            <div className="form-header">
                <h2>New Visit Request</h2>
                <p>Enter patient details to find the optimal clinician</p>
            </div>

            <form onSubmit={handleSubmit} className="patient-input-form">
                <div className="form-group">
                    <label htmlFor="patientAddress">
                        Patient Address <span className="required">*</span>
                    </label>
                    <input
                        id="patientAddress"
                        type="text"
                        className={`form-input ${error ? 'error' : ''}`}
                        value={patientAddress}
                        onChange={(e) => {
                            setPatientAddress(e.target.value);
                            setError(null);
                        }}
                        placeholder="123 Main St, Minneapolis, MN 55401"
                        disabled={loading}
                        autoComplete="off"
                    />
                    {error && <div className="error-message">{error}</div>}

                    <div className="example-addresses">
                        <span className="example-label">Quick fill:</span>
                        {exampleAddresses.map((addr, idx) => (
                            <button
                                key={idx}
                                type="button"
                                className="example-button"
                                onClick={() => fillExample(addr)}
                                disabled={loading}
                            >
                                {addr}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={requiresLabDropoff}
                            onChange={(e) => setRequiresLabDropoff(e.target.checked)}
                            disabled={loading}
                            className="checkbox-input"
                        />
                        <span className="checkbox-text">
                            <strong>Lab Drop-off Required</strong>
                            <span className="checkbox-description">
                                Patient needs blood work or lab samples processed
                            </span>
                        </span>
                    </label>
                </div>

                <button
                    type="submit"
                    className="submit-button"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <span className="spinner"></span>
                            Finding Optimal Clinician...
                        </>
                    ) : (
                        <>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path
                                    d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 9V5h2v4h4v2h-4v4H9v-4H5V9h4z"
                                    fill="currentColor"
                                />
                            </svg>
                            Find Optimal Clinician
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};
