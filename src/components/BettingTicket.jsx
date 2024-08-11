import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, ListGroup, ListGroupItem, Modal, ModalHeader, ModalBody, ModalFooter, Button, Label, Input } from 'reactstrap';
import moment from 'moment';
import { forwardRef } from "react";
import { FaTrash, FaEdit } from 'react-icons/fa';
import { initializeUser, selectUser } from "../redux/slice/userSlice";
import { useSelector, useDispatch } from "react-redux";
import Barcode from "react-barcode";


const Tikete = forwardRef((props, ref) => {
  const user = useSelector(selectUser);
  const { newBette } = props;
  const [betList, setBetList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [newBetAmount, setNewBetAmount] = useState(0);
  const [totalBetAmount, setTotalBetAmount] = useState(0);
  const [ticketID, setTicketID] = useState('');

 console.log(props)

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(currentDate.getDate()).padStart(2, '0');
  
  const formattedDate = `${year}${month}${day}`;
  const gameId=`${formattedDate}${props.gameID}`


   useEffect(() => {
    const generateTicketID = () => {
      return Math.floor(1000000 + Math.random() * 900000).toString();
    };

     
    setTicketID(generateTicketID());
    generateTicketID();
  }, [props.handlePrint]);


  const openModal = (index) => {
    setSelectedItemIndex(index);
    setModalIsOpen(true);
    setNewBetAmount(betList[index].betAmount);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const saveChanges = () => {
    if (selectedItemIndex !== null) {
      setBetList((prevItems) => {
        const newItems = [...prevItems];
        newItems[selectedItemIndex].betAmount = newBetAmount;
        return newItems;
      });
      closeModal();
    }
  };

  useEffect(() => {
    if (newBette && Object.keys(newBette).length > 0) {
      setBetList((prevList) => [...prevList, newBette]);
    }
  }, [newBette]);

  useEffect(() => {
    const saveTicket = async () => {
      try {
        if (props.isTiketPrinted) {
          const url = `${import.meta.env.VITE_REACT_APP_VITE_API_URL}/grayhorn`;
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              bets: betList,
              gameId: gameId,
              tiketId: ticketID,
              tiketerId: user._id
            })
          });
          const data = await response.json();
          console.log('Ticket saved:', data);

          setBetList([]);
          props.handlePrint();
        }
      } catch (error) {
        console.error('Error saving ticket:', error);
      }
    };

    saveTicket();
  }, [props.isTiketPrinted, props.handlePrint, betList, props.gameID]);

  useEffect(() => {
    const calculateTotalAmount = () => {
      const total = betList.reduce((acc, item) => acc + item.betAmount, 0);
      setTotalBetAmount(total);
    };

    calculateTotalAmount();
  }, [betList]);

  const deleteItem = (index) => {
    setBetList((prevItems) => {
      const newItems = [...prevItems.slice(0, index), ...prevItems.slice(index + 1)];
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
          <CardSubtitle tag="h6" className="mb-2 text-muted">Game ID: {gameId}</CardSubtitle>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <h3>DOG</h3>
          </div>
          <ListGroup>
            {betList.map((bet, index) => {
              let displayValue;
              let correspondingAmount;

              if (bet.selectedButtons.length === 1) {
                const firstElement = bet.selectedButtons[0][0];

                switch (firstElement) {
                  case 1:
                    displayValue = `WIN[${
                      bet.selectedButtons
                        .sort((a, b) => a[0] - b[0])
                        .map(selected => selected[1])
                        .join(', ')
                    }]`;
                    break;
                  case 2:
                    displayValue = `PLACE[${
                      bet.selectedButtons
                        .sort((a, b) => a[0] - b[0])
                        .map(selected => selected[1])
                        .join(', ')
                    }]`;
                    break;
                  case 3:
                    displayValue = `SHOW[${
                      bet.selectedButtons
                        .sort((a, b) => a[0] - b[0])
                        .map(selected => selected[1])
                        .join(', ')
                    }]`;
                    break;
                  default:
                    displayValue = "UNKNOWN";
                }
                correspondingAmount = bet.betAmount;
              } else if (bet.isQuinellaActive) {
                displayValue = `QUINELLA[${
                  bet.selectedButtons
                    .sort((a, b) => a[0] - b[0])
                    .map(selected => selected[1])
                    .join(', ')
                }]`;
                correspondingAmount = bet.betAmount;
              } else if (bet.isExactaActive) {
                displayValue = `EXACTA[${
                  bet.selectedButtons
                    .sort((a, b) => a[0] - b[0])
                    .map(selected => selected[1])
                    .join(', ')
                }]`;
                correspondingAmount = bet.betAmount;
              } else {
                displayValue = `[${
                  bet.selectedButtons
                    .sort((a, b) => a[0] - b[0])
                    .map(selected => selected[1])
                    .join(', ')
                }]`;
                correspondingAmount = bet.betAmount;
              }

              return (
                <ListGroupItem key={index} className="d-flex flex-column align-items-start mb-2 w-100">
                  <div className="d-flex align-items-center w-100">
                  <div>
                    <strong>{displayValue}</strong>
                  </div>
                  <div className="d-flex ">
                    <strong>________</strong> {correspondingAmount}<div className="no-print">_____</div>
                    <div className="ml-2 no-print">
                              <FaTrash
                                onClick={() => deleteItem(index)}
                                style={{ cursor: "pointer", marginRight: "10px", color: "red" }}
                              />
                            </div>
                  </div>
                  </div>
                  
                  
                  <div className="d-flex mt-2 no-print" >
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
                </ListGroupItem>
              );
            })}
          </ListGroup>

          <div className="mt-3">
            <div>
              <strong>Total:</strong> {totalBetAmount} Birr
              <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                <Barcode value={ticketID} width={2} height={30} displayValue={false} />
              </div>
            </div>
            
          </div>
        </CardBody>
      </Card>
      <Modal isOpen={modalIsOpen} toggle={closeModal}>
        <ModalHeader toggle={closeModal}>Edit Bet</ModalHeader>
        <ModalBody>
          <Label>
            Bet Amount:
            <Input
              type="number"
              value={newBetAmount}
              onChange={(e) => setNewBetAmount(parseInt(e.target.value, 10))}
            />
          </Label>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={saveChanges}>Save Changes</Button>
          <Button color="secondary" onClick={closeModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
});

export default Tikete;
