import React from 'react';
import { Link } from 'react-router-dom';
import {
  FormStyled,
  LineFormStyled,
} from "../../../stylesheets/GeneralStyled";
import { Button } from '../../../stylesheets/Button';

const HomePage = () => {
  return (
    <FormStyled homepage mobile>
      <LineFormStyled marginBottom alignCenter>
        <Link to="/checkItems">
          <Button hasBorder dashboard>
            <i className="fa fa-check"/>
            Check Items
          </Button>
        </Link>
      </LineFormStyled>
      <LineFormStyled marginBottom alignCenter>
        <Link to="/stockIn">
          <Button hasBorder dashboard>
            <i className="fa fa-download"/>
            Stock in
          </Button>
        </Link>
      </LineFormStyled>
      <LineFormStyled marginBottom alignCenter>
        <Link to="/stockOut">
          <Button hasBorder dashboard>
            <i className="fa fa-upload"/>
            Stock out
          </Button>
        </Link>
      </LineFormStyled>
      <LineFormStyled marginBottom alignCenter>
        <Link to="/printReport">
          <Button hasBorder dashboard>
            <i className="fa fa-print"/>
            Print report
          </Button>
        </Link>
      </LineFormStyled>
    </FormStyled>
  );
};

export default HomePage;