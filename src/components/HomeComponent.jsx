import React, { useState, useRef }  from 'react';
import './homePage.css';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { Button, Row, Col} from 'reactstrap';
import  Ticket  from './BettingTicket'
import ReactToPrint from "react-to-print"; // Import the ReactToPrint component
import '../index.css'
import 'bootstrap/dist/css/bootstrap.min.css';


const Home = () => {
    const [selectedButtons, setSelectedButtons] = useState([]);
    const [betAmount, setBetAmount] = useState(20);
    const [gameID, setGameID] = useState(1000); 
    const [newBette, setNewBette] = useState([])
    const [isQuinellaActive, setQuinellaActive] = useState(false);
    const [isExactaActive, setExactaActive] = useState(false);
    const [isTiketPrinted,setIsTiketPrinted]= useState(false)
    const [amount, setAmount] =useState([5, 10, 20, 30, 40, 50,100])
    const [selectedAmounts, setSelectedAmounts] = useState([20]);
    
    
  const tiket =useRef();
    
  const handleAmountChange = (event) => {
    setBetAmount(Number(event.target.value));
  };
  const handleQunelaClikd = () => {
    setQuinellaActive(true);
    setExactaActive(false)
  };
  const handleExactCliked = () => {
    setQuinellaActive(false);
    setExactaActive(true)
  };

  

  const handleButtonClick = (clickedAmount) => {
    // Check if the button is already selected
    if (selectedAmounts.includes(clickedAmount)) {
      // If selected, remove it from the selectedAmounts
      setSelectedAmounts((prevSelectedAmounts) =>
        prevSelectedAmounts.filter((selectedAmount) => selectedAmount !== clickedAmount)
      );
    } else {
      // If not selected, add it to the selectedAmounts
      setSelectedAmounts((prevSelectedAmounts) => [...prevSelectedAmounts, clickedAmount]);
    }
  
    // Log the updated selectedAmounts after the state has been updated
    setSelectedAmounts((updatedSelectedAmounts) => {
      const totalBetAmount = updatedSelectedAmounts.reduce((total, amount) => total + amount, 0);
      setBetAmount(totalBetAmount)
      console.log(updatedSelectedAmounts);
      return updatedSelectedAmounts;
    });
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
    setSelectedAmounts([20])
  }
  const handleAddClick = () => {
    if(selectedButtons.length > 0){
    // Create the bet object
    const bet = {
      selectedButtons,
      betAmount,
      isExactaActive,
      isQuinellaActive
    };
  
    // Send the bet object to the Ticket component
    sendToTicket(bet);
  
    // Clear selected buttons
    clearSelectedButtons();
    setExactaActive(false)
    setQuinellaActive(false)
    // Update styling of the button
  }
    
  };
  
  // Function to clear selected buttons
  const clearSelectedButtons = () => {
    const radioColumns = document.querySelectorAll('.radio-col');
    radioColumns.forEach((column) => {
      const buttons = column.querySelectorAll('.mr-1');
      buttons.forEach((button) => {
        button.classList.remove('selected');
      });
    });
  
    // Clear selectedButtons state
    setSelectedButtons([]);
  };
  
  const isSameIndexSelected = (newSelected, columnIndex, index) => {
    return newSelected.some(
      (selected) => selected.length > 0 && selected[0] !== columnIndex && selected[1] === index
    );
  };

  const selectRadioButton = (column, index) => {
    setSelectedButtons((prevSelected) => {
      let newSelected = [...prevSelected];
  
      const selectedButtonIndex = newSelected.findIndex(
        (selected) => selected.length > 0 && selected[0] === column
      );
  
      // Remove the previously selected button from the same column
      if (selectedButtonIndex !== -1) {
        const prevIndex = newSelected[selectedButtonIndex][1];
        const prevSelectedButton = document.getElementById(`column${column}`).children[prevIndex - 1];
        prevSelectedButton.classList.remove('selected');
        newSelected.splice(selectedButtonIndex, 1);
      }
  
      // Check if the same index is selected in any column
      if (isSameIndexSelected(newSelected, column, index)) {
        console.log("Cannot select the same number in multiple columns.");
      } else {
        // Select the new button
        newSelected.push([column, index]);
        const selectedButton = document.getElementById(`column${column}`).children[index - 1];
        selectedButton.classList.add('selected');
      }
  
      console.log(`Selected buttons: ${JSON.stringify(newSelected)}`);
      if (newSelected.length === 2) {
        setQuinellaActive(true);
      } else {
        setExactaActive(false);
        setQuinellaActive(false);
      }
  
      return newSelected;
    });
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
    <div >
      
      <Row  >
          <Col md={8}>
      <div>

      <section id="list-group">
  <div className="container-lg" style={{ backgroundImage: 'url("/dog1.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
    <h1 className="text-white" style={{ textAlign: 'center' }}>3S BETTING</h1>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    </div>
    <div className="text-center mb-3">
      <div className="text-center">
        <h5 htmlFor="gameID" className="text-white p-3">Game ID</h5>
        <input
          type="number"
          id="gameID"
          className="mb-2"
          value={gameID}
          onChange={handleGameIDChange}
        />
        <FaPlus
          className="text-warning me-2"
          style={{ cursor: 'pointer' }}
          onClick={incrementGameID}
        />
        <FaMinus className="text-warning" style={{ cursor: 'pointer' }} onClick={decrementGameID} />
      </div>
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex' }}>
        <div className="radio-container d-flex">
          <div className="me-1">
            <div className="bg-success fs-3 text-white p-3">WIN</div>
            <div className="radio-col" id="column1">
              <button className="mr-1" onClick={() => selectRadioButton(1, 1)}>1</button>
              <button className="mr-1" onClick={() => selectRadioButton(1, 2)}>2</button>
              <button className="mr-1" onClick={() => selectRadioButton(1, 3)}>3</button>
              <button className="mr-1" onClick={() => selectRadioButton(1, 4)}>4</button>
              <button className="mr-1" onClick={() => selectRadioButton(1, 5)}>5</button>
              <button className="mr-1" onClick={() => selectRadioButton(1, 6)}>6</button>
            </div>
          </div>
          <div className="me-1">
            <div className="bg-primary fs-3 text-white p-3">PLACE</div>
            <div className="radio-col" id="column2">
              <button className="mr-1" onClick={() => selectRadioButton(2, 1)}>1</button>
              <button className="mr-1" onClick={() => selectRadioButton(2, 2)}>2</button>
              <button className="mr-1" onClick={() => selectRadioButton(2, 3)}>3</button>
              <button className="mr-1" onClick={() => selectRadioButton(2, 4)}>4</button>
              <button className="mr-1" onClick={() => selectRadioButton(2, 5)}>5</button>
              <button className="mr-1" onClick={() => selectRadioButton(2, 6)}>6</button>
            </div>
          </div>
          <div className="me-1">
            <div className="bg-danger fs-3 text-white p-3">SHOW</div>
            <div className="radio-col" id="column3">
              <button className="mr-1" onClick={() => selectRadioButton(3, 1)}>1</button>
              <button className="mr-1" onClick={() => selectRadioButton(3, 2)}>2</button>
              <button className="mr-1" onClick={() => selectRadioButton(3, 3)}>3</button>
              <button className="mr-1" onClick={() => selectRadioButton(3, 4)}>4</button>
              <button className="mr-1" onClick={() => selectRadioButton(3, 5)}>5</button>
              <button className="mr-1" onClick={() => selectRadioButton(3, 6)}>6</button>
            </div>
          </div>
        </div>
      </div>
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
                color={selectedAmounts.includes(amount) ? 'primary' : 'dark'}
                className="me-2"
                onClick={() => handleButtonClick(amount)}
                style={{ fontweight: 'bold' }}
              >
                {amount}
              </Button>
            ))}
          </div>
          <div>
            <Button
              color={isQuinellaActive ? 'primary' : 'secondary'}
              onClick={() => {
                handleQunelaClikd();
                console.log('QUINELLA bet placed');
              }}
            >
              QUINELLA
            </Button>
            <Button
              color={isExactaActive ? 'primary' : 'secondary'}
              onClick={() => {
                handleExactCliked();
                console.log('EXACTA bet placed');
              }}
            >
              EXACTA
            </Button>
          </div>
        </div>
      </div>
    </div>
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
      <Col md={4} style={{background: 'linear-gradient(to top, rgb(226, 171, 126), rgb(126, 176, 226))'}} >
      
           <Ticket handlePrint={handlePrint}  isTiketPrinted={isTiketPrinted} newBette={newBette}  ref={tiket} id="ticket" gameID={gameID} isQuinellaActive={isQuinellaActive} isExactaActive={isExactaActive} />
            <div col={1}    className=" mt-4"  onClick={() => handlePrint()}>
              <ReactToPrint
            trigger={() => <Button className="greenButton form-control">Print</Button>}
            content={() => tiket.current} // Make sure this.tiket is a valid reference
                pageStyle="@page { size: 60mm 80mm; margin: 0; }" // Set the size property to 60mm by 80mm
              />
            </div>

          </Col>
         <img src=""/>
        </Row>
        <div style={{backgroundImage: 'url("/dog2.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>
          <p style={{color:'white', paddingLeft:"10px", fontWeight:"bold", fontSize:"20px"}}> this system is provided by Gizework Marye & yohannes mulat</p>
          <p style={{color:'white',marginTop:"40px", paddingLeft:"10px", fontWeight:"bold", fontSize:"20px"}}> phone number 0979458662/0929272814 </p>
          <p>|</p>
          <p>|</p>
          <p>|</p>
          <p>|</p>
          <p>|</p>
          <p>|</p>       
          <div style={{textAlign: 'center'}}>
      <h1>react-timer-hook </h1>
     
    </div>
        </div>
    </div>
  );
};

export default Home;
