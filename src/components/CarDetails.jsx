// ...new file...
import React from 'react';
import './../pages/ApiPage.css';

export default function CarDetails({ data }) {
  if (!data) return null;

  // Example response shape observed:
  // { car_name: 'bmw_x5', specs: ['3.0L Turbocharged Engine', '335 HP', ...], ... }
  const { car_name, specs, ...rest } = data;

  return (
    <div style={{ maxWidth: 800 }}>
      {car_name && (
        <div style={{ marginBottom: 8 }}>
          <strong>Car:</strong> <span style={{ color: '#e94560' }}>{car_name}</span>
        </div>
      )}

      {Array.isArray(specs) && specs.length > 0 && (
        <div style={{ marginBottom: 8 }}>
          <strong>Specs:</strong>
          <ul style={{ marginTop: 6 }}>
            {specs.map((s, i) => (
              <li key={i} style={{ color: 'white' }}>{s}</li>
            ))}
          </ul>
        </div>
      )}

      {/* show remaining fields and raw payload for inspection */}
      {Object.keys(rest).length > 0 && (
        <div style={{ marginTop: 8 }}>
          <strong>Other:</strong>
          <pre style={{ marginTop: 6, background: 'rgba(0,0,0,0.3)', padding: 8, borderRadius: 6 }}>
            {JSON.stringify(rest, null, 2)}
          </pre>
        </div>
      )}

      <div style={{ marginTop: 8 }}>
        <strong>Raw Response:</strong>
        <pre style={{ marginTop: 6, background: 'rgba(0,0,0,0.3)', padding: 8, borderRadius: 6 }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
}
// ...new file...