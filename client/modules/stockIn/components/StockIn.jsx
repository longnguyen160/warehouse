import React, { Component } from 'react';
import ReactDOM from "react-dom";
import {
  FormStyled,
  PageStyled,
  FormBlockStyled,
  FormGroupStyled,
  LineFormStyled,
  TitleFormStyled,
  Input,
  PageCustomStyled,
  Image
} from '../../../stylesheets/GeneralStyled';
import { Button } from '../../../stylesheets/Button';
import StockInModal from './StockInModal';
import { CHECK } from '../../../../lib/enums';

export default class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      addItemContent: false,
      choosePositionContent: false,
      viewForm: false,
      error: '',
      status: []
    };
  }

  componentDidMount() {
    const scroll = ReactDOM.findDOMNode(this.scroll);
    scroll.addEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate() {
    const scroll = ReactDOM.findDOMNode(this.scroll);
    scroll.scrollTop = scroll.scrollHeight;
  }

  componentWillUnmount() {
    const scroll = ReactDOM.findDOMNode(this.scroll);
    scroll.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
  };

  handleModal = () => {
    const { isModalOpen } = this.state;
    this.setState({
      isModalOpen: !isModalOpen,
      error: null
    });
    setTimeout(() =>
      this.setState({
        addItemContent: false,
        choosePositionContent: false,
      })
    , 500);
  };

  checkEmpty = (type, e) => {
    let { error } = this.state;
    const update = {};

    if (e.target.value.trim() === '') {
      this.setState({ error: `${type} is invalid`});
    } else if (error === `${type} is invalid`) {
      update['error'] = null;
    }
    update[type.toLowerCase()] = e.target.value.trim();
    this.setState(update);
  };

  checkPositiveNumber = (type, e) => {
    let { error } = this.state;
    const update = {};

    if (!(e.target.value.trim().length > 0 && CHECK.IS_POSITIVE_NUMBER.test(e.target.value.trim()))) {
      this.setState({ error: `${type} is invalid`});
    } else if (error === `${type} is invalid`) {
      update['error'] = null;
    }
    update[type.toLowerCase()] = e.target.value.trim();
    this.setState(update);
  };

  handleTextInput = (type, e) => {
    const { selectOption } = this.props;

    if (type === 'Quantity' || type === 'Price') {
      this.checkPositiveNumber(type, e);
    } else this.checkEmpty(type, e);
    if (type === 'Item') {
      selectOption(e.target.value, 'name');
    }
  };

  handleSelectedChange = (type, e) => {
    const { selectOption } = this.props;

    this.setState({ error: null });
    selectOption(e.target.value, type);
  };

  handleAddItemContent = () => {
    const { addItemContent } = this.state;

    this.setState({
      addItemContent: !addItemContent,
      error: null
    });
  };

  handleChoosePositionContent = () => {
    const { choosePositionContent, item, quantity, size, isbn, edition, price } = this.state;
    const { selectOption } = this.props;

    selectOption({ item, quantity, size, isbn, edition, price }, 'item');
    this.setState({
      choosePositionContent: !choosePositionContent,
      error: null
    });
  };

  handleAddItemFunction = () => {
    const { box } = this.props;
    const { status, quantity } = this.state;
    const number = (quantity <= box.maxItem - box.currentQuantity) ? quantity : box.maxItem - box.currentQuantity;

    status.push({
      boxId: box._id,
      boxName: box.name,
      number
    });
    this.setState({
      status,
      quantity: quantity - number,
      changeButton: quantity - number === 0
    });
  };

  handleViewForm = () => {
    const { viewForm } = this.state;

    this.setState({ viewForm: !viewForm });
  };

  submit = () => {

  };

  render() {
    const {
      isModalOpen,
      addItemContent,
      choosePositionContent,
      error,
      item,
      quantity,
      size,
      isbn,
      edition,
      price,
      status,
      changeButton,
      viewForm
    } = this.state;
    const { series, selectedOption, shelves, selectedShelf, rowId, columnId, box, hideInput } = this.props;

    return (
      <FormStyled>
        <StockInModal
          isOpen={isModalOpen}
          onClose={this.handleModal}
          handleSelectedChange={this.handleSelectedChange}
          selectedOption={selectedOption}
          handleAddItemContent={this.handleAddItemContent}
          handleChoosePositionContent={this.handleChoosePositionContent}
          addItemContent={addItemContent}
          choosePositionContent={choosePositionContent}
          handleAddItemFunction={this.handleAddItemFunction}
          handleTextInput={this.handleTextInput}
          handleViewForm={this.handleViewForm}
          submit={this.submit}
          series={series}
          error={error}
          item={item}
          quantity={quantity}
          size={size}
          isbn={isbn}
          edition={edition}
          price={price}
          shelves={shelves}
          selectedShelf={selectedShelf}
          rowId={rowId}
          columnId={columnId}
          box={box}
          hideInput={hideInput}
          status={status}
          changeButton={changeButton}
          viewForm={viewForm}
        />
        <PageStyled chatBox>
          <FormBlockStyled show fullWidth>
            <FormGroupStyled>
              <PageCustomStyled
                chatBox
                ref={(element) => this.scroll = element}
              >
              </PageCustomStyled>
            </FormGroupStyled>
            <FormGroupStyled input>
              <Button hasBorder onClick={this.handleModal}>
                <i className="fa fa-plus-circle" />
                Add Item
              </Button>
            </FormGroupStyled>
          </FormBlockStyled>
        </PageStyled>
      </FormStyled>
    );
  }
}
