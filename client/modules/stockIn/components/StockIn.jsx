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

export default class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      selectedOption: '0',
      nextContent: false
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

  handleKeyPress = (e) => {
    if (e.charCode === 13) {
      this.sendMessage();
    }
  };

  handleScroll = () => {
  };

  handleModal = () => {
    const { isModalOpen } = this.state;
    this.setState({ isModalOpen: !isModalOpen });
  };

  handleSelectedChange = (e) => {
    this.setState({ selectedOption: e.target.value });
  };

  handleNextContent = () => {
    const { nextContent } = this.state;
    this.setState({ nextContent: !nextContent});
  }

  render() {
    const { isModalOpen, selectedOption, nextContent } = this.state;

    return (
      <FormStyled>
        <StockInModal
          isOpen={isModalOpen}
          onClose={this.handleModal}
          handleSelectedChange={this.handleSelectedChange}
          selectedOption={selectedOption}
          handleNextContent={this.handleNextContent}
          nextContent={nextContent}
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
