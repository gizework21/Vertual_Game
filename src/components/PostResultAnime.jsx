import { useState } from 'react';
import { Form, Row, Col, Spinner, Button, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import {  selectUser } from "../redux/slice/userSlice";
import {BASE_URL} from "../api/baseURL";


const ResultModalPage = () => {
  const user = useSelector(selectUser);

  const [formData, setFormData] = useState({
    gameId: '',
    firstNumber: '',
    firstOdd: '',
    secondNumber: '',
    secondOdd: ''
  });

  const [lastRenderedComponent, setLastRenderedComponent] = useState(''); // Default to empty string
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({}); // State to store validation errors

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    // Ensure only numbers or valid float numbers are entered
    if (/^\d*\.?\d*$/.test(value)) {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value
      }));
    }
  };

  const handleComponentChange = (e) => {
    setLastRenderedComponent(e.target.value);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!lastRenderedComponent) newErrors.lastRenderedComponent = 'Component is required';
    if (!formData.gameId) newErrors.gameId = 'Game ID is required';
    if (!formData.firstNumber) newErrors.firstNumber = 'First winner number is required';
    if (!formData.firstOdd) newErrors.firstOdd = 'First winner odd is required';
    if (!formData.secondNumber) newErrors.secondNumber = 'Second winner number is required';
    if (!formData.secondOdd) newErrors.secondOdd = 'Second winner odd is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Parse numeric values
    const parsedFormData = {
      gameId: parseInt(formData.gameId),
      First: {
            [`DogPlaceNum`]: parseInt(formData.firstNumber),
            [`DogPlaceOdd`]: parseFloat(formData.firstOdd)
          },
          Second: {
            [`DogPlaceNum`]: parseInt(formData.secondNumber),
            [`DogPlaceOdd`]: parseFloat(formData.secondOdd)
          },
      type:[`${lastRenderedComponent}`]
    };

    try {
      console.log("parsedFormData: ",parsedFormData)
      const dataa={
        First:parsedFormData.First,
        Second:parsedFormData.Second,
        type:parsedFormData.type[0],
        gameId:parsedFormData.gameId,
        tiketerId: `${user._id}`,
      }
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_VITE_API_URL}/gameresult`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataa)
      });

      if (response.ok) {
        toast.success('Data saved successfully!');
        setFormData({
          gameId: '',
          firstNumber: '',
          firstOdd: '',
          secondNumber: '',
          secondOdd: ''
        });
        setErrors({});
      } else {
        toast.error('Failed to save data!');
      }
    } catch (error) {
      toast.error('Error occurred while saving data!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ margin: '60px auto', maxWidth: '800px' }}>
      <Card style={{ backgroundColor: '#e0e0e0', padding: '20px', height: '510px', overflowY: 'auto' }}>
        <h2>{`Insert ${lastRenderedComponent} Result`}</h2>
        <Form>
          <Form.Group controlId="componentSelect">
            <Form.Label style={{ fontSize: '20px',  fontWeight: 'bold', backgroundColor: '', marginTop:"15px" }}>Select Component</Form.Label>
            <Form.Control
              as="select"
              value={lastRenderedComponent || ''}
              onChange={handleComponentChange}
              isInvalid={!!errors.lastRenderedComponent}
              style={{ width: '150px' }}
            >
              <option value="" disabled>Select...</option>
              <option value="Dog">Dog</option>
              <option value="Horse">Horse</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">{errors.lastRenderedComponent}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="gameId">
            <Form.Label style={{ fontSize: '20px',  fontWeight: 'bold', backgroundColor: '' }}>GameId</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter GameId"
              value={formData.gameId}
              onChange={handleInputChange}
              isInvalid={!!errors.gameId}
            />
            <Form.Control.Feedback type="invalid">{errors.gameId}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="firstNumber">
            <Form.Label style={{  fontSize: '20px', fontWeight: 'bold', backgroundColor: '' }}>First Winner</Form.Label>
            <Row>
              <Col>
                <Form.Control
                  type="number"
                  placeholder={`Enter ${lastRenderedComponent} Winner number`}
                  value={formData.firstNumber}
                  onChange={handleInputChange}
                  id="firstNumber"
                  isInvalid={!!errors.firstNumber}
                />
                <Form.Control.Feedback type="invalid">{errors.firstNumber}</Form.Control.Feedback>
              </Col>
              <Col>
                <Form.Control
                  type="text" // Use type="text" for float numbers
                  placeholder={`Enter ${lastRenderedComponent} Odd number`}
                  value={formData.firstOdd}
                  onChange={handleInputChange}
                  id="firstOdd"
                  isInvalid={!!errors.firstOdd}
                />
                <Form.Control.Feedback type="invalid">{errors.firstOdd}</Form.Control.Feedback>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group controlId="secondNumber">
            <Form.Label style={{ontSize: '20px', fontWeight: 'bold', backgroundColor: '' }}>Second Winner</Form.Label>
            <Row>
              <Col>
                <Form.Control
                  type="number"
                  placeholder={`Enter ${lastRenderedComponent} Second number`}
                  value={formData.secondNumber}
                  onChange={handleInputChange}
                  id="secondNumber"
                  isInvalid={!!errors.secondNumber}
                />
                <Form.Control.Feedback type="invalid">{errors.secondNumber}</Form.Control.Feedback>
              </Col>
              <Col>
                <Form.Control
                  type="text" // Use type="text" for float numbers
                  placeholder={`Enter ${lastRenderedComponent} Place Odd`}
                  value={formData.secondOdd}
                  onChange={handleInputChange}
                  id="secondOdd"
                  isInvalid={!!errors.secondOdd}
                />
                <Form.Control.Feedback type="invalid">{errors.secondOdd}</Form.Control.Feedback>
              </Col>
            </Row>
          </Form.Group>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={loading}
            style={{ width: '200px', marginTop: '40px', height: '45px' }}
          >
            {loading ? <Spinner animation="border" size="sm" /> : 'Save'}
          </Button>
        </Form>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default ResultModalPage;
