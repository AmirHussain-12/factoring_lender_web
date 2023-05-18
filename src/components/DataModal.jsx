import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const DataModal = ({
  handleToggle,
  bodyContent,
  headerText,
  okayText,
  handleOkay,
  cancelText,
  handleCancel,
  hasFooter,
  ...props
}) => {

  const handleClose = () => handleToggle(false);

  return (
    <Modal {...props} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{headerText}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{bodyContent}</Modal.Body>
      {hasFooter &&
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>{
            if(handleCancel) handleCancel()
            handleToggle(false)}}>{cancelText}</Button>
          <Button variant="primary" onClick={()=>{
            if(handleOkay) handleOkay()
            handleToggle(false)
          }}>{okayText}</Button>
        </Modal.Footer>
      }
    </Modal>
  );
}

export default DataModal