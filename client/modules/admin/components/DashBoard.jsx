import React from 'react';
import { Link } from 'react-router-dom';

import {
  FormStyled,
  LineFormStyled,
  PageStyled,
} from "../../../stylesheets/GeneralStyled";
import { Button } from '../../../stylesheets/Button';

export default class DashBoard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <FormStyled homepage mobile>
        <LineFormStyled marginBottom alignCenter>
          <Link to="/admin/staffs">
            <Button admin hasBorder dashboard>
              Staffs Management
          </Button>
          </Link>
        </LineFormStyled>
        <LineFormStyled marginBottom alignCenter>
          <Link to="/admin/reports">
            <Button admin hasBorder dashboard>
              Reports
        </Button>
          </Link>
        </LineFormStyled>
      </FormStyled>
    )
  }
}