import React from 'react';
import { Modal, Button, VStack } from 'native-base';

const GeneralModal = ({ isOpen, onClose, title, children, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>
          <VStack space={4}>
            {children}
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <Button onPress={onConfirm} colorScheme="orange">
            Confirm
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default GeneralModal;
