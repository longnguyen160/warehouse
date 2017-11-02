import React from 'react';
import Modal from '../../modal/Modal';
import {
  TitleAccountStyled,
  FormBlockStyled,
  FormGroupStyled,
  LineFormStyled,
  TitleFormStyled,
  Input,
  TextErrorStyled
} from '../../../stylesheets/GeneralStyled';
import { Button } from '../../../stylesheets/Button';

const StockInModal = (props) => {
  const {
    isOpen,
    onClose,
    handleSelectedChange,
    selectedOption,
    handleAddItemContent,
    handleChoosePositionContent,
    addItemContent,
    choosePositionContent,
    series,
    handleTextInput,
    error
  } = props;
  const getPosition = () => (
    <FormBlockStyled show>
      <FormGroupStyled>
        <LineFormStyled hasTitle>
          <TitleFormStyled>Shelf</TitleFormStyled>
          <select onChange={handleSelectedChange}>
            <option value={0}>SH1</option>
            <option value={1}>SH2</option>
            <option value={3}>SH3</option>
          </select>
        </LineFormStyled>
      </FormGroupStyled>
      <FormGroupStyled>
        <LineFormStyled hasTitle>
          <TitleFormStyled>Row</TitleFormStyled>
          <select onChange={handleSelectedChange}>
            <option value={0}>1</option>
            <option value={1}>2</option>
            <option value={3}>3</option>
          </select>
        </LineFormStyled>
        <LineFormStyled hasTitle>
          <TitleFormStyled>Column</TitleFormStyled>
          <select onChange={handleSelectedChange}>
            <option value={0}>1</option>
            <option value={1}>2</option>
            <option value={3}>3</option>
          </select>
        </LineFormStyled>
      </FormGroupStyled>
    </FormBlockStyled>
  );
  const chooseSeries = () => (
    <FormBlockStyled show>
      <LineFormStyled
        alignCenter
        marginBottom
        key={0}
      >
        <select
          onChange={handleSelectedChange}
          value={selectedOption}
        >
          {
            series.map(element =>
              <option
                key={element._id}
                value={element._id}
              >
                {element.name}
              </option>
            )
          }
          <option value='other'>Other</option>
        </select>
      </LineFormStyled>
      <LineFormStyled
        isShowed={selectedOption === 'other'}
        error={error}
        marginBottom
        borderBottom
        key={1}
      >
        <Input
          type='text'
          placeholder="Series name..."
          innerRef={(element) => this.series = element}
          onChange={(e) => handleTextInput('series', e)}
          borderBottom
        />
      </LineFormStyled>
      <TextErrorStyled error={error}>
        {error}
      </TextErrorStyled>
    </FormBlockStyled>
  );
  const addItem = () => (
    <FormBlockStyled show>
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
          onChange={(e) => handleTextInput('item', e)}
          borderBottom
        />
      </LineFormStyled>
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
          onChange={(e) => handleTextInput('quantity', e)}
          borderBottom
        />
      </LineFormStyled>
      <TextErrorStyled error={error}>
        {error}
      </TextErrorStyled>
    </FormBlockStyled>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <TitleAccountStyled>
        {
          choosePositionContent ?
            'Get Position'
          : addItemContent ?
            'Add Item'
            : 'Choose Series'
        }
      </TitleAccountStyled>
      {
        choosePositionContent ?
          getPosition()
        : addItemContent ?
          addItem()
          : chooseSeries()
      }
      {
        choosePositionContent ?
          <LineFormStyled>
            <Button
              hasBorder
              modal
              onClick={handleChoosePositionContent}
            >
              <i className="fa fa-arrow-left"/> Previous
            </Button>
            <Button
              hasBorder
              modal
              onClick={handleChoosePositionContent}
            >
              <i className="fa fa-check-square-o"/> Add
            </Button>
          </LineFormStyled>
        :
          addItemContent ?
            <LineFormStyled>
              <Button
                hasBorder
                modal
                onClick={handleAddItemContent}
              >
                <i className="fa fa-arrow-left"/> Previous
              </Button>
              <Button
                hasBorder
                marginLeft
                modal
                onClick={handleChoosePositionContent}
              >
                Next <i className="fa fa-arrow-right"/>
              </Button>
            </LineFormStyled>
          :
            <Button hasBorder marginLeft modal onClick={handleAddItemContent}>
              Next <i className="fa fa-arrow-right"/>
            </Button>
      }
    </Modal>
  );
};

export default StockInModal;