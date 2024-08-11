import React, { useState, useRef , useEffect}  from 'react';
import './homePage.css';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { Button, Row, Col} from 'reactstrap';
import  Ticket  from './horsRasingTiket'
import ReactToPrint from "react-to-print"; // Import the ReactToPrint component


const HorsRasingPage = () => {
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


    const buttonStyle = {
      width: '80px',
      height: '50px',
      fontSize: '1.5rem',
      marginRight: '10px',
      marginBottom: '10px',
    };


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
    // const radioColumns = document.querySelectorAll('.radio-col');
    // radioColumns.forEach((column) => {
    //   const buttons = column.querySelectorAll('.mr-1');
    //   buttons.forEach((button) => {
    //     button.classList.remove('selected');
    //   });
    // });
  
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

      console.log(newSelected)


     
  
      const selectedButtonIndex = newSelected.findIndex(  
        (selected) => selected.length > 0 && selected[0] === column
      );
  
      // Remove the previously selected button from the same column
      // if (selectedButtonIndex !== -1) {
      //   const prevIndex = newSelected[selectedButtonIndex][1];
      //   const prevSelectedButton = document.getElementById(`column${column}`).children[prevIndex - 1];
      //   prevSelectedButton.classList.remove('selected');
      //   newSelected.splice(selectedButtonIndex, 1);
      // }
  
      // Check if the same index is selected in any column
      if (isSameIndexSelected(newSelected, column, index)) {
        console.log("Cannot select the same number in multiple columns.");
      } else {
        // Select the new button
        newSelected.push([column, index]);
        const selectedButton = document.getElementById(`column${column}`).children[index - 1];
        // selectedButton.classList.add('selected');
      }
  
      console.log(`Selected buttons: ${JSON.stringify(newSelected)}`);

      // if (newSelected.length === 2) {
      //   setQuinellaActive(false );
      // } else {
      //   setExactaActive(false);
      //   setQuinellaActive(false);
      // }
  
      return newSelected;
    });

    



  };

  useEffect(() => {
    if (selectedButtons.length > 0) {
      console.log("go gogo goggogo gog o googoggo");
  
      // Create the bet object
      const bet = {
        selectedButtons,
        betAmount,
        isExactaActive,
        isQuinellaActive,
      };
  
      // Send the bet object to the Ticket component
      sendToTicket(bet);
  
      // Clear selected buttons
      clearSelectedButtons();
      setExactaActive(false);
      setQuinellaActive(false);
    }
  }, [selectedButtons]);
  
  

    

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
    <div className="container-lg" style={{backgroundImage: 'url("/hourse2.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>

            <h1  className="text-white" style={{ textAlign:'center' }}>3S BETTING</h1>
           
            <div className="text-center mb-3">
            <div className=" text-center" >  
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
            <Col xs="3">
    <div className="radio-container d-flex">
        <div className="me-4">
          
        <div className="bg-success fs-3 text-white p-3 rounded-pill">WIN</div>
          <div className="radio-col" id="column1">
            <div className="d-flex">
                <div className="column">
                    <button style={buttonStyle} className="mr-1 mt-2 custom-button" onClick={() => selectRadioButton(1, 1)}>1</button>
                    <button style={buttonStyle} className="mr-1 custom-button" onClick={() => selectRadioButton(1, 2)}>2</button>
                    <button style={buttonStyle} className="mr-1 custom-button" onClick={() => selectRadioButton(1, 3)}>3</button>
                    <button style={buttonStyle} className="mr-1 custom-button" onClick={() => selectRadioButton(1, 4)}>4</button>
                    <button style={buttonStyle} className="mr-1 custom-button" onClick={() => selectRadioButton(1, 5)}>5</button>
                    <button style={buttonStyle} className="mr-1 custom-button" onClick={() => selectRadioButton(1, 6)}>6</button>
                    <button style={buttonStyle} className="mr-1 custom-button" onClick={() => selectRadioButton(1, 7)}>7</button>
                </div>
                <div className="colstyle={buttonStyle} umn">
                    <button style={buttonStyle} className="mr-1 mt-2 custom-button" onClick={() => selectRadioButton(1, 8)}>8</button>
                    <button style={buttonStyle} className="mr-1 custom-button" onClick={() => selectRadioButton(1, 9)}>9</button>
                    <button style={buttonStyle} className="mr-1 custom-button" onClick={() => selectRadioButton(1, 10)}>10</button>
                    <button style={buttonStyle} className="mr-1 custom-button" onClick={() => selectRadioButton(1, 11)}>11</button>
                    <button style={buttonStyle} className="mr-1 custom-button" onClick={() => selectRadioButton(1, 12)}>12</button>
                    <button style={buttonStyle} className="mr-1 custom-button" onClick={() => selectRadioButton(1, 13)}>13</button>
                    <button  style={buttonStyle} className="mr-1 custom-button" onClick={() => selectRadioButton(1, 14)}>14</button>
                </div>
              </div>
             </div>
        </div>

        <div>
        <div className="bg-primary fs-3 text-white p-3 rounded-pill">PLACE</div>

        <div className="radio-col" id="column2">
            <div className="d-flex">
                <div className="column">
                    <button  style={buttonStyle}className="mr-1 mt-2 custom-button" onClick={() => selectRadioButton(2, 1)}>1</button>
                    <button  style={buttonStyle}className="mr-1 custom-button" onClick={() => selectRadioButton(2, 2)}>2</button>
                    <button  style={buttonStyle}className="mr-1 custom-button" onClick={() => selectRadioButton(2, 3)}>3</button>
                    <button  style={buttonStyle}className="mr-1 custom-button" onClick={() => selectRadioButton(2, 4)}>4</button>
                    <button  style={buttonStyle}className="mr-1 custom-button" onClick={() => selectRadioButton(2, 5)}>5</button>
                    <button  style={buttonStyle}className="mr-1 custom-button" onClick={() => selectRadioButton(2, 6)}>6</button>
                    <button  style={buttonStyle}className="mr-1 custom-button" onClick={() => selectRadioButton(2, 7)}>7</button>
                </div>
                <div className="column">
                    <button style={buttonStyle}className="mr-1 mt-2 custom-button" onClick={() => selectRadioButton(2, 8)}>8</button>
                    <button style={buttonStyle}className="mr-1 custom-button" onClick={() => selectRadioButton(2, 9)}>9</button>
                    <button style={buttonStyle}className="mr-1 custom-button" onClick={() => selectRadioButton(2, 10)}>10</button>
                    <button style={buttonStyle}className="mr-1 custom-button" onClick={() => selectRadioButton(2, 11)}>11</button>
                    <button style={buttonStyle}className="mr-1 custom-button" onClick={() => selectRadioButton(2, 12)}>12</button>
                    <button style={buttonStyle}className="mr-1 custom-button" onClick={() => selectRadioButton(2, 13)}>13</button>
                    <button style={buttonStyle}className="mr-1 custom-button" onClick={() => selectRadioButton(2, 14)}>14</button>
                </div>
              </div>
             </div>
        </div>
    </div>
</Col>

<Col xs="13" style={{backgroundImage: 'url("/imag")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>
        <div>
          <div className="m-4">
            <Button
              id="addButton"
              color="dark"
              onClick={handleAddClick}
              className="text-white"
              size="lg"
            >
              ADD
            </Button>
          </div>
          <label htmlFor="betAmount" id="label">
            Bet Amount
          </label>
          <input
            type="number"
            id="betAmount"
            className="form-control mb-2"
            value={betAmount}
            onChange={handleAmountChange}
          />
          <div>
            {amount.map((amount) => (
              <Button
                key={amount}
                color={selectedAmounts.includes(amount) ? 'primary' : 'orange'}
                className="me-2"
                onClick={() => handleButtonClick(amount)}
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
      </Col>
      <Col xs="6">
        {/* Place other content here if needed */}
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
      <Col md={4} style={{background: 'linear-gradient(to top, rgb(226, 171, 126), rgb(126, 176, 226))', marginLeft:"-12px"}} >
           <Ticket handlePrint={handlePrint}  isTiketPrinted={isTiketPrinted} newBette={newBette} ref={tiket} id="ticket" gameID={gameID} isQuinellaActive={isQuinellaActive} isExactaActive={isExactaActive} />
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
        <div style={{backgroundImage: 'url("/hourse3.jpg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>
          <p> this system is provided by yohannes mulat</p>
          <p>phone number 0979458662 </p>
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

export default HorsRasingPage;
