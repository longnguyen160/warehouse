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
  Span
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
    item,
    quantity,
    size,
    isbn,
    edition,
    price,
    error,
    shelves,
    selectedShelf,
    rowId,
    columnId,
    box,
    handleAddItemFunction,
    hideInput
  } = props;

  const current = box && box.currentQuantity === box.maxItem ? 'full'
    : box && box.currentQuantity === 0 ? 'empty' : 'not full';
  const getPosition = () => (
    <FormBlockStyled show>
      <FormGroupStyled>
        <LineFormStyled hasTitle big>
          <TitleFormStyled>Shelf</TitleFormStyled>
          <select
            onChange={(e) => handleSelectedChange('shelf', e)}
            value={selectedShelf}
          >
            {
              shelves.map(shelf =>
                <option
                  key={shelf._id}
                  value={shelf._id}
                >
                  {shelf.name}
                </option>
              )
            }
          </select>
        </LineFormStyled>
      </FormGroupStyled>
      <FormGroupStyled>
        <LineFormStyled hasTitle big>
          <TitleFormStyled>Row</TitleFormStyled>
          <select
            onChange={(e) => handleSelectedChange('row', e)}
            value={rowId}
          >
            <option value={'1'}>1</option>
            <option value={'2'}>2</option>
            <option value={'3'}>3</option>
            <option value={'4'}>4</option>
          </select>
        </LineFormStyled>
        <LineFormStyled hasTitle big>
          <TitleFormStyled>Column</TitleFormStyled>
          <select
            onChange={(e) => handleSelectedChange('column', e)}
            value={columnId}
          >
            <option value={'1'}>1</option>
            <option value={'2'}>2</option>
            <option value={'3'}>3</option>
            <option value={'4'}>4</option>
          </select>
        </LineFormStyled>
      </FormGroupStyled>
      <FormGroupStyled>
        <FormGroupStyled big>
          <TitleFormStyled>Box:</TitleFormStyled>
          <Span>{box ? box._id : null}</Span>
        </FormGroupStyled>
        <FormGroupStyled big>
          <TitleFormStyled>Status:</TitleFormStyled>
          <Span current={current}>{box ? box.currentQuantity : null}</Span>
          <Span>/</Span>
          <Span max>{box ? box.maxItem : null}</Span>
        </FormGroupStyled>
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
          onChange={(e) => handleSelectedChange('series', e)}
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
          onChange={(e) => handleTextInput('Series', e)}
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
        <LineFormStyled
          marginBottom
          borderBottom
          error={error}
          key={'c'}
          hideInput={hideInput}
        >
          <Input
            type='text'
            placeholder="Size..."
            innerRef={(element) => this.size = element}
            onChange={(e) => handleTextInput('Size', e)}
            borderBottom
          />
        </LineFormStyled>
      </FormGroupStyled>
      <FormGroupStyled hideInput={hideInput}>
        <LineFormStyled
          marginBottom
          borderBottom
          error={error}
          key={'d'}
          hideInput={hideInput}
        >
          <Input
            type='text'
            placeholder="ISBN..."
            innerRef={(element) => this.isbn = element}
            onChange={(e) => handleTextInput('ISBN', e)}
            borderBottom
          />
        </LineFormStyled>
      </FormGroupStyled>
      <FormGroupStyled hideInput={hideInput}>
        <LineFormStyled
          marginBottom
          borderBottom
          error={error}
          key={'e'}
          hideInput={hideInput}
        >
          <Input
            type='text'
            placeholder="Edition..."
            innerRef={(element) => this.edition = element}
            onChange={(e) => handleTextInput('Edition', e)}
            borderBottom
          />
        </LineFormStyled>
        <LineFormStyled
          marginBottom
          borderBottom
          error={error}
          key={'f'}
          hideInput={hideInput}
        >
          <Input
            type='text'
            placeholder="Price..."
            innerRef={(element) => this.price = element}
            onChange={(e) => handleTextInput('Price', e)}
            borderBottom
          />
        </LineFormStyled>
      </FormGroupStyled>
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
              key={2}
            >
              <i className="fa fa-arrow-left"/> Previous
            </Button>
            <Button
              hasBorder
              modal
              onClick={handleAddItemFunction}
              key={3}
              disabled={(box && box.currentQuantity === box.maxItem) ? "disabled" : null}
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
                key={'c'}
              >
                <i className="fa fa-arrow-left"/> Previous
              </Button>
              <Button
                hasBorder
                marginLeft
                modal
                onClick={handleChoosePositionContent}
                key={'d'}
                disabled={(error || !item || !quantity || ((!size || !isbn || !edition || !price) && !hideInput)) ? "disabled" : null}
              >
                Next <i className="fa fa-arrow-right"/>
              </Button>
            </LineFormStyled>
          :
            <Button
              hasBorder
              marginLeft
              modal
              onClick={handleAddItemContent}
              disabled={error ? "disabled" : null}
            >
              Next <i className="fa fa-arrow-right"/>
            </Button>
      }
    </Modal>
  );
};

export default StockInModal;