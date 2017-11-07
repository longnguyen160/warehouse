import React from 'react';
import Modal from '../../modal/Modal';
import {
  TitleAccountStyled,
  FormBlockStyled,
  FormGroupStyled,
  LineFormStyled,
  TitleFormStyled,
  Input,
  TextErrorStyled,
  Span,
  Text
} from '../../../stylesheets/GeneralStyled';
import { Button } from '../../../stylesheets/Button';

const StockOutModal = (props) => {
  const {
    isOpen,
    onClose,
    handleTextInput,
    viewForm,
    handleViewForm,
    handleSubmitItem,
    boxes,
    error,
    item,
    quantity
  } = props;

  const stockOutItem = () => (
    <FormBlockStyled show>
      <FormGroupStyled>
        <LineFormStyled
          marginBottom
          borderBottom
          error={error}
          key={'a'}
        >
          <Input
            type='text'
            placeholder="Item name..."
            innerRef={(element) => this.item = element}
            onChange={(e) => handleTextInput('Item', e)}
            borderBottom
          />
        </LineFormStyled>
      </FormGroupStyled>
      <FormGroupStyled>
        <LineFormStyled
          marginBottom
          borderBottom
          error={error}
          key={'b'}
        >
          <Input
            type='text'
            placeholder="Quantity..."
            innerRef={(element) => this.quantity = element}
            onChange={(e) => handleTextInput('Quantity', e)}
            borderBottom
          />
        </LineFormStyled>
      </FormGroupStyled>
      <TextErrorStyled error={error}>
        {error}
      </TextErrorStyled>
    </FormBlockStyled>
  );

  const viewFormDetails = () => (
    <FormBlockStyled show>
      <FormGroupStyled big>
        <TitleFormStyled flex>Name: </TitleFormStyled>
        <span>{item}</span>
      </FormGroupStyled>
      <FormGroupStyled big>
        <TitleFormStyled flex>Quantity: </TitleFormStyled>
        <span>{quantity}</span>
      </FormGroupStyled>
      <FormGroupStyled big>
        <LineFormStyled alignCenter noMargin big>
          <TitleFormStyled flex>Box - Quantity: </TitleFormStyled>
        </LineFormStyled>
        <LineFormStyled hasTitle right noMargin marginBottom big>
          {
            boxes.map((element, index) =>
              <span key={element._id}>
                <Span>{element.boxName}</Span>
                <Span current='empty'>-</Span>
                <Span max>{element.number}</Span>
              </span>
            )
          }
        </LineFormStyled>
      </FormGroupStyled>
    </FormBlockStyled>
  );

  const disabled = (error || !item || !quantity);
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <TitleAccountStyled>
        Stock Out
      </TitleAccountStyled>
      {
        viewForm ?
          viewFormDetails()
        : stockOutItem()
      }
      {
        viewForm ?
          <LineFormStyled>
            <Button
              hasBorder
              modal
              onClick={handleViewForm}
              key={'g'}
            >
              <i className="fa fa-arrow-left"/> Previous
            </Button>
            <Button
              hasBorder
              modal
              onClick={handleSubmitItem}
              key={'h'}
            >
              <i className="fa fa-check"/> Submit
            </Button>
          </LineFormStyled>
        :
          <Button
            hasBorder
            marginLeft
            modal
            onClick={handleViewForm}
            disabled={disabled ? "disabled" : null}
          >
            Next <i className="fa fa-arrow-right"/>
          </Button>
      }
    </Modal>
  );
};

export default StockOutModal;