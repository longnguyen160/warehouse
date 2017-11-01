import React from 'react';
import Modal from '../../modal/Modal';
import {
  TitleAccountStyled,
  FormBlockStyled,
  FormGroupStyled,
  LineFormStyled,
  TitleFormStyled,
  Input,
  TextArea,
  TextErrorStyled
} from '../../../stylesheets/GeneralStyled';
import { Button } from '../../../stylesheets/Button';

const StockInModal = (props) => {
  const { isOpen, onClose, handleSelectedChange, selectedOption, handleNextContent, nextContent } = props;
  const chooseSeries = () => (
    <FormBlockStyled show>
      <LineFormStyled alignCenter marginBottom>
        <select onChange={handleSelectedChange}>
          <option value={0}>JoJo's Bizarre Adventure</option>
          <option value={1}>Kết Giới Sư</option>
          <option value='other'>Other</option>
        </select>
      </LineFormStyled>
      <LineFormStyled isShowed={selectedOption === 'other'} marginBottom>
        <Input
          onKeyPress={this.handleKeyPress}
          type='text'
          placeholder="Series name..."
          innerRef={(element) => this.series = element}
        />
      </LineFormStyled>
    </FormBlockStyled>
  );
  const addItem = () => (
    <FormBlockStyled show>
      <LineFormStyled marginBottom borderBottom>
        <Input
          onKeyPress={this.handleKeyPress}
          type='text'
          placeholder="Item name..."
          innerRef={(element) => this.item = element}
          borderBottom
        />
      </LineFormStyled>
      <LineFormStyled marginBottom borderBottom>
        <Input
          onKeyPress={this.handleKeyPress}
          type='text'
          placeholder="Quantity..."
          innerRef={(element) => this.quantity = element}
          borderBottom
        />
      </LineFormStyled>
    </FormBlockStyled>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <TitleAccountStyled>Choose Series</TitleAccountStyled>
      {nextContent ? addItem() : chooseSeries()}
      <Button hasBorder marginLeft modal onClick={handleNextContent}>
        Next <i className="fa fa-arrow-right" />
      </Button>
    </Modal>
  );
}

export default StockInModal;