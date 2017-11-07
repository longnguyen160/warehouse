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
import StockInModal from './StockInModal';
import { CHECK } from '../../../../lib/enums';

export default class StockIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      addItemContent: false,
      choosePositionContent: false,
      viewForm: false,
      error: '',
      status: [],
      selectedShelves: [],
      selectedCategories: []
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
      status: [],
      selectedShelves: [],
      selectedCategories: [],
      item: null,
      quantity: null,
      size: null,
      isbn: null,
      edition: null,
      price: null,
      error: null,
      series: null,
      author: null,
      year: null,
      publisher: null,
      changeButton: false
    });
    clearErrors();
    setTimeout(() =>
      this.setState({
        addItemContent: false,
        choosePositionContent: false,
        viewForm: false
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
    if (type === 'Quantity') {
      this.setState({ remainItem: e.target.value.trim() });
    }
  };

  handleTextInput = (type, e) => {
    const { selectOption } = this.props;

    if (type === 'Quantity' || type === 'Price' || type === 'Year') {
      this.checkPositiveNumber(type, e);
    } else this.checkEmpty(type, e);
    if (type === 'Item') {
      selectOption(e.target.value, 'name');
    }
  };

  handleSelectedChange = (type, e) => {
    const { selectOption, allShelves, categories } = this.props;
    const { selectedShelves, selectedCategories } = this.state;

    this.setState({ error: null });
    selectOption(e.target.value, type);
    if (type === 'shelves') {
      const shelf = allShelves.find(shelf => shelf._id === e.target.value);
      selectedShelves.push(shelf);
      this.setState({ selectedShelves });
    }
    if (type === 'category') {
      const category = categories.find(category => category._id === e.target.value);
      selectedCategories.push(category);
      this.setState({ selectedCategories });
    }
  };

  handleAddItemContent = () => {
    const { addItemContent, selectedCategories, selectedShelves, series, author, year, publisher } = this.state;
    const { selectOption, selectedOption } = this.props;

    if (addItemContent) {
      this.setState({
        selectedShelves: [],
        selectedCategories: [],
        series: null,
        author: null,
        year: null,
        publisher: null
      });
    }
    if (selectedOption === 'other') {
      selectOption({ series, author, year, publisher, selectedShelves, selectedCategories }, 'seriesData');
    }
    this.setState({
      addItemContent: !addItemContent,
      error: null
    });
  };

  handleChoosePositionContent = () => {
    const { choosePositionContent, item, quantity, size, isbn, edition, price } = this.state;
    const { selectOption } = this.props;

    if (choosePositionContent) {
      this.setState({
        status: [],
        item: null,
        quantity: null,
        size: null,
        isbn: null,
        edition: null,
        price: null
      });
      selectOption(null, 'row');
      selectOption(null, 'column');
      selectOption(null, 'shelf');
      selectOption(null, 'name');
    }
    selectOption({ item, quantity, size, isbn, edition, price }, 'item');
    this.setState({
      choosePositionContent: !choosePositionContent,
      error: null
    });
  };

  handleAddItemFunction = () => {
    const { box, selectedShelf, shelves } = this.props;
    const { status, remainItem } = this.state;

    const number = (remainItem <= box.maxItem - box.currentQuantity) ? remainItem : box.maxItem - box.currentQuantity;
    const shelf = shelves.find(shelf => shelf._id === selectedShelf);

    status.push({
      boxId: box._id,
      boxName: shelf.name + '-' + box.name,
      number
    });
    this.setState({
      status,
      remainItem: remainItem - number,
      changeButton: remainItem - number === 0
    });
  };

  handleViewForm = () => {
    const { viewForm, quantity, changeButton } = this.state;
    const { selectOption } = this.props;

    if (viewForm) {
      this.setState({
        status: [],
        remainItem: quantity,
        changeButton: !changeButton
      });
      selectOption(null, 'row');
      selectOption(null, 'column');
      selectOption(null, 'shelf');
    }
    this.setState({ viewForm: !viewForm });
  };

  removeShelf = (shelfId, e) => {
    e.preventDefault();
    let { selectedShelves } = this.state;

    selectedShelves = selectedShelves.filter(selectedShelf => selectedShelf._id !== shelfId);
    this.setState({ selectedShelves });
  };

  removeCategory = (categoryId, e) => {
    e.preventDefault();
    let { selectedCategories } = this.state;

    selectedCategories = selectedCategories.filter(selectedCategory => selectedCategory._id !== categoryId);
    this.setState({ selectedCategories });
  };

  handleSubmitItem = (seriesId) => {
    const { submitItem, hideInput, selectedOption } = this.props;
    const {
      item,
      quantity,
      size,
      isbn,
      edition,
      price,
      status,
    } = this.state;
    let itemData = {};

    if (hideInput) {
      itemData = {item, quantity};
    } else {
      itemData = {
        item,
        quantity,
        size,
        isbn,
        edition,
        price,
        seriesId: seriesId ? seriesId : selectedOption
      };
    }

    submitItem(itemData, status, (err) => {
      if (!err) {
        this.handleModal();
      }
    });
  };

  submit = () => {
    const { selectedOption, addSeries } = this.props;
    const {
      selectedCategories,
      selectedShelves,
      seriesname,
      author,
      year,
      publisher
    } = this.state;
    let seriesData = {};

    if (selectedOption === 'other') {
      seriesData = {
        seriesname,
        author,
        year,
        publisher
      };

      addSeries(seriesData, selectedCategories, selectedShelves, (res) => {
        this.handleSubmitItem(res);
      })
    } else {
      this.handleSubmitItem();
    }
  };

  render() {
    const {
      isModalOpen,
      addItemContent,
      choosePositionContent,
      error,
      seriesname,
      author,
      year,
      publisher,
      item,
      quantity,
      size,
      isbn,
      edition,
      price,
      status,
      changeButton,
      viewForm,
      remainItem,
      selectedShelves,
      selectedCategories
    } = this.state;
    const {
      series,
      selectedOption,
      shelves,
      selectedShelf,
      rowId,
      columnId,
      box,
      hideInput,
      actions,
      allShelves,
      categories,
      selectedShelfForSeries,
      selectedCategory
    } = this.props;

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
          removeShelf={this.removeShelf}
          removeCategory={this.removeCategory}
          series={series}
          error={error}
          seriesname={seriesname}
          author={author}
          year={year}
          publisher={publisher}
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
          remainItem={remainItem}
          allShelves={allShelves}
          categories={categories}
          selectedShelfForSeries={selectedShelfForSeries}
          selectedShelves={selectedShelves}
          selectedCategory={selectedCategory}
          selectedCategories={selectedCategories}
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
