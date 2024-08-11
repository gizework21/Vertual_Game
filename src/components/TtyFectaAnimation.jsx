import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import ResultModal from './ResultModal';
import MainHome from './MainComponent';

const Animation = () => {
  const navigate = useNavigate();
  const [showMainComponent, setShowMainComponent] = useState(true);
  const [timer, setTimer] = useState(0);
  const [modalTimer, setModalTimer] = useState(60); // 1 minute for modal
  const [showModal, setShowModal] = useState(false);
  const isFetching = useRef(false); // Track ongoing fetch with useRef

  const fetchServerTime = useCallback(async () => {
    if (isFetching.current) return; // Skip if a fetch is already in progress

    isFetching.current = true;
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_VITE_API_URL}/`); // Use the fetched baseURL to construct the API route
      const data = await response.json();
      const serverTime = new Date(data.time);
      return serverTime;
    } catch (error) {
      console.error('Failed to fetch server time:', error);
    } finally {
      isFetching.current = false;
    }
  }, []);

  const calculateTimers = useCallback(async (initial = false) => {
    const now = await fetchServerTime();
    if (!now) return;

    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const totalSeconds = minutes * 60 + seconds;
    const cycleSeconds = totalSeconds % 240; // 4-minute cycle (240 seconds)

    let newTimer = 0;
    let isModal = false;

    if (cycleSeconds < 60) {
      // First 1 minute: showModal
      newTimer = 60 - cycleSeconds;
      isModal = true;
    } else {
      // Next 3 minutes: showMainComponent
      newTimer = 240 - cycleSeconds;
      setShowMainComponent(true);
    }

    setShowModal(isModal);
    setTimer(newTimer);
    if (isModal) {
      setModalTimer(newTimer);
    }

    if (initial) {
      setInterval(() => {
        calculateTimers();
      }, 60000);
    }
  }, [fetchServerTime]);

  useEffect(() => {
    calculateTimers(true); // Initial calculation and start periodic server time fetch

    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 0) {
          calculateTimers();
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [calculateTimers]);

  useEffect(() => {
    if (showModal) {
      const modalInterval = setInterval(() => {
        setModalTimer((prevModalTimer) => {
          if (prevModalTimer <= 1) {
            clearInterval(modalInterval);
            calculateTimers();
            return 60;
          }
          return prevModalTimer - 1;
        });
      }, 1000);

      return () => clearInterval(modalInterval);
    }
  }, [showModal, calculateTimers]);

  const lastComponentType = showMainComponent ? 'Main' : 'Modal';

  return (
    <div>
      <div className="fixed-top">
        <Alert variant="primary" style={{ zIndex: '1000' }}>
          <Container fluid>
            <Row className="align-items-center">
              <Col className="text-center">
                <span style={{ fontSize: '24px', color: showModal ? 'red' : 'green', fontWeight: 'bold' }}>
                  {showModal 
                    ? `Modal closes in 0:${modalTimer < 10 ? `0${modalTimer}` : modalTimer} minutes`
                    : `Next switch in ${Math.floor(timer / 60)}:${timer % 60 < 10 ? `0${timer % 60}` : timer % 60} minutes`}
                </span>
              </Col>
              <Col>
                {/* Empty column for spacing purposes */}
              </Col>
            </Row>
          </Container>
        </Alert>
      </div>
      <Container fluid>
        <Row>
          <Col md={12} style={{ marginTop: '15px', paddingLeft: '0px', paddingRight: '0px' }}>
            {showMainComponent ? <MainHome /> : <MainHome />}
          </Col>
        </Row>
      </Container>
      <ResultModal show={showModal} lastRenderedComponent={lastComponentType} modalTimer={modalTimer} />
    </div>
  );
};

export default Animation;
