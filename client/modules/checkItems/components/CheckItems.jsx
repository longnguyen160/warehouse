import React from 'react';
import {
  FormStyled,
  PageStyled,
  TitleAccountStyled,
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

  handleInput = (e) => {
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
          </FormBlockStyled>
        </PageStyled>
      </FormStyled>
    );
  }
}