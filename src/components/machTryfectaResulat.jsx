import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import UploadTrueResult from "./uploadTryOther";
import UploadAndCompareResults from "./uploadTryfectaTrueResalt";
import ComparisonTable from "./tryfectaMach";

const ParentComponent = () => {
  const [comparisonResults, setComparisonResults] = useState(null);

  const handleComparisonResults = (results) => {
    setComparisonResults(results);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", padding: "16px" }}>
      <Typography variant="h4" component="div" sx={{ fontWeight: "bold", marginBottom: "16px" }}>
        Ticket Result Management
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <UploadTrueResult />
        <UploadAndCompareResults onComparisonResults={handleComparisonResults} />
      </Box>
      {comparisonResults && <ComparisonTable comparisonResults={comparisonResults} />}
    </Paper>
  );
};

export default ParentComponent;
