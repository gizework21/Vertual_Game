import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, ListGroup, ListGroupItem ,Modal, ModalHeader, ModalBody, ModalFooter, Button, Label, Input } from 'reactstrap';
import moment from 'moment';
import  { forwardRef } from "react";
import { FaTrash,FaEdit } from 'react-icons/fa';
import { useSelector, useDispatch } from "react-redux";
import { initializeUser, selectUser } from "../redux/slice/userSlice";
import Barcode from "react-barcode";
import {BASE_URL} from "../api/baseURL"



const kenoTikete = forwardRef((props, ref) => {
  const { newBette } = props;
  const [betList, setBetList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [newBetAmount, setNewBetAmount] = useState(0);
  const [totalBetAmount, setTotalBetAmount] = useState(0); // New state for total bet amount
  const [totalPossibleWin, setTotalPossibleWin] = useState(0)
  const user = useSelector(selectUser);
  const [ticketID, setTicketID] = useState('');

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(currentDate.getDate()).padStart(2, '0');
  
  const formattedDate = `${year}${month}${day}`;
  const gameId=`${formattedDate}${props.gameID}`

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
    const generateTicketID = () => {
      return Math.floor(1000000 + Math.random() * 900000).toString();
    };
    setTicketID(generateTicketID());
  }, [props.handlePrint]);

  useEffect(() => {
    if (newBette && Object.keys(newBette).length > 0) {
      // Update bet list when a new bet is received
      setBetList((prevList) => [...prevList, newBette]);
      calculateTotalPossibleWin()
    }
  }, [newBette]);

  useEffect(() => {
    const saveTicketToDatabase = async () => {
      if (props.isTiketPrinted) {
        try {
          const url = `${import.meta.env.VITE_REACT_APP_VITE_API_URL}/keno`;
         
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              bets: betList,
              gameId: gameId,
              win: false, // Assuming the initial value of win is false
              tiketerId: user._id,
              tiketId: ticketID
            })
          });
          const data = await response.json();
          console.log('Ticket saved:', data);
          setBetList([]);
          props.handlePrint();
        } catch (error) {
          console.error('Error saving ticket:', error);
        }
      }
    };
    saveTicketToDatabase();
  }, [props.isTiketPrinted, props.handelPrint]);


  useEffect(() => {
    // Recalculate total bet amount whenever items or newBetAmount change
    var calculateTotalAmount = () => {
      const total = betList.reduce((acc, item) => acc + item.betAmount, 0);
      setTotalBetAmount(total);
    };
    calculateTotalPossibleWin()
    calculateTotalAmount()
  }, [betList, newBetAmount]);
  

  const deleteItem = (index) => {
    setBetList((prevItems) => {
      // Create a new array without the item at the specified index
      const newItems = [...prevItems.slice(0, index), ...prevItems.slice(index + 1)];
      return newItems;
    });
  };

const calculateTotalPossibleWin = () => {
  let totalPossibleWin = 0;

  // Iterate through each bet in the array
  betList.forEach((bet) => {
    // Ensure the bet object has the 'possibleWin' property
    if (bet.hasOwnProperty('possibleWin')) {
      totalPossibleWin += bet.possibleWin;
    }
  });
  setTotalPossibleWin(totalPossibleWin)
};

  return (
    <div className="mt-5"  ref={ref} >
      <Card className="font-ticketing text-lg" id="ticket" >
        <CardBody>
          <div >
            <CardTitle tag="h5">3S  Betting</CardTitle>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
              <CardTitle tag="p" style={{ marginLeft: '10px', fontSize: "18px" }}>Ticket-Number: {ticketID}</CardTitle>
            </div>
          </div>
          <CardSubtitle tag="h6" className="mb-2 text-muted ">Game ID: {gameId}</CardSubtitle>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <h3>KENO</h3>
            </div>  
          <ListGroup>
          {betList.map((bet, index) => {
            console.log(bet)
            return (
                  <ListGroupItem key={index} className="d-flex  align-items-center">
                    <div>
                      <strong>{' '}[
                      {bet.selectedButtonsS
                        .map(selected => selected)
                        .join(', ')}]</strong>
                    </div>
                    <div>
                      <strong>________</strong> {bet.betAmount}_____<FaTrash onClick={() => deleteItem(index)} /><FaEdit onClick={() => openModal(index)} />

                    </div>
                  </ListGroupItem>
                );
  })}

          </ListGroup>

          <div className="mt-3  ">
            <div>
              <strong>Total Mony Bet :</strong> {totalBetAmount}
              
            </div>
            <div><strong>Total Possible Win :</strong>{totalPossibleWin}</div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                <Barcode value={ticketID} width={2} height={30} displayValue={false} />
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
          <Button color="primary" onClick={saveChanges}>
            Save Changes
          </Button>
          <Button color="secondary" onClick={closeModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      
    </div>
  );
});

export default kenoTikete;
