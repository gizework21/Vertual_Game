import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

// Styled components for table rows
const StyledTableRow = styled(TableRow)(({ theme, mismatch }) => ({
  backgroundColor: mismatch ? theme.palette.error.light : theme.palette.success.light,
}));

const TrueResultRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
}));

// Utility function to strip unwanted fields
const stripFields = (obj) => {
  const { _id, __v, createdAt, updatedAt, ...rest } = obj;
  return rest;
};

// Utility function to compare two objects
const compareObjects = (obj1, obj2) => {
  return JSON.stringify(stripFields(obj1)) === JSON.stringify(stripFields(obj2));
};

export default function ComparisonTable({ comparisonResults }) {
  const { trueResults, otherResults } = comparisonResults;

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", padding: "16px" }}>
      <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
        Comparison Results
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Game ID</TableCell>
              <TableCell>Ticketer ID</TableCell>
              <TableCell>First</TableCell>
              <TableCell>Second</TableCell>
              <TableCell>Third</TableCell>
              <TableCell>Wind Odd</TableCell>
              <TableCell>Qunela Odd</TableCell>
              <TableCell>Exact Odd</TableCell>
              <TableCell>Tryfecta Odd</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trueResults.map((trueResult, index) => {
              const otherResult = otherResults.find(res => res.gameId === trueResult.gameId);
              const mismatch = !compareObjects(trueResult, otherResult);

              return (
                <React.Fragment key={index}>
                    <TrueResultRow>
                  <TableCell>{trueResult.gameId}</TableCell>
                  <TableCell>{trueResult.tiketerId}</TableCell>
                  <TableCell>{trueResult.first}</TableCell>
                  <TableCell>{trueResult.second}</TableCell>
                  <TableCell>{trueResult.third}</TableCell>
                  <TableCell>{trueResult.windOdd}</TableCell>
                  <TableCell>{trueResult.qunelaOdd}</TableCell>
                  <TableCell>{trueResult.exactOdd}</TableCell>
                  <TableCell>{trueResult.tryfectaOdd}</TableCell>
                  </TrueResultRow>
                  <StyledTableRow mismatch={mismatch}>
                  <TableCell>{otherResult ? otherResult.gameId : ''}</TableCell>
                  <TableCell>{otherResult ? otherResult.tiketerId : ''}</TableCell>
                  <TableCell>{otherResult ? otherResult.first : ''}</TableCell>
                  <TableCell>{otherResult ? otherResult.second : ''}</TableCell>
                  <TableCell>{otherResult ? otherResult.third : ''}</TableCell>
                  <TableCell>{otherResult ? otherResult.windOdd : ''}</TableCell>
                  <TableCell>{otherResult ? otherResult.qunelaOdd : ''}</TableCell>
                  <TableCell>{otherResult ? otherResult.exactOdd : ''}</TableCell>
                  <TableCell>{otherResult ? otherResult.tryfectaOdd : ''}</TableCell>
                </StyledTableRow>
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
