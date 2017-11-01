import React from 'react';
import { ModalContent, MyModal } from "../../stylesheets/Modal";

export default class Modal extends React.Component {
  closeModal = () => {
    this.props.onClose();
  }

  clickModal = (e) => {
    e.stopPropagation();
  }

  render() {
    const { isOpen } = this.props;

    return (
      <MyModal
        onClick={this.closeModal}
        isOpen={isOpen}
      >
        <ModalContent onClick={this.clickModal}>
          {this.props.children}
        </ModalContent>
      </MyModal>
    );
  }
};