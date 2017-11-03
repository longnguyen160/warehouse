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
      error: ''
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

  handleTextInput = (type, e) => {
    let { error } = this.state;
    const update = {};

    switch (type) {
      case 'quantity':
        if (!(e.target.value.trim().length > 0 && CHECK.IS_POSITIVE_NUMBER.test(e.target.value.trim()))) {
          this.setState({ error: 'Quantity is invalid' });
        } else if (error === 'Quantity is invalid') {
          update['error'] = null;
        }
        update[type] = e.target.value.trim();
        this.setState(update);
        break;
      case 'series':
        if (e.target.value.trim() === '') {
          this.setState({ error: 'Series is invalid'});
        } else if (error === 'Series is invalid') {
          update['error'] = null;
        }
        update[type] = e.target.value.trim();
        this.setState(update);
        break;
      case 'item':
        if (e.target.value.trim() === '') {
          this.setState({ error: 'Item is invalid'});
        } else if (error === 'Item is invalid') {
          update['error'] = null;
        }
        update[type] = e.target.value.trim();
        this.setState(update);
        break;
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
    const { choosePositionContent, item, quantity } = this.state;
    const { selectOption } = this.props;

    selectOption({ item, quantity }, 'item');
    this.setState({
      choosePositionContent: !choosePositionContent,
      error: null
    });
  };

  handleAddItemFunction = () => {

  };

  render() {
    const { isModalOpen, addItemContent, choosePositionContent, error, item, quantity } = this.state;
    const { series, selectedOption, shelves, selectedShelf, rowId, columnId, box } = this.props;

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
          series={series}
          error={error}
          item={item}
          quantity={quantity}
          shelves={shelves}
          selectedShelf={selectedShelf}
          rowId={rowId}
          columnId={columnId}
          box={box}
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
