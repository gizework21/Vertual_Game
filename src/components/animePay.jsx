// Animepay.js
import React, { useState, useRef, useEffect } from 'react';
import AnimeCard from './animeTiketDetail';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {BASE_URL} from "../api/baseURL";

const Animepay = () => {
  const [showScanner, setShowScanner] = useState(true);
  const [scannedCode, setScannedCode] = useState('');
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isScanned, setIsScanned] = useState(false);
  const [response, setResponse] = useState(null);
  const inputRef = useRef(null);
  const [dropdownValue, setDropdownValue] = useState("");

  const handleDropdownChange = async (event) => {
    const value = event.target.value;
    setDropdownValue(value);
  };

  const handleScan = (data) => {
    if (data) {
      console.log("data from scanner: ", data);
      setIsButtonClicked(true);
      setScannedCode(data.text); // data is an object with a text property
      setIsScanned(true);
      setShowScanner(false);
    }
  };

  const handleCancel = () => {
    setIsButtonClicked(false);
    setScannedCode('');
    setResponse(null);
  };

  const sendScannedCodeToServer = () => {
    if (!dropdownValue) {
      console.error('Please select an option from the dropdown.');
      return;
    }

    const url = dropdownValue === "Dog"
      ? `${import.meta.env.VITE_REACT_APP_VITE_API_URL}/animeDog/tiketId/${scannedCode}`
      : `${import.meta.env.VITE_REACT_APP_VITE_API_URL}/animeHors/tiketId/${scannedCode}`;

    fetch(url, { method: 'GET' })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setIsScanned(false);
        setResponse(data);
        setScannedCode('');
        setIsButtonClicked(true);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [showScanner, isScanned]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
      {!isButtonClicked && (
        <div style={{ position: 'relative', marginTop: '20px' }}>
          <Select
            value={dropdownValue}
            onChange={handleDropdownChange}
            displayEmpty
            sx={{ marginLeft: "16px", marginRight: "16px" }}
          >
            <MenuItem value="" disabled>
              Select an option
            </MenuItem>
            <MenuItem value="Dog">Dog</MenuItem>
            <MenuItem value="Horse">Horse</MenuItem>
          </Select>
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

      {isButtonClicked && response && (
        <AnimeCard dropdownValue={dropdownValue} handleCancele={handleCancel} anime={response} />
      )}
    </div>
  );
};

export default Animepay;
