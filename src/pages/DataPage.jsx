import { useState } from 'react';
import { api } from '../services/api';
import './ApiPage.css';

function DataPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [itemId, setItemId] = useState('');
  const [history, setHistory] = useState([]);

  const handleGetData = async (e) => {
    e.preventDefault();

    if (!itemId || isNaN(itemId)) {
      setError('Please enter a valid numeric item ID');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await api.getData(itemId);
      setResult(data);
      setHistory(prev => [
        { id: itemId, data, timestamp: new Date() },
        ...prev.slice(0, 4)
      ]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadFromHistory = (historyItem) => {
    setItemId(historyItem.id);
    setResult(historyItem.data);
    setError(null);
  };

  return (
    <div className="api-page">
      <div className="page-header">
        <h1>🔍 Data Query</h1>
        <p>Retrieve data for specific items by ID</p>
      </div>

      <div className="api-card">
        <div className="endpoint-info">
          <span className="method-badge get">GET</span>
          <code className="endpoint">/data/:item_id</code>
        </div>

        <form onSubmit={handleGetData} className="data-form">
          <div className="form-group">
            <label htmlFor="itemId">Item ID:</label>
            <input
              type="number"
              id="itemId"
              value={itemId}
              onChange={(e) => setItemId(e.target.value)}
              placeholder="Enter item ID (e.g., 42)"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className="action-button"
            disabled={loading || !itemId}
          >
            {loading ? 'Fetching...' : 'Get Data'}
          </button>
        </form>

        {loading && (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Retrieving data for item {itemId}...</p>
          </div>
        )}

        {error && (
          <div className="error-box">
            <span className="error-icon">❌</span>
            <div>
              <strong>Error:</strong>
              <p>{error}</p>
            </div>
          </div>
        )}

        {result && (
          <div className="success-box">
            <span className="success-icon">✅</span>
            <div>
              <strong>Response:</strong>
              <pre>{JSON.stringify(result, null, 2)}</pre>
            </div>
          </div>
        )}

        {history.length > 0 && (
          <div className="history-section">
            <h3>Recent Queries</h3>
            <div className="history-list">
              {history.map((item, index) => (
                <div
                  key={index}
                  className="history-item"
                  onClick={() => loadFromHistory(item)}
                >
                  <div className="history-id">Item {item.id}</div>
                  <div className="history-time">
                    {item.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="info-section">
        <h3>About This Endpoint</h3>
        <p>The data endpoint accepts an item ID as a path parameter and returns associated data for that item. Use any numeric ID to retrieve corresponding information.</p>
        <div className="info-grid">
          <div className="info-item">
            <strong>Parameter:</strong>
            <span>item_id (integer)</span>
          </div>
          <div className="info-item">
            <strong>Response Time:</strong>
            <span>Instant</span>
          </div>
          <div className="info-item">
            <strong>Use Case:</strong>
            <span>Data Retrieval</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataPage;
