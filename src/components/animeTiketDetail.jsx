// AnimeCard.js
import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Barcode from 'react-barcode';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  margin: 'auto',
  marginTop: theme.spacing(5),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
  borderRadius: theme.shape.borderRadius,
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(4),
  maxHeight: '80vh', // Set a maximum height for the card content
  overflowY: 'auto', // Enable vertical scrolling if content overflows
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

const AnimeCard = ({ anime, handleCancele, dropdownValue }) => {
  const handlePay = async () => {
    try {
      let endpoint;
      if (dropdownValue === "Dog") {
        endpoint = `${import.meta.env.VITE_REACT_APP_VITE_API_URL}/animeDog/pay`;
      } else if (dropdownValue === "Horse") {
        endpoint = `${import.meta.env.VITE_REACT_APP_VITE_API_URL}/animeHors/pay`;
      }

      const response = await fetch(endpoint, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tiketId: anime.tiketId }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      toast.success('Payment successful!');
    } catch (error) {
      toast.error(`${error.message}`);
    }
  };

  const handleCancel = () => {
    handleCancele();
    toast.info('Payment cancelled.');
  };

  if (!anime) {
    return (
      <StyledCard>
        <StyledCardContent>
          <StyledTypography variant="h5" component="div" gutterBottom>
            Anime Details
          </StyledTypography>
          <StyledTypography variant="body1" component="div">
            No data available.
          </StyledTypography>
        </StyledCardContent>
      </StyledCard>
    );
  }

  const betList = anime.bets;

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <StyledCard>
        <StyledCardContent>
          <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
            <StyledTypography variant="body1" component="div" gutterBottom align="center" mt={-5} fontSize={30} sx={{ backgroundColor: '#d7a022' }}>
              Anime Details
            </StyledTypography>

            <StyledTypography variant="body1" component="div" align="center" fontSize={19} mt={-2}>
              <strong>Game ID:</strong> {anime.gameId}
            </StyledTypography>

            <Box mb={0} mt={-2}>
              <Barcode value={anime.tiketId} width={2} height={30} fontSize={18} />
            </Box>
          </Box>
          <TicketDetails>
            <Box>
              <StyledTypography variant="body1" component="div">
                <strong>Ticket ID:</strong> {anime.tiketId}
              </StyledTypography>
              <StyledTypography variant="body1" component="div">
                <strong>Pay Status:</strong> {anime.payd ? 'Paid' : 'Unpaid'}
              </StyledTypography>
              <StyledTypography variant="body1" component="div">
                <strong>Cancelled:</strong> {anime.canceled ? 'Yes' : 'No'}
              </StyledTypography>
            </Box>
            <Box>
              <StyledTypography variant="body1" component="div">
                <strong>Total Prize:</strong> {anime.totslPrize}
              </StyledTypography>
            </Box>
          </TicketDetails>
          <StyledTypography variant="h6" component="div" gutterBottom style={{ backgroundColor: 'green', fontSize: '30px' }}>
            Bets
          </StyledTypography>
          <List>
            {betList.map((bet, index) => {
              let displayValue;

              if (bet.selectedButtons.length > 0 ) {
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
      <Box mt={2} display="flex" justifyContent="space-between" width="100%" maxWidth={600}>
        <Button variant="contained" color="primary" onClick={handlePay}>
          Pay
        </Button>
        <Button variant="contained" color="secondary" onClick={handleCancel}>
          Cancel
        </Button>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default AnimeCard;
