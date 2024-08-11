// ResultModal.js

import React from 'react';
import { Modal } from 'react-bootstrap';
import './resultCss.css'; // Import the CSS file

const ResultModal = ({ show, lastRenderedComponent, modalTimer }) => {
  return (
    <Modal show={show} onHide={() => {}} centered>
      <Modal.Header>
        {/* <Modal.Title style={{  paddingLeft : '150px' }} >Result Modal</Modal.Title> */}
      </Modal.Header>
      <Modal.Body>
        <div className="circle">
          0:{modalTimer < 10 ? `0${modalTimer}` : modalTimer}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ResultModal;
