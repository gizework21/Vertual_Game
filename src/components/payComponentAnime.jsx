// ScanButton.js
import React, { useState } from 'react';
// import QrScanner from 'react-qr-scanner';
import { QrReader } from 'react-qr-reader';
import {BASE_URL} from "../api/baseURL";

const ScanButton = () => {
  const [showScanner, setShowScanner] = useState(false);
  const [scannedCode, setScannedCode] = useState(null);

  const handleScan = (data) => {
    if (data) {
      setScannedCode(data.text); // data is an object with a text property
      setShowScanner(false);
      sendScannedCodeToServer(data.text);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const sendScannedCodeToServer = (code) => {
    fetch(`${import.meta.env.VITE_REACT_APP_VITE_API_URL}/animehors/tiketId/${code}`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <button onClick={() => setShowScanner(!showScanner)} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Scan QR Code
      </button>
      {showScanner && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '100%' }}
          />
        </div>
      )}
    </div>
  );
};

export default ScanButton;
