import React from 'react';
import {
  FormStyled,
  PageStyled,
  FormBlockStyled,
  FormGroupStyled,
  LineFormStyled,
  TitleFormStyled,
  Input
} from '../../../stylesheets/GeneralStyled';

export default class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedOptions: '0',
    };
  }

  handleInput = () => {
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

  render() {
    const { selectedOptions } = this.state;
    const { items, series, categories, positions, shelves, blocks, sections, warehouses } = this.props;

    return (
      <FormStyled>
        <PageStyled fullHeight>
          <FormBlockStyled show>
            <FormGroupStyled>
              <LineFormStyled searchBox>
                <Input
                  type='text'
                  placeholder={selectedOptions === '0' ? 'Item code or series volume...' : 'Series...'}
                  ref={(c) => { this.search = c; }}
                  onChange={(e) => this.handleInput}
                />
              </LineFormStyled>
              <LineFormStyled alignCenter>
                <select onChange={this.handleSelectedChange}>
                  <option value={0}>Item</option>
                  <option value={1}>Series</option>
                </select>
              </LineFormStyled>
            </FormGroupStyled>
            {
              items.map((item, index) =>
                <FormBlockStyled key={item._id}>
                  <TitleFormStyled>{item.name}</TitleFormStyled>
                  <FormBlockStyled>
                    <FormGroupStyled>
                      <TitleFormStyled>Series: </TitleFormStyled>
                      <span>{series[index]}</span>
                    </FormGroupStyled>
                    <FormGroupStyled>
                      <TitleFormStyled>Category: </TitleFormStyled>
                      {
                        categories[index].map((category, i) =>
                          <span key={category._id}>
                            {category.name}{i === categories[index].length - 1 ? '' : ','}
                          </span>
                        )
                      }
                    </FormGroupStyled>
                    <FormGroupStyled>
                      <TitleFormStyled>Author: </TitleFormStyled>
                      <span>{series[index].author}</span>
                    </FormGroupStyled>
                    <FormGroupStyled>
                      <TitleFormStyled>Quantity: </TitleFormStyled>
                      <span>{item.quantity}</span>
                    </FormGroupStyled>
                    <FormGroupStyled>
                      <TitleFormStyled>Position: </TitleFormStyled>
                      {
                        warehouses[index].map((warehouse, i) =>
                          <spann key={warehouse._id}>
                            Warehouse {warehouse.name}, Section {sections[index][i]},
                            Block {blocks[index][i]}, Shelf {shelves[index][i]},
                            Position {positions[index].map(position =>
                              <span key={position._id}>
                                Row {position.row}, Column {position.column}
                              </span>
                            )}
                          </spann>
                        )
                      }
                    </FormGroupStyled>
                  </FormBlockStyled>
                </FormBlockStyled>
              )
            }
          </FormBlockStyled>
        </PageStyled>
      </FormStyled>
    );
  }
}