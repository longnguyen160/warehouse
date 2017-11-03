import React from 'react';


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
      <FormStyled>
        <LineFormStyled>
          <Link>
            <Button>
            </Button>
          </Link>
        </LineFormStyled>
        <LineFormStyled>
          <Link>
            <Button>
            </Button>
          </Link>
        </LineFormStyled>
      </FormStyled>
    )
  }
}