import React from 'react';
import {
  FormStyled,
  PageStyled,
  TitleAccountStyled,
  FormBlockStyled,
  FormGroupStyled,
  LineFormStyled,
  TextErrorStyled,
  TitleFormStyled,
  Input,
  Label
} from '../../../stylesheets/GeneralStyled';
import { Button } from '../../../stylesheets/Button';

export default class SignIn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoading: false
    };
  }

  redirect = () => {
    const { isLoggedIn, history } = this.props;

    if (isLoggedIn)
      history.push('/');
  }

  componentWillMount() {
    this.redirect();
  }

  componentDidUpdate() {
    this.redirect();
  }

  handleKeyPress = (e) => {
    if (e.charCode === 13)
      this.login();
  }

  login = () => {
    const email = this.email.value;
    const password = this.password.value;
    const { login, history } = this.props;

    this.setState({ isLoading: true });
    login(email, password, history, () => {
      this.setState({ isLoading: false });
    });
  }

  render() {
    const { error } = this.props;
    const { isLoading } = this.state;

    return (
      <FormStyled>
        <PageStyled>
          <TitleAccountStyled>Star Platinum</TitleAccountStyled>
          <FormBlockStyled show>
            <FormGroupStyled>
              <LineFormStyled hasTitle>
                <TitleFormStyled>Email</TitleFormStyled>
                <Input
                  onKeyPress={this.handleKeyPress}
                  type='email'
                  placeholder="Email"
                  innerRef={(element) => this.email = element}
                />
              </LineFormStyled>
            </FormGroupStyled>
            <FormGroupStyled>
              <LineFormStyled hasTitle>
                <TitleFormStyled>Password</TitleFormStyled>
                <Input
                  onKeyPress={this.handleKeyPress}
                  type='password'
                  placeholder="Password"
                  innerRef={(element) => this.password = element}
                />
              </LineFormStyled>
            </FormGroupStyled>
            <TextErrorStyled error={true}>
              {
                error ? error : null
              }
            </TextErrorStyled>

            {
              isLoading ?
                <Button hasBorder disabled>
                  <i className="fa fa-circle-o-notch fa-spin"></i>Loading
                </Button> :
                <Button hasBorder onClick={this.login}>Sign In</Button>
            }
          </FormBlockStyled>
        </PageStyled>
      </FormStyled>
    );
  }
}