import React from 'react';
import './Header.css';

export const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="header-content">
                <div className="logo-section">
                    <div className="logo-icon">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <path
                                d="M16 2L4 8v12c0 7.18 4.84 13.92 12 16 7.16-2.08 12-8.82 12-16V8l-12-6z"
                                fill="currentColor"
                            />
                            <path
                                d="M13 19l-3-3-1.41 1.41L13 21.83l8-8-1.41-1.41L13 19z"
                                fill="white"
                            />
                        </svg>
                    </div>
                    <div className="logo-text">
                        <h1>Nice Healthcare</h1>
                        <p>Clinician Dispatch Dashboard</p>
                    </div>
                </div>
                
            </div>
        </header>
    );
};
