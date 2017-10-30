import React, {Component} from 'react';
import {Link} from 'react-router-dom';
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
import { CHECK, ROLES } from '../../../../lib/enums';

export default class SignUp extends Component {

  constructor(props) {
    super(props);
    const { error } = this.props;
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      error: error,
      isLoading: false,
      accountType: ROLES.CUSTOMER
    };
  }

  componentWillReceiveProps(nextProps) {
    const { error } = nextProps;
    this.setState({ error });
  }

  redirect = () => {
    const { isLoggedIn, history } = this.props;

    if (isLoggedIn)
      history.push('/');
  }

  componentWillMount() {
    this.redirect();
  }

  componentDidUpdate(prevProps) {
    this.redirect();
    if (prevProps.error !== this.props.error)
      this.setState({ error: this.props.error });
  }

  handleKeyPress = (e) => {
    if (e.charCode === 13 && !this.state.isLoading) {
      this.createUser();
    }
  }

  handleInput = (type, e) => {
    const update = {};

    update[type] = e.target.value;
    this.setState(update);
  }

  handleRadio = (accountType) => {
    this.setState({ accountType });
  }

  checkEmail = (email) => {
    return CHECK.IS_EMAIL.test(email);
  }

  createUser = () => {
    const { name, email, password, confirmPassword, accountType } = this.state;
    const { createUser, history } = this.props;

    // check name
    if (name.trim() === '')
      return this.setState({error: 'Name is required.'});

    // check email
    if (!this.checkEmail(email))
      return this.setState({error: 'Email invalid.'});

    this.setState({ error: null });
    // check password
    if (password.trim() === '')
      return this.setState({error: 'Password is required.'});

    this.setState({ error: null });

    if (password !== confirmPassword)
      return this.setState({ error: 'Password does not match the confirm password.' });

    this.setState({ error: null, isLoading: true });

    createUser({ name, email, password, accountType }, history, () => {
      this.setState({ isLoading: false });
    });
  }

  render() {
    const { accountType, error } = this.state;

    return (
      <FormStyled>
        <PageStyled>
          <TitleAccountStyled>Barber</TitleAccountStyled>
          <FormBlockStyled show>
            <FormGroupStyled>
              <LineFormStyled hasTitle>
                <TitleFormStyled>Name</TitleFormStyled>
                <Input
                  onChange={(e) => this.handleInput('name', e)}
                  onKeyPress={this.handleKeyPress}
                  type='text'
                />
              </LineFormStyled>
            </FormGroupStyled>
            <FormGroupStyled>
              <LineFormStyled hasTitle>
                <TitleFormStyled>Email</TitleFormStyled>
                <Input
                  onChange={(e) => this.handleInput('email', e)}
                  onKeyPress={this.handleKeyPress}
                  type='email'
                />
              </LineFormStyled>
            </FormGroupStyled>
            <FormGroupStyled>
              <LineFormStyled hasTitle>
                <TitleFormStyled>Password</TitleFormStyled>
                <Input
                  onChange={(e) => this.handleInput('password', e)}
                  onKeyPress={this.handleKeyPress}
                  type='password'
                />
              </LineFormStyled>
            </FormGroupStyled>
            <FormGroupStyled>
              <LineFormStyled hasTitle>
                <TitleFormStyled>Confirm Password</TitleFormStyled>
                <Input
                  onChange={(e) => this.handleInput('confirmPassword', e)}
                  onKeyPress={this.handleKeyPress}
                  type='password'
                />
              </LineFormStyled>
            </FormGroupStyled>
            <FormGroupStyled>
              <LineFormStyled hasTitle>
                <Input
                  onChange={(e) => this.handleRadio('customer')}
                  onKeyPress={this.handleKeyPress}
                  type='radio'
                  value={ROLES.CUSTOMER}
                  checked={accountType === ROLES.CUSTOMER}
                />
                <Label>Customer</Label>
              </LineFormStyled>
              <LineFormStyled hasTitle>
                <Input
                  onChange={(e) => this.handleRadio('barber')}
                  onKeyPress={this.handleKeyPress}
                  type='radio'
                  value={ROLES.BARBER}
                  checked={accountType === ROLES.BARBER}
                />
                <Label>Barber</Label>
              </LineFormStyled>
            </FormGroupStyled>
            {
              error ?
                <TextErrorStyled error={true}>
                  {error}
                </TextErrorStyled>
                : null
            }
            {
              this.state.isLoading ?
                <Button hasBorder disabled>
                  <i className="fa fa-circle-o-notch fa-spin"></i>Loading
                </Button> :
                <Button hasBorder onClick={this.createUser.bind(this)}>Sign Up</Button>
            }
            <Label><Link to="/signin">You already have account?</Link></Label>
          </FormBlockStyled>
        </PageStyled>
      </FormStyled>
    );
  }
}
