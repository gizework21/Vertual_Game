import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import { forwardRef } from "react";
import { FaTrash } from "react-icons/fa";
import Barcode from "react-barcode";
import { initializeUser, selectUser } from "../redux/slice/userSlice";
import { useSelector, useDispatch } from "react-redux";
import './styles.css'; // Import the CSS file
import {BASE_URL} from "../api/baseURL";


const HorsRasingTiket = forwardRef((props, ref) => {
  const user = useSelector(selectUser);
  const { newBette } = props;
  const [betList, setBetList] = useState([]);
  const [totalBetAmount, setTotalBetAmount] = useState(0);
  const [ticketID, setTicketID] = useState('');

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(currentDate.getDate()).padStart(2, '0');
  
  const formattedDate = `${year}${month}${day}`;
  const gameId = Number(`${formattedDate}${props.gameID}`);

  useEffect(() => {
    generateTicketID();
  }, [props.handlePrint]);

  useEffect(() => {
    if (newBette && Object.keys(newBette).length > 0) {
      setBetList((prevList) => [...prevList, newBette]);
    }
  }, [newBette]);

  useEffect(() => {
    const saveTicket = async () => {
      try {
        if (props.isTiketPrinted) {
          const url = `${import.meta.env.VITE_REACT_APP_VITE_API_URL}/animeDog`;
          const betlist= []
          betList.map((bet)=>{
            betlist.push({
              selectedButtons: [bet.selectedButtons[0][0],bet.selectedButtons[0][1]],
              betAmount: bet.betAmount
            });
          })
         

          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              bets: betlist,
              gameId: gameId,
              tiketId: ticketID,
              tiketerId: user._id,
            }),
          });
          const data = await response.json();
          console.log("Ticket saved:", data);

          setBetList([]);
          props.handlePrint();

          // Update ticket ID after successful print
          generateTicketID();
        }
      } catch (error) {
        console.error("Error saving ticket:", error);
      }
    };

    saveTicket();
  }, [props.isTiketPrinted, props.handlePrint, betList, props.gameID, ticketID]);

  useEffect(() => {
    const calculateTotalAmount = () => {
      const total = betList.reduce((acc, item) => acc + item.betAmount, 0);
      setTotalBetAmount(total);
    };

    calculateTotalAmount();
  }, [betList]);

  const generateTicketID = () => {
    const newTicketID = Math.floor(1000000 + Math.random() * 900000).toString();
    setTicketID(newTicketID);
  };

  const deleteItem = (index) => {
    setBetList((prevItems) => {
      const newItems = [
        ...prevItems.slice(0, index),
        ...prevItems.slice(index + 1),
      ];
      return newItems;
    });
  };

  const handleBetAmountChange = (index, newAmount) => {
    setBetList((prevList) => {
      const updatedList = prevList.map((bet, i) => {
        if (i === index) {
          return { ...bet, betAmount: newAmount };
        }
        return bet;
      });
      return updatedList;
    });
  };

  const amountButtons = [10, 20, 30, 50, 100];

  return (
    <div className="mt-5" ref={ref}>
      <Card className="font-ticketing text-lg" id="ticket">
        <CardBody>
          <div>
            <CardTitle tag="h3" style={{ marginLeft: '10px', fontSize: "25px" }}>3S-Betting</CardTitle>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
              <CardTitle tag="p" style={{ marginLeft: '10px', fontSize: "18px" }}>Ticket-Number: {ticketID}</CardTitle>
            </div>
          </div>
          <CardSubtitle tag="h6" className="mb-2 text-muted ">
            Game ID: {gameId}
          </CardSubtitle>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h5>Dog Racing</h5>
          </div>
          <ListGroup>
            {betList.map((bet, index) => {
              if (bet.selectedButtons.length >= 1) {
                return (
                  <ListGroupItem key={index} className="d-flex flex-column align-items-start">
                    {bet.selectedButtons.map((selectedBtn, btnIndex) => {
                      const [rank, dogNumber] = selectedBtn;
                      let displayValue;
                      const ranke= selectedBtn[0]

                      switch (ranke) {
                        case 1:
                          displayValue = "WIN";
                          break;
                        case 2:
                          displayValue = "PLACE";
                          break;
                      
                        default:
                          displayValue = "UNKNOWN";
                      }

                      return (
                        <div key={btnIndex} className="d-flex flex-column align-items-start mb-2 w-100">
                          <div className="d-flex align-items-center w-100">
                            <div className="flex-grow-1">
                              <strong>{displayValue}[{dogNumber}]</strong> 
                              <span className="ml-2">
                                <strong>________</strong> {bet.betAmount}<div className="no-print">_____</div>
                              </span>
                            </div>
                            <div className="ml-2 no-print">
                              <FaTrash
                                onClick={() => deleteItem(index)}
                                style={{ cursor: "pointer", marginRight: "10px", color: "red" }}
                              />
                            </div>
                          </div>
                          <div className="d-flex mt-2 no-print">
                            {amountButtons.map((amount) => (
                              <button
                                key={amount}
                                className="btn btn-sm btn-outline-primary ml-1"
                                onClick={() => handleBetAmountChange(index, amount)}
                              >
                                {amount}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </ListGroupItem>
                );
              }
              return null;
            })}
          </ListGroup>
          <div className="mt-3">
            <div>
              <strong>Total :</strong> {totalBetAmount} Birr
              <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                <Barcode value={ticketID} width={2} height={30} displayValue={false} />
              </div>
            </div>
          
          </div>
        </CardBody>
      </Card>
    </div>
  );
});

export default HorsRasingTiket;
