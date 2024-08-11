import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import axios from 'axios';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import {BASE_URL} from "../api/baseURL";


const BlackButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: theme.palette.common.black,
  "&:hover": {
    backgroundColor: theme.palette.grey[900],
  },
}));

export default function UploadTrueResult() {
  const [file, setFile] = useState(null);

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) {
      alert("Please upload a file");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post(`${import.meta.env.VITE_REACT_APP_VITE_API_URL}/anime-result-checkup/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file');
    }
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", padding: "16px" }}>
      <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
        Upload True Result File
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "16px" }}>
        <TextField
          type="file"
          inputProps={{ accept: ".xlsx, .xls" }}
          onChange={handleFileUpload}
        />
        <BlackButton variant="contained" onClick={uploadFile} startIcon={<FileUploadIcon />}>
          Upload File
        </BlackButton>
      </Box>
    </Paper>
  );
}
