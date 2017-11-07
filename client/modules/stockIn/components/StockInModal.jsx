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
    handleViewForm,
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
    hideInput,
    status,
    changeButton,
    viewForm,
    submit,
    remainItem,
    seriesname,
    author,
    year,
    publisher,
    allShelves,
    categories,
    selectedShelfForSeries,
    selectedShelves,
    removeShelf,
    selectedCategory,
    selectedCategories,
    removeCategory
  } = props;

  const findBox = status.find(element => element.boxId === box._id);
  const temp = findBox ? Number.parseInt(findBox.number) : 0;
  const current = box && (box.currentQuantity + temp === box.maxItem) ? 'full'
    : box && (box.currentQuantity + temp === 0) ? 'empty' : 'not full';
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
        <FormGroupStyled balance big>
          <TitleFormStyled>Box:</TitleFormStyled>
          <Span>{box ? box.name : null}</Span>
        </FormGroupStyled>
        <FormGroupStyled big>
          <TitleFormStyled>Status:</TitleFormStyled>
          <Span current={current}>{box ? (box.currentQuantity + temp) : null}</Span>
          <Span>/</Span>
          <Span max>{box ? box.maxItem : null}</Span>
        </FormGroupStyled>
      </FormGroupStyled>
      <FormGroupStyled>
        <FormGroupStyled balance big>
          <TitleFormStyled>Remained Quantity:</TitleFormStyled>
          <Span max>{remainItem}</Span>
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
          onChange={(e) => handleTextInput('SeriesName', e)}
          borderBottom
        />
      </LineFormStyled>
      <FormGroupStyled hideInput={selectedOption !== 'other'}>
        <LineFormStyled
          isShowed={selectedOption === 'other'}
          marginBottom
          borderBottom
          error={error}
          key={12}
        >
          <Input
            type='text'
            placeholder="Author..."
            innerRef={(element) => this.author = element}
            onChange={(e) => handleTextInput('Author', e)}
            borderBottom
          />
        </LineFormStyled>
        <LineFormStyled
          isShowed={selectedOption === 'other'}
          marginBottom
          borderBottom
          error={error}
          key={13}
          hideInput={hideInput}
        >
          <Input
            type='text'
            placeholder="Publish Year..."
            innerRef={(element) => this.year = element}
            onChange={(e) => handleTextInput('Year', e)}
            borderBottom
          />
        </LineFormStyled>
      </FormGroupStyled>
      <LineFormStyled
        isShowed={selectedOption === 'other'}
        marginBottom
        borderBottom
        error={error}
        key={14}
        hideInput={hideInput}
      >
        <Input
          type='text'
          placeholder="Publisher..."
          innerRef={(element) => this.publisher = element}
          onChange={(e) => handleTextInput('Publisher', e)}
          borderBottom
        />
      </LineFormStyled>
      <FormGroupStyled
        hideInput={selectedOption !== 'other'}
        fullHeight
      >
        <LineFormStyled
          alignCenter
          marginBottom
          isShowed={selectedOption === 'other'}
          key={16}
          hasTitle
          fullHeight
        >
          <TitleFormStyled flex>Shelf </TitleFormStyled>
          <select
            onChange={(e) => handleSelectedChange('shelves', e)}
            value={selectedShelfForSeries}
          >
            {
              allShelves.map((element, index) =>
                <option
                  key={element.name}
                  value={element._id}
                >
                  {element.name}
                </option>
              )
            }
          </select>
        </LineFormStyled>
        <LineFormStyled
          isShowed={selectedOption === 'other'}
          hasTitle
          marginBottom
          borderBottom
          error={error}
          key={15}
          fullHeight
        >
          {
            selectedShelves.map(shelf =>
              <Text key={shelf._id}>
                <Span>{shelf.name}</Span>
                <i className="fa fa-times" onClick={(e) => removeShelf(shelf._id, e)}/>
              </Text>
            )
          }
        </LineFormStyled>
      </FormGroupStyled>
      <FormGroupStyled
        hideInput={selectedOption !== 'other'}
        fullHeight
      >
        <LineFormStyled
          alignCenter
          marginBottom
          isShowed={selectedOption === 'other'}
          key={17}
          hasTitle
          fullHeight
        >
          <TitleFormStyled flex>Category</TitleFormStyled>
          <select
            onChange={(e) => handleSelectedChange('category', e)}
            value={selectedCategory}
          >
            {
              categories.map((element, index) =>
                <option
                  key={element.name}
                  value={element._id}
                >
                  {element.name}
                </option>
              )
            }
          </select>
        </LineFormStyled>
        <LineFormStyled
          isShowed={selectedOption === 'other'}
          hasTitle
          marginBottom
          borderBottom
          error={error}
          key={18}
          fullHeight
        >
          {
            selectedCategories.map(category =>
              <Text key={category._id}>
                <Span>{category.name}</Span>
                <i className="fa fa-times" onClick={(e) => removeCategory(category._id, e)}/>
              </Text>
            )
          }
        </LineFormStyled>
      </FormGroupStyled>
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
            status.map((element, index) =>
              <span key={element.boxId}>
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

  const disabled = (error || !item || !quantity || ((!size || !isbn || !edition || !price) && !hideInput));
  const disabledNext = (selectedOption === 'other'
    && (error || !seriesname || !author || !year || !publisher || (selectedShelves.length === 0) || (selectedCategories.length === 0)));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <TitleAccountStyled>
        {
          viewForm ?
            'Submit Form'
          : choosePositionContent ?
            'Get Position'
            : addItemContent ?
              'Add Item'
              : 'Choose Series'
        }
      </TitleAccountStyled>
      {
        viewForm ?
          viewFormDetails()
        : choosePositionContent ?
          getPosition()
          : addItemContent ?
            addItem()
            : chooseSeries()
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
              onClick={submit}
              key={'h'}
            >
              <i className="fa fa-check"/> Submit
            </Button>
          </LineFormStyled>
        : choosePositionContent ?
          <LineFormStyled>
            <Button
              hasBorder
              modal
              onClick={handleChoosePositionContent}
              key={2}
            >
              <i className="fa fa-arrow-left"/> Previous
            </Button>
            {
              changeButton ?
                <Button
                  hasBorder
                  marginLeft
                  modal
                  onClick={handleViewForm}
                  key={'e'}
                >
                  Next <i className="fa fa-arrow-right"/>
                </Button>
              :
                <Button
                  hasBorder
                  modal
                  onClick={handleAddItemFunction}
                  key={3}
                  disabled={current === 'full' ? "disabled" : null}
                >
                  <i className="fa fa-check-square-o"/> Add
                </Button>
            }
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
                  disabled={disabled ? "disabled" : null}
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
                disabled={disabledNext ? "disabled" : null}
              >
                Next <i className="fa fa-arrow-right"/>
              </Button>
      }
    </Modal>
  );
};

export default StockInModal;