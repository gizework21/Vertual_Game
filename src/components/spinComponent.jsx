import React, { useState, useRef }  from 'react';
import './homePage.css';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { Button, Container, Row, Col, Card, FormGroup, Label, Input, CardText } from 'reactstrap';
import  Ticket  from './spinTiikate'
import ReactToPrint from "react-to-print"; // Import the ReactToPrint component


const spinPage = (props) => {
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
      if (i % 10 === 0) {
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
      // Create the bet object
      const bet = {
        selectedButtonsS,
        betAmount
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
    <div style={{backgroundImage: 'url("spin11.png")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>
      <Row>
          <Col md={8}>
      <div>

    <section id="list-group">
    <div className="container-lg" >

            <h1  className="text-white" style={{ textAlign: 'center' , paddingInline: '10%'}}>3S BETTING</h1>
            <div style={{display: 'flex'}}>
            <a href="/animation/Home" className="d-flex">
              <button style={{ backgroundColor: '#001f3f', color: 'white', fontWeight: 'bold', padding: '10px 20px', borderRadius: '10px' }}>DOG</button>
            </a>
            <a href="/Keno/Home" className="d-flex">
              <button style={{ backgroundColor: '#001f3f', color: 'white', fontWeight: 'bold', padding: '10px 20px', borderRadius: '10px' }}>KENO</button>
            </a>
            </div>
            
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
            <Col xs="4">
            <div>
                <div className="button-container">{renderButtons()}</div>
                <p style={{color: "white", fontWeight: 'bold'}}>{selectedButtonsS}</p>
            </div>
            </Col>
            <Col xs='1'>
            <div style={{marginTop: '130px'}}>
            
              <Button onClick={()=>handleButtonClickK("ODD")} value="ODD" style={{ 
              backgroundColor: '#EFA804', fontWeight: 'bold', padding: '10px', borderRadius: '10px' ,
              borderColor: selectedButtonsS.includes("ODD") ? 'rgb(0,100,250)' : 'warning',
              borderWidth: selectedButtonsS.includes("ODD") ? '5px' : '1px'
            }}>ODD</Button>
              <Button onClick={()=>handleButtonClickK("EVEN")} value="EVEN" style={{ 
              backgroundColor: '#EFA804', fontWeight: 'bold', padding: '10px', borderRadius: '10px' ,
              borderColor: selectedButtonsS.includes("EVEN") ? 'rgb(0,100,250)' : 'warning',
              borderWidth: selectedButtonsS.includes("EVEN") ? '5px' : '1px'
            }}>EVEN</Button>
            
            </div>
            </Col>
            <Col xs= '1'>
            <div style={{marginTop: '100px'}}>
            
              <Button onClick={()=>handleButtonClickK("GREEN")} value="GREEN" style={{ backgroundColor: 'rgb(0,250,0)', color: 'white', fontWeight: 'bold', padding: '10px', borderRadius: '10px' ,borderColor: selectedButtonsS.includes("GREEN") ? 'rgb(0,100,250)' : 'warning',borderWidth: selectedButtonsS.includes("GREEN") ? '5px' : '1px'}}>GREEN</Button>
              <Button onClick={()=>handleButtonClickK("BLACK")} value="BLACK" style={{ backgroundColor: 'rgb(0,0,0)', color: 'white', fontWeight: 'bold', padding: '10px', borderRadius: '10px' ,borderColor: selectedButtonsS.includes("BLACK") ? 'rgb(0,100,250)' : 'warning',borderWidth: selectedButtonsS.includes("BLACK") ? '5px' : '1px'}}>BLACK</Button>            
              <Button onClick={()=>handleButtonClickK("RED")} value="RED" style={{ backgroundColor: 'rgb(250,0,0)', color: 'white', fontWeight: 'bold', padding: '10px', borderRadius: '10px' ,borderColor: selectedButtonsS.includes("RED") ? 'rgb(0,100,250)' : 'warning',borderWidth: selectedButtonsS.includes("RED") ? '5px' : '1px'}}>RED___</Button>
            
           
            </div>
            </Col>
            
            <Col xs='2'>
            <div style={{display: 'flex2',marginLeft:"50px", marginTop:"80px"}}>
            
              <Button onClick={()=>handleButtonClickK("A")} value="A" style={{ backgroundColor: '#EFA804', color: 'black', fontWeight: 'bold', padding: '10px 20px', borderRadius: '10px' ,borderColor: selectedButtonsS.includes("A") ? 'rgb(0,100,250)' : 'warning',borderWidth: selectedButtonsS.includes("A") ? '5px' : '1px'}}>A</Button>
              <Button onClick={()=>handleButtonClickK("B")} value="B" style={{ backgroundColor: '#EFA804', color: 'black', fontWeight: 'bold', padding: '10px 20px', borderRadius: '10px' ,borderColor: selectedButtonsS.includes("B") ? 'rgb(0,100,250)' : 'warning',borderWidth: selectedButtonsS.includes("B") ? '5px' : '1px'}}>B</Button>
              <Button onClick={()=>handleButtonClickK("C")} value="C" style={{ backgroundColor: '#EFA804', color: 'black', fontWeight: 'bold', padding: '10px 20px', borderRadius: '10px' ,borderColor: selectedButtonsS.includes("C") ? 'rgb(0,100,250)' : 'warning',borderWidth: selectedButtonsS.includes("C") ? '5px' : '1px'}}>C</Button>            
              <Button onClick={()=>handleButtonClickK("D")} value="D" style={{ backgroundColor: '#EFA804', color: 'black', fontWeight: 'bold', padding: '10px 20px', borderRadius: '10px' ,borderColor: selectedButtonsS.includes("D") ? 'rgb(0,100,250)' : 'warning',borderWidth: selectedButtonsS.includes("D") ? '5px' : '1px'}}>D</Button>
            
            </div>
            </Col>
            <Col xs="3.8" style={{backgroundImage: 'url("imag")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>
            <div >
            <div>

                  <Button
                    id="addButton"
                    color="dark"
                    onClick={handleAddClick}
                    className="text-white"
                  >
                    ADD
                  </Button>
                </div>
              <label htmlFor="betAmount" id="label" >
                Bet Amount
              </label>
              <input
                type="number"
                id="betAmount"
                className="form-control mb-2"
                value={betAmount}
                onChange={handleAmountChange}
              />
              <div className="d-flex">
                {amount.map((amount) => (
                  <Button
                    key={amount}
                    color={betAmount === amount ? 'primary' : 'orange'}
                    className="me-2"
                    onClick={() => handleButtonClick(amount)}
                  >
                    {amount}
                  </Button>
                  
                ))}
          
              </div>
                
            </div>
          </Col>
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
      <Col md={4} >
      
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
        <div style={{backgroundImage: 'url("keno3.jpeg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>
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

export default spinPage;



<video src="https://mohiogaming.com/storage/video/615250775f1539b907529926fbcaada5.mp4" loop="" muted="" autoplay="autoplay" class="w-full h-full object-cover z-0"></video>