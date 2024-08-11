import * as React from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent, Typography, List, ListItem, ListItemText, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { format } from "date-fns";
import Barcode from "react-barcode";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: "auto",
  marginTop: theme.spacing(5),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
  borderRadius: theme.shape.borderRadius,
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(4),
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(1),
  padding: theme.spacing(2),
  boxShadow: theme.shadows[2],
}));

const TicketDetails = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

const formatDate = (dateString) => {
  return format(new Date(dateString), "MM/dd/yyyy");
};

export default function AnimeInvoice() {
  const location = useLocation();
  const ticket = location.state?.ticket;

  console.log(ticket);

  if (!ticket) {
    return (
      <StyledCard>
        <StyledCardContent>
          <StyledTypography variant="h5" component="div" gutterBottom>
            Ticket Invoice
          </StyledTypography>
          <StyledTypography variant="body1" component="div">
            No ticket data available.
          </StyledTypography>
        </StyledCardContent>
      </StyledCard>
    );
  }

  return (
    <StyledCard>
      <StyledCardContent>
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">

        <StyledTypography variant="body1" component="div" gutterBottom align="center" mt={-5} fontSize={30} sx={{backgroundColor:"#d7a022"}}>
          3-S Betting
        </StyledTypography>

        <StyledTypography variant="body1" component="div" align="center" fontSize={19} mt={-2}>
            <strong>Game ID:</strong> {ticket.gameId}
          </StyledTypography>
          
          <Box mb={0} mt={-2}>
            <Barcode value={ticket.tiketId} width={2} height={30} fontSize={18} />
          </Box>
          
        </Box>
        <TicketDetails>
          <Box>
          <StyledTypography variant="body1" component="div">
              <strong>Ticket ID:</strong> {ticket.tiketId}
            </StyledTypography>
            <StyledTypography variant="body1" component="div">
              <strong>Pay Status:</strong> {ticket.payd ? "Paid" : "Unpaid"}
            </StyledTypography>
            <StyledTypography variant="body1" component="div">
              <strong>Cancelled:</strong> {ticket.canceled ? "Yes" : "No"}
            </StyledTypography>
          </Box>
          <Box>
            <StyledTypography variant="body1" component="div">
              <strong>Created At:</strong> {formatDate(ticket.createdAt)}
            </StyledTypography>
            <StyledTypography variant="body1" component="div">
              <strong>Updated At:</strong> {formatDate(ticket.updatedDate)}
            </StyledTypography>
            <StyledTypography variant="body1" component="div">
              <strong>Total Prize:</strong> {ticket.totslPrize}
            </StyledTypography>
          </Box>
        </TicketDetails>
        <StyledTypography variant="h6" component="div" gutterBottom style={{backgroundColor:"green", fontSize:"30px" }}>
          Bets
        </StyledTypography>
        <List>
        {ticket.bets.map((bet, index) => {
  let displayValue;

  if (bet.selectedButtons.length > 0) {
    const firstElement = bet.selectedButtons[0];

    switch (firstElement) {
      case 1:
        displayValue = `WIN[${bet.selectedButtons[1]}]`;
        break;
      case 2:
        displayValue = `PLACE[${bet.selectedButtons[1]}]`;
        break;
      case 3:
        displayValue = `SHOW[${bet.selectedButtons[1]}]`;
        break;
      default:
        displayValue = 'UNKNOWN';
    }
  } else {
    displayValue = `[${bet.selectedButtons.join(', ')}]`;
  }

  return (
    <StyledListItem key={index}>
      <ListItemText
        primary={`${displayValue}, Bet Amount: ${bet.betAmount}`}
        secondary={`Win: ${bet.win ? 'Yes' : 'No'}, Prize: ${bet.prize}`}
      />
    </StyledListItem>
  );
})}


        </List>
      </StyledCardContent>
    </StyledCard>
  );
}
