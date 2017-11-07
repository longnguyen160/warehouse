import React, { Component } from 'react';
import ReactDOM from "react-dom";
import {
  FormStyled,
  PageStyled,
  FormBlockStyled,
  FormGroupStyled,
  TitleFormStyled,
  PageCustomStyled
} from '../../../stylesheets/GeneralStyled';
import { Button } from '../../../stylesheets/Button';
import StockOutModal from './StockOutModal';
import { CHECK } from '../../../../lib/enums';

export default class StockOut extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      viewForm: false,
      error: '',
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
    const { clearErrors } = this.props;

    this.setState({
      isModalOpen: !isModalOpen,
      item: null,
      quantity: null,
    });
    clearErrors();
    setTimeout(() =>
      this.setState({
        viewForm: false
      })
    , 500);
  };

  handleTextInput = (type, e) => {
    let { error } = this.state;
    const { selectOption, itemData } = this.props;
    const update = {};

    if (e.target.value.trim().length === 0
      || (type === 'Quantity' && !CHECK.IS_POSITIVE_NUMBER.test(e.target.value.trim()))) {
      this.setState({ error: `${type} is invalid` });
    } else if (type === 'Item' && e.target.value.trim().length > 0 && !itemData) {
      this.setState({ error: 'Item is not found'});
    } else if (itemData && type === 'Quantity' && e.target.value > itemData.details.quantity) {
      this.setState({ error: `The quantity of this item is only ${itemData.details.quantity}`});
    } else if (error === `${type} is invalid` || (itemData && error === `The quantity of this item is only ${itemData.details.quantity}`)) {
      update['error'] = null;
    }
    update[type.toLowerCase()] = e.target.value.trim();
    this.setState(update);
    selectOption(e.target.value, type);
  };

  handleViewForm = () => {
    const { viewForm } = this.state;

    if (viewForm) {
      this.setState({
        item: null,
        quantity: null,
      });
    }
    this.setState({ viewForm: !viewForm });
  };

  handleSubmitItem = () => {
    const { submitItem, boxes } = this.props;
    const { item, quantity } = this.state;
    const itemData = {
      item,
      quantity,
    };

    submitItem(itemData, boxes, (err) => {
      if (!err) {
        this.handleModal();
      }
    });
  };

  render() {
    const {
      isModalOpen,
      error,
      item,
      quantity,
      viewForm,
    } = this.state;
    const {
      actions,
      boxes,
      itemData
    } = this.props;
    if (itemData && error === 'Item is not found') {
      this.setState({ error: null });
    }

    return (
      <FormStyled>
        <StockOutModal
          isOpen={isModalOpen}
          onClose={this.handleModal}
          handleTextInput={this.handleTextInput}
          handleViewForm={this.handleViewForm}
          handleSubmitItem={this.handleSubmitItem}
          error={error}
          item={item}
          quantity={quantity}
          viewForm={viewForm}
          boxes={boxes}
        />
        <PageStyled chatBox>
          <FormBlockStyled show fullWidth>
            <FormGroupStyled chatBox>
              <PageCustomStyled
                chatBox
                ref={(element) => this.scroll = element}
              >
                {
                  actions.map(element =>
                    <FormBlockStyled
                      key={element.date}
                      margin borderBottom
                    >
                      <FormGroupStyled big title>
                        <TitleFormStyled flex>{element.date}</TitleFormStyled>
                      </FormGroupStyled>
                      {
                        element.action.map((data, index) =>
                          <FormGroupStyled big key={data.name + element.date + index}>
                            <TitleFormStyled flex>{data.name}</TitleFormStyled>
                            {data.quantity}
                          </FormGroupStyled>
                        )
                      }
                    </FormBlockStyled>
                  )
                }
              </PageCustomStyled>
            </FormGroupStyled>
            <FormGroupStyled input>
              <Button hasBorder stockOut onClick={this.handleModal}>
                <i className="fa fa-plus-circle" />
                Stock Out Item
              </Button>
            </FormGroupStyled>
          </FormBlockStyled>
        </PageStyled>
      </FormStyled>
    );
  }
}
