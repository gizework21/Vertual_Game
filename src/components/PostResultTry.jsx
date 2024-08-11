import React, { useState } from 'react';
import { Form, Row, Col, Spinner, Button, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { initializeUser, selectUser } from "../redux/slice/userSlice";
import { useSelector, useDispatch } from "react-redux";
import {BASE_URL} from "../api/baseURL";

const ResultModalPage = () => {
  const user = useSelector(selectUser);
  const [formData, setFormData] = useState({
    gameId: '',
    firstNumber: '',
    thridNumber: '',
    firstOdd: '',
    secondNumber: '',
    secondOdd: '',
    exactOdd: '',
    tryfectaOdd: '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    gameId: '',
    firstNumber: '',
    thridNumber: '',
    firstOdd: '',
    secondNumber: '',
    secondOdd: '',
    exactOdd: '',
    tryfectaOdd: '',
  });

  console.log(user._id)

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (/^\d*\.?\d*$/.test(value)) {
      setFormData((prevData) => ({
        ...prevData,
        [id]: value
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.gameId) newErrors.gameId = 'GameId is required';
    if (!formData.firstNumber) newErrors.firstNumber = 'First winner number is required';
    if (!formData.firstOdd) newErrors.firstOdd = 'First odd number is required';
    if (!formData.secondNumber) newErrors.secondNumber = 'Second winner number is required';
    if (!formData.secondOdd) newErrors.secondOdd = 'Second odd number is required';
    if (!formData.thridNumber) newErrors.thridNumber = 'Thrid winner number is required';
    if (!formData.exactOdd) newErrors.exactOdd = ' Exact odd number is required';
    if (!formData.tryfectaOdd) newErrors.tryfectaOdd = ' tryfectaOdd number is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const parsedFormData = {
      gameId: parseInt(formData.gameId),
      tiketerId: `${user._id}`,
      resalt: {
        first: parseInt(formData.firstNumber),
        second: parseFloat(formData.secondNumber),
        third: parseFloat(formData.thridNumber)
      },
      windOdd: parseFloat(formData.firstOdd),
      qunelaOdd: parseFloat(formData.secondOdd),
      exactOdd: parseFloat(formData.exactOdd),
      tryfectaOdd: parseFloat(formData.tryfectaOdd),
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_VITE_API_URL}/grayhorn-resulat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(parsedFormData)
      });

      if (response.ok) {
        toast.success('Data saved successfully!');
        setFormData({
          gameId: '',
          firstNumber: '',
          thridNumber: '',
          firstOdd: '',
          secondNumber: '',
          secondOdd: '',
          exactOdd: '',
          tryfectaOdd: '',
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
    <div style={{ margin: '40px auto', maxWidth: '800px' }}>
      <Card style={{ backgroundColor: '#e0e0e0', padding: '20px', height: '620px', overflowY: 'auto' }}>
        <h2>Insert TryFecta Result</h2>
        <Form>
          <Row>
            <Col md={12}>
              <Form.Group controlId="gameId">
                <Form.Label style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '15px' }}>GameId</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter GameId"
                  value={formData.gameId}
                  onChange={handleInputChange}
                  isInvalid={!!errors.gameId}
                />
                <Form.Control.Feedback type="invalid">{errors.gameId}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="firstNumber">
                <Form.Label style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '15px' }}>First Winner</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter tryFecta Winner number"
                  value={formData.firstNumber}
                  onChange={handleInputChange}
                  isInvalid={!!errors.firstNumber}
                />
                <Form.Control.Feedback type="invalid">{errors.firstNumber}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="firstOdd">
                <Form.Label style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '15px' }}>First Winner Odd</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter tryFecta Odd number"
                  value={formData.firstOdd}
                  onChange={handleInputChange}
                  isInvalid={!!errors.firstOdd}
                />
                <Form.Control.Feedback type="invalid">{errors.firstOdd}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="secondNumber">
                <Form.Label style={{ fontSize: '20px', fontWeight: 'bold' }}>Second Winner</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter tryFecta Second number"
                  value={formData.secondNumber}
                  onChange={handleInputChange}
                  isInvalid={!!errors.secondNumber}
                />
                <Form.Control.Feedback type="invalid">{errors.secondNumber}</Form.Control.Feedback>
              </Form.Group>
            </Col>

           
            
            <Col md={6}>
              <Form.Group controlId="secondOdd">
                <Form.Label style={{ fontSize: '20px', fontWeight: 'bold' }}>Qunella Odd</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter tryFecta Place Odd"
                  value={formData.secondOdd}
                  onChange={handleInputChange}
                  isInvalid={!!errors.secondOdd}
                />
                <Form.Control.Feedback type="invalid">{errors.secondOdd}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="thridNumber">
                <Form.Label style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '15px' }}>Thrid Winner</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter tryFecta Thrid number"
                  value={formData.thridNumber}
                  onChange={handleInputChange}
                  isInvalid={!!errors.thridNumber}
                />
                <Form.Control.Feedback type="invalid">{errors.thridNumber}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="exactOdd">
                <Form.Label style={{ fontSize: '20px', fontWeight: 'bold' }}>Exact Odd</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter tryFecta Place Odd"
                  value={formData.exactOdd}
                  onChange={handleInputChange}
                  isInvalid={!!errors.exactOdd}
                />
                <Form.Control.Feedback type="invalid">{errors.exactOdd}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="tryfectaOdd">
                <Form.Label style={{ fontSize: '20px', fontWeight: 'bold' }}>TryFecta Odd</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter tryFecta Place Odd"
                  value={formData.tryfectaOdd}
                  onChange={handleInputChange}
                  isInvalid={!!errors.tryfectaOdd}
                />
                <Form.Control.Feedback type="invalid">{errors.tryfectaOdd}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
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
