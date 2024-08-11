import * as React from "react";
import { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import * as XLSX from "xlsx";
import { format } from "date-fns";
import TextField from "@mui/material/TextField";
import TableComponent from "./TicketTable";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Select from "@mui/material/Select";
import axios from 'axios';
import MenuItem from "@mui/material/MenuItem";
import { BASE_URL } from "../api/baseURL";

const columns = [
  { id: "gameId", label: "Game ID", minWidth: 100 },
  { id: "tiketerId", label: "Ticketer ID", minWidth: 120 },
  { id: "first", label: "First", minWidth: 50 },
  { id: "second", label: "Second", minWidth: 50 },
  { id: "Type", label: "Type", minWidth: 50 },
  { id: "First Odd", label: "First Odd", minWidth: 50 },
  { id: "Second Odd", label: "Second Odd", minWidth: 50 },
];

const fetchDataByDate = async (selectedStartDate, selectedEndDate) => {
  const formattedStartDate = format(selectedStartDate, "MM-dd-yyyy");
  const formattedEndDate = format(selectedEndDate, "MM-dd-yyyy");
  const url = `${import.meta.env.VITE_REACT_APP_VITE_API_URL}/gameresult/filter?startDate=${formattedStartDate}&endDate=${formattedEndDate}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const fetchDataByGameId = async (gameId) => {
  const url = `${import.meta.env.VITE_REACT_APP_VITE_API_URL}/gameresult/filter?gameId=${encodeURIComponent(gameId)}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const fetchDataByDropdownValue = async (dropdownValue) => {
    const url = `${import.meta.env.VITE_REACT_APP_VITE_API_URL}/gameresult/filter`;
    try {
      const params = {};
      if (dropdownValue === 'Dog'){
        params['Type'] = "Dog";
      }else{
        params['Type'] = "Horse"
      }
    
  
      const response = await axios.get(url, {
        params: params
      });
  
      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

const fetchDefaultData = async () => {
  const url = `${import.meta.env.VITE_REACT_APP_VITE_API_URL}/gameresult`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const BlackButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: theme.palette.common.black,
  "&:hover": {
    backgroundColor: theme.palette.grey[900],
  },
}));

export default function StickyHeadTable() {
  const [selectedStartDate, setSelectedStartDate] = React.useState(null);
  const [selectedEndDate, setSelectedDateEndDate] = React.useState(null);
  const [gameId, setGameId] = React.useState("");
  const [rows, setRows] = React.useState([]);
  const [dropdownValue, setDropdownValue] = React.useState("");


  useEffect(() => {
    const loadDefaultData = async () => {
      const data = await fetchDefaultData();
      const formattedData = data.map((resalt) => ({
        gameId: resalt.gameId,
        tiketerId: resalt.tiketerId ? resalt.tiketerId.name : "",
        first: resalt.First.DogPlaceNum,
        second: resalt.Second.DogPlaceNum,
        Type: resalt.type,
        "First Odd": resalt.First.DogPlaceOdd,
        "Second Odd": resalt.Second.DogPlaceOdd,
      }));
      setRows(formattedData);
    };
    loadDefaultData();
  }, []);

  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setSelectedDateEndDate(date);
  };

  const handlegameIdChange = (event) => {
    setGameId(event.target.value);
  };

  const handleDropdownChange = async (event) => {
    const value = event.target.value;
    setDropdownValue(value);
    const data = await fetchDataByDropdownValue(value);
    const formattedData = data.map((resalt) => ({
        gameId: resalt.gameId,
        tiketerId: resalt.tiketerId ? resalt.tiketerId.name : "",
        first: resalt.First.DogPlaceNum,
        second: resalt.Second.DogPlaceNum,
        Type: resalt.type,
        "First Odd": resalt.First.DogPlaceOdd,
        "Second Odd": resalt.Second.DogPlaceOdd,
      }));
      setRows(formattedData);
  };
  
  const handleGetDataByDate = async () => {
    if (!selectedStartDate && !selectedEndDate) {
      return;
    }
    const data = await fetchDataByDate(selectedStartDate, selectedEndDate);
    const formattedData = data.map((resalt) => ({
      gameId: resalt.gameId,
      tiketerId: resalt.tiketerId ? resalt.tiketerId.name : "",
      first: resalt.First.DogPlaceNum,
      second: resalt.Second.DogPlaceNum,
      Type: resalt.type,
      "First Odd": resalt.First.DogPlaceOdd,
      "Second Odd": resalt.Second.DogPlaceOdd,
    }));
    setRows(formattedData);
  };

  const handleGetDataById = async () => {
    if (!gameId) {
      return;
    }
    const data = await fetchDataByGameId(gameId);
    const formattedData = data.map((resalt) => ({
      gameId: resalt.gameId,
      tiketerId: resalt.tiketerId ? resalt.tiketerId.name : "",
      first: resalt.First.DogPlaceNum,
      second: resalt.Second.DogPlaceNum,
      Type: resalt.type,
      "First Odd": resalt.First.DogPlaceOdd,
      "Second Odd": resalt.Second.DogPlaceOdd,
    }));
    setRows(formattedData);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tickets");

    const headers = columns.map((column) => {
      return { v: column.label, s: { fill: { bgColor: { rgb: "CCCCCC" } } } };
    });
    XLSX.utils.sheet_add_aoa(worksheet, [headers.map((h) => h.v)], {
      origin: "A1",
    });

    XLSX.writeFile(workbook, "tickets.xlsx");
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Typography
        variant="h5"
        component="div"
        sx={{ padding: "16px", fontWeight: "bold" }}
      >
        TryFecta Ticket History Page
      </Typography>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}
      >
        <TextField
          id="start-date"
          label="Select Start Date"
          type="date"
          value={selectedStartDate || ""}
          onChange={(e) => handleStartDateChange(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ marginRight: "16px", marginLeft: "16px" }}
          inputProps={{
            max: format(new Date(), "yyyy-MM-dd"),
          }}
        />

        <TextField
          id="end-date"
          label="Select End Date"
          type="date"
          value={selectedEndDate || ""}
          onChange={(e) => handleEndDateChange(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ marginRight: "16px" }}
          
        />

        <BlackButton variant="contained" sx={{ padding: "5px" }} onClick={handleGetDataByDate}>
          Get Data
        </BlackButton>

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

        <div style={{ marginLeft: "14px" }}>
          <TextField
            id="gameId"
            label="Enter Game ID"
            value={gameId}
            onChange={handlegameIdChange}
            sx={{ marginLeft: "16px" }}
          />
          <BlackButton variant="contained" sx={{ marginLeft: "15px", padding: "10px", marginTop:'5px'}} onClick={handleGetDataById}>
            Search by Game ID
          </BlackButton>
        </div>

        <div style={{ flex: 1 }} />
        <Button
          variant="contained"
          color="primary"
          onClick={exportToExcel}
          disabled={rows.length === 0}
          sx={{ marginRight: "16px", padding: "10px" }}
        >
          Export to Excel <FileDownloadIcon />
        </Button>
      </div>
      {rows.length > 0 ? (
        <TableComponent columns={columns} rows={rows} />
      ) : (
        <Typography variant="h6" component="div" sx={{ padding: "16px", textAlign: "center" }}>
          No data available
        </Typography>
      )}
    </Paper>
  );
}
