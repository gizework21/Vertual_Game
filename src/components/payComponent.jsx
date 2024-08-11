// ScanButton.js
import React, { useState, useRef, useEffect } from 'react';
import { QrReader } from 'react-qr-reader';
import GrayhornCard  from './try'
import {BASE_URL} from "../api/baseURL";

const ScanButton = () => {
  const [showScanner, setShowScanner] = useState(true);
  const [scannedCode, setScannedCode] = useState('');
  const [isbubitcliked, setIsbubitcliked] =useState(false)
  const [isScanned, setIsScanned] = useState(false);
  const [response ,SetResponse] = useState({})
  const inputRef = useRef(null);

  const handleScan = (data) => {
    if (data) {
      console.log("data from scanner: ", data);
      setIsbubitcliked(true)
      setScannedCode(data.text); // data is an object with a text property
      setIsScanned(true);
      setShowScanner(false);
    }
  };

  const handleCancel = () => {
    setIsbubitcliked(false)
    console.error(err);
  };

  const sendScannedCodeToServer = (code) => {
    console.log("scannedCode ",scannedCode)

    fetch(`${import.meta.env.VITE_REACT_APP_VITE_API_URL}/grayhorn/tiketId/${scannedCode}`, {
      method: 'Get',
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setIsScanned(false);
        SetResponse(data)
        setScannedCode('');
        setIsbubitcliked(true)
      })
      .catch((error) => {
        console.error('Errorsss:', error);
      });
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [showScanner, isScanned]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      {!isbubitcliked && (
        <div style={{ position: 'relative', marginTop: '20px' }}>
          <input
        ref={inputRef}
        type="text"
        value={scannedCode}
        onChange={(e) => setScannedCode(e.target.value)}
        placeholder="Scanned code will appear here"
        style={{ marginTop: '20px', padding: '10px', fontSize: '16px', width: '300px' }}
        disabled={isScanned}
      />
      <button 
        onClick={sendScannedCodeToServer} 
        style={{ padding: '10px 20px', fontSize: '16px', marginTop: '20px' }}
      >
        Submit
      </button>
        </div>
      )}
     
      {isbubitcliked ?( <GrayhornCard handleCancele={handleCancel} grayhorn={response}/>):console.log("")}
    </div>
  );
};

export default ScanButton;
