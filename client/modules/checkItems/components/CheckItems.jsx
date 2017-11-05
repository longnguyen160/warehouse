import React from 'react';
import {
  FormStyled,
  PageStyled,
  FormBlockStyled,
  FormGroupStyled,
  LineFormStyled,
  TitleFormStyled,
  Input,
  PageCustomStyled
} from '../../../stylesheets/GeneralStyled';

export default class CheckItems extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedOptions: '0',
      itemId: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    const { items } = nextProps;
    items.map(item => this.setState({ [item._id]: false }));
  }

  handleInput = (e) => {
    e.preventDefault();
    const { search } = this.props;
    const searchTerm = this.search.value.trim();
    const filter = {
      $or: [
        { _id: { $regex: searchTerm, $options: 'i' } },
        { name: { $regex: searchTerm, $options: 'i' } },
      ],
    };

    search(filter);
  };

  handleSelectedChange = (e) => {
    this.setState({ selectedOptions: e.target.value });
  };

  showContent = (itemId) => {
    const checked = this.state[itemId];

    this.setState({ [itemId]: !checked });
  };

  render() {
    const { selectedOptions } = this.state;
    const { items, series, categories, boxes, shelves, blocks, sections, warehouses } = this.props;

    return (
      <FormStyled>
        <PageStyled fullHeight>
          <FormBlockStyled show>
            <FormGroupStyled>
              <LineFormStyled searchBox>
                <Input
                  type='text'
                  placeholder={selectedOptions === '0' ? 'Item code or series volume...' : 'Category...'}
                  innerRef={(c) => { this.search = c; }}
                  onChange={this.handleInput}
                />
              </LineFormStyled>
              <LineFormStyled alignCenter>
                <select onChange={this.handleSelectedChange}>
                  <option value={0}>Item</option>
                  <option value={1}>Category</option>
                </select>
              </LineFormStyled>
            </FormGroupStyled>
            <PageCustomStyled chatBox>
              {
                items.map((item, index) =>
                  <FormBlockStyled
                    fullHeight={index === items.length - 1}
                    key={item._id}
                    margin borderBottom
                  >
                    <FormGroupStyled big onClick={() => this.showContent(item._id)}>
                      <TitleFormStyled flex>{item.name}</TitleFormStyled>
                      <i className={this.state[item._id] ? "fa fa-chevron-up" : "fa fa-chevron-down"}/>
                    </FormGroupStyled>
                    <FormBlockStyled margin isShowed={this.state[item._id]}>
                      <FormGroupStyled big>
                        <TitleFormStyled>Series: </TitleFormStyled>
                        <span>{series[index].name}</span>
                      </FormGroupStyled>
                      <FormGroupStyled big>
                        <TitleFormStyled>Category: </TitleFormStyled>
                        {
                          categories[index].map((category, i) =>
                            <span key={category._id}>
                              {category.name}{i === categories[index].length - 1 ? '' : ','}
                            </span>
                          )
                        }
                      </FormGroupStyled>
                      <FormGroupStyled big>
                        <TitleFormStyled>Author: </TitleFormStyled>
                        <span>{series[index].author}</span>
                      </FormGroupStyled>
                      <FormGroupStyled big>
                        <TitleFormStyled>Quantity: </TitleFormStyled>
                        <span>{item.details.quantity}</span>
                      </FormGroupStyled>
                      <FormGroupStyled big>
                        <TitleFormStyled>Position: </TitleFormStyled>
                        {
                          warehouses[index].map((warehouse, i) =>
                            <span key={warehouse._id}>
                              Warehouse {warehouse.name}, Section {sections[index][i].name},
                              Block {blocks[index][i].name}, Shelf {shelves[index][i].name},
                              Row {boxes[index][i].rowId}, Column {boxes[index][i].columnId}
                            </span>
                          )
                        }
                      </FormGroupStyled>
                    </FormBlockStyled>
                  </FormBlockStyled>
                )
              }
            </PageCustomStyled>
          </FormBlockStyled>
        </PageStyled>
      </FormStyled>
    );
  }
}