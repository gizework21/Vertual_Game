import React, { useState, useRef }  from 'react';
import './homePage.css';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { Button,  Row, Col} from 'reactstrap';
import  Ticket  from './kenoTikat'
import ReactToPrint from "react-to-print"; // Import the ReactToPrint component


const master2 = (props) => {
    const [betAmount, setBetAmount] = useState(20);
    const [gameID, setGameID] = useState(1000); 
    const [newBette, setNewBette] = useState([])
    
    const [isTiketPrinted,setIsTiketPrinted]= useState(false)
    const [amount, setAmount] =useState([5, 10, 20, 30, 40, 50,100])
    const [selectedButtonsS, setSelectedButtonsS] = useState([]);
    const tiket =useRef();

  const handleAmountChange = (event) => {
    setBetAmount(Number(event.target.value));
  };
 
  
  const handleButtonClickK = (buttonValue) => {
    // Toggle button selection
    const isSelected = selectedButtonsS.includes(buttonValue);
    const updatedSelection = isSelected
      ? selectedButtonsS.filter((value) => value !== buttonValue)
      : [...selectedButtonsS, buttonValue];

    // Update selected buttons in ascending order
    const sortedSelection = updatedSelection.sort((a, b) => a - b);

    setSelectedButtonsS(sortedSelection);
  };

  

  const renderButtons = () => {
    const buttons = [];
    for (let i = 1; i <= 80; i++) {
      buttons.push(
        <Button
          key={i}
          onClick={() => handleButtonClickK(i)}
          color={selectedButtonsS.includes(i) ? 'primary' : 'warning'}
          className=" mx-1 my-1"
          
        >
          {i}
        </Button>
      );

      // Add line break after every 10 buttons
      if (i % 9 === 0) {
        buttons.push(<br key={`br-${i}`} />);
      }
    }
    return buttons;
  };

  const handleButtonClick = (amount) => {
    setBetAmount(amount);
  };
  
  const sendToTicket = (bet) => {
    // Handle the bet data in the parent component
    console.log('Received bet data:', bet);
    setNewBette(bet)
  };

  const handlePrint= () =>{
    const defal= Number(20)
    setBetAmount(defal)
    setIsTiketPrinted(!isTiketPrinted)
  }
  const handleAddClick = () => {
    if (selectedButtonsS.length > 0) {
      // Determine the odd based on selectedButtonsS length
      let odd;
      switch (selectedButtonsS.length) {
        case 1:
          odd = 3.78;
          break;
        case 2:
          odd = 15;
          break;
        case 3:
          odd = 50;
          break;
        case 4:
          odd = 100;
          break;
        case 5:
          odd = 300;
          break;
        case 6:
          odd = 500;
          break;
        case 7:
          odd = 800;
          break;
        case 8:
          odd = 1000;
          break;
        default:
          // Handle other cases as needed
          break;
      }
  
      // Calculate the possible win
      const possibleWin = odd * betAmount;
  
      // Create the bet object
      const bet = {
        selectedButtonsS,
        betAmount,
        odd,
        possibleWin
      };
  
      // Send the bet object to the ticket
      sendToTicket(bet);
  
      // Clear selected buttons
      clearSelectedButtons();
    }
  };
  
  
  // Function to clear selected buttons
  const clearSelectedButtons = () => {
    setSelectedButtonsS([])
  };
  

const handleGameIDChange= (event)=>{
  var newNumber = Number(event.target.value);
  setGameID(newNumber)
}
const incrementGameID = () => {
    setGameID(() => gameID + 4);
  };

  const decrementGameID = () => {
    setGameID(() => Math.max(gameID - 4, 0));
  };


  
  return (
    <div>
      <Row>
          <Col md={8}>
      <div>

    <section id="list-group">
    <div className="container-lg" style={{backgroundImage: 'url("/keno4.jpeg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>

            <h1  className="text-white" style={{ textAlign: 'center' }}>3S BETTING</h1>
       
            <div className="text-center mb-3">
            <div className=" text-center">
              <h5 htmlFor="gameID" className=" text-white p-3 ">
                Game ID
              </h5>
                <input
                  type="number"
                  id="gameID"
                  className=" mb-2"
                  value={gameID}
                  onChange={handleGameIDChange}
                />
                <FaPlus
                  className="text-warning me-2 "
                  style={{ cursor: 'pointer' }}
                  onClick={incrementGameID}
                />
                <FaMinus className="text-warning" style={{ cursor: 'pointer' }} onClick={decrementGameID} />
            </div>
              </div>
            <Row>
            <Col xs="8">
            <div>
                <div className="button-container">{renderButtons()}</div>
                <div>
                    <p>Selected Buttons: {selectedButtonsS.join(', ')}</p>
                </div>
            </div>
            </Col>
            <div style={{ width: '200px', backgroundImage: 'url("imag")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
        <div className="m-4">
          <Button
            id="addButton"
            color="dark"
            onClick={handleAddClick}
            className="text-white"
            size="lg"
            style={{paddingTop:"5px"}}
          >
            ADD
          </Button>
          <label htmlFor="betAmount" id="label" style={{color: "white", fontStyle:"bold"}} >  Bet Amount</label>
          <input
            type="number"
            id="betAmount"
            className="form-control mb-2"
            value={betAmount}
            onChange={handleAmountChange}
            style={{paddingTop:"15px"}}
          />
         <div>
            {amount.map((amount) => (
              <Button
                key={amount}


                color={betAmount === amount ? 'primary' : 'secondary'}
                className="me-2"
                onClick={() => handleButtonClick(amount)}

                style={{ fontweight: 'bold' }}
              >
                {amount}
              </Button>
            ))}
          </div>
          </div>
          </div>
        </Row>
    </div>
    </section>
    
                <style jsx>{`
                    .haveree:hover {
                      transform: scale(1.1);
                      transition: transform 0.2s ease-in-out;
                    }
                  `}</style>
      </div>
      </Col>
      <Col md={4} style={{background: 'rgb(0,0,0)', backgroundImage: 'url("/keno3.png")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}} >
      
           <Ticket handlePrint={handlePrint}  isTiketPrinted={isTiketPrinted} newBette={newBette} ref={tiket} id="ticket" gameID={gameID}  />
            <div col={1}    className=" mt-4"  onClick={() => handlePrint()}>
              <ReactToPrint
            trigger={() => <Button className="greenButton form-control">Print</Button>}
            content={() => tiket.current} // Make sure this.tiket is a valid reference
                pageStyle="@page { size: 60mm 80mm; margin: 0; }" // Set the size property to 60mm by 80mm
              />
            </div>

          </Col>
        </Row>
        <div style={{backgroundImage: 'url("/keno3.jpeg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>
          <p> this system is provided by yohannes mulat</p>
          <p>phone number 0979458662 </p>
          <p>|</p>
          <p>|</p>
          <p>|</p>
          <p>|</p>
          <p>|</p>       
        
        </div>
    </div>
  );
};

export default master2;
