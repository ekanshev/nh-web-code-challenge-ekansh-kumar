import React from 'react';
import { Header } from './components/Header/Header';
import { PatientInputForm } from './components/PatientInputForm/PatientInputForm';
import { ClinicianResults } from './components/ClinicianResults/ClinicianResults';
import { useClinicianMatch } from './hooks/useClinicianMatch';
import './App.css';

function App() {
  const { loading, result, error, findMatch, reset } = useClinicianMatch();

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <div className="container">
          {!result && (
            <div className="intro-section">
              <h2>Find the Perfect Clinician for Every Visit</h2>
              <p>
                Our intelligent dispatch system automatically matches patients with the optimal clinician
                based on location, lab requirements, and real-time availability.
              </p>

              <div className="feature-grid">
                <div className="feature-item">
                  <span className="feature-icon">⚡</span>
                  <span className="feature-text">Real-time Optimization</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">📍</span>
                  <span className="feature-text">Haversine Distance</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🔬</span>
                  <span className="feature-text">Lab Integration</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">🎯</span>
                  <span className="feature-text">Smart Routing</span>
                </div>
              </div>
            </div>
          )}

          {!result && <PatientInputForm onSubmit={findMatch} loading={loading} />}

          {error && (
            <div className="error-alert">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"
                  fill="currentColor"
                />
              </svg>
              <div>
                <strong>Error</strong>
                <p>{error}</p>
              </div>
            </div>
          )}

          {result && <ClinicianResults result={result} onNewSearch={reset} />}
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>About This System</h4>
              <p>
                This clinician dispatch dashboard optimizes healthcare delivery by automatically
                matching patients with the nearest available clinician, factoring in lab drop-off
                requirements and minimizing total travel distance.
              </p>
            </div>

            <div className="footer-section">
              <h4>Key Features</h4>
              <ul>
                <li>Haversine distance calculations for accuracy</li>
                <li>Automatic lab routing optimization</li>
                <li>Sub-millisecond matching algorithm</li>
                <li>Alternative clinician suggestions</li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Technologies</h4>
              <ul>
                <li>React 18 with TypeScript</li>
                <li>Vite for blazing-fast development</li>
                <li>Custom distance calculation engine</li>
                <li>Responsive modern UI design</li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© 2026 Nice Healthcare - Clinician Dispatch System</p>
            <p className="footer-note">Built with ❤️ for better healthcare delivery</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
