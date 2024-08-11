import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, ListGroup, ListGroupItem ,Modal, ModalHeader, ModalBody, ModalFooter, Button, Label, Input } from 'reactstrap';
import moment from 'moment';
import  { forwardRef } from "react";
import { FaTrash } from 'react-icons/fa';
// import axios from 'axios';

const SpinTikate = forwardRef((props, ref) => {
  const { newBette } = props;
  const [betList, setBetList] = useState({selectedButtonsS:[],betAmount:0});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [newBetAmount, setNewBetAmount] = useState(0);
  const [totalBetAmount, setTotalBetAmount] = useState(0); // New state for total bet amount

  // const openModal = (index) => {
  //   setSelectedItemIndex(index);
  //   setModalIsOpen(true);
  //   setNewBetAmount(betList[index].betAmount);
  // };

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
      // Update bet list when a new bet is received
      setBetList((prevList) => ({
        ...prevList,
        selectedButtonsS: newBette.selectedButtonsS,
        betAmount: newBette.betAmount
      }));
      console.log(newBette)
      console.log(betList)
    }
  }, [newBette]);

  useEffect(() => {
    const sendBetListToBackend = async () => {
      try {
        const url =`${import.meta.env.VITE_REACT_APP_VITE_API_URL}`
        // const response = await axios.post(url, betList, {
        //   headers: {
        //     'Content-Type': 'application/json'
        //   }
        // });
        // console.log('Success:', response.data);
        // Clear bet list and call handlePrint after successfully saving the data
        setBetList({ selectedButtonsS: [], betAmount: 0 });
        props.handlePrint();
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (props.isTiketPrinted === true) {
      sendBetListToBackend();
    }
  }, [props.isTiketPrinted, props.handlePrint, betList]);

  useEffect(() => {
    // Recalculate total bet amount whenever items or newBetAmount change
    var calculateTotalAmount = () => {
      const numberOfSelectedButtons = betList.selectedButtonsS.length;
      // Calculate the total price
      const totalPrice = numberOfSelectedButtons * betList.betAmount;
      setTotalBetAmount(totalPrice);
    };
    calculateTotalAmount()
  }, [betList, newBetAmount]);
  

  const deleteItem = (index) => {
    setBetList((prevItems) => {
      // Filter out the item at the specified index
      const newSelectedButtonsS = prevItems.selectedButtonsS.filter((item, i) => i !== index);
  
      return {
        ...prevItems,
        selectedButtonsS: newSelectedButtonsS
      };
    });
  };



  return (
    <div className="mt-5"  ref={ref} >
      <Card className="font-ticketing text-lg" id="ticket" >
        <CardBody>
          <div >
            <CardTitle tag="h5">3S  Betting</CardTitle>
          </div>
          <CardSubtitle tag="h6" className="mb-2 text-muted ">Game ID: {props.gameID}</CardSubtitle>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <h3>SPIN</h3>
          </div>          <ListGroup>
          {betList.selectedButtonsS.map((bet, index) => {
            console.log(bet)
            return (
                  <ListGroupItem key={index} >
                    <div >
                      <strong>{' '}
         
                        
                        <div className="d-flex  align-items-center">
                          
                    <div key={index}>{bet}</div>
                    <div>
                      ________ {betList.betAmount}_____<FaTrash onClick={() => deleteItem(index)} />

                    </div></div>
                </strong>
                    </div>
                    
                  </ListGroupItem>
                );
  })}

          </ListGroup>

          <div className="mt-3  ">
            <div>
              <strong>Total Mony Bet :</strong> {totalBetAmount}
              
            </div>
            <div>
              <strong>Date:</strong> {moment().format('MMMM Do YYYY, h:mm:ss a')}
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

export default SpinTikate;
