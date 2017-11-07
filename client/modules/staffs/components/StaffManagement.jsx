import React, { Component } from 'react';
import AddStaffModal from './AddStaffModal';

export default class Staff extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: [],
      isOpen: false,
      inputString: '',
      data: {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        warehouseId: '',
      }
    };

    this.handleModal = this.handleModal.bind(this);
    this.processModal = this.processModal.bind(this);
    this.handleTextInput = this.handleTextInput.bind(this);
  }

  componentDidMount() {
    this.setState({ userList: this.props.displayUserList });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.displayUserList !== this.props.displayUserList)
      this.setState({ userList: this.props.displayUserList });
  }

  handleModal() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  processModal() {
    const { addUser } = this.props;

    addUser(this.state.data);
    this.handleModal();
    const data = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      warehouseId: '',
    };
    this.setState({ data });
  }

  deleteUser = (userId, e) => {
    const { removeUser } = this.props;

    removeUser(userId);
  }

  handleTextInput(event, field) {
    let data = this.state.data;
    switch (field) {
      case 'email':
        data.email = event.target.value;
        break;
      case 'password':
        data.password = event.target.value;
        break;
      case 'firstName':
        data.firstName = event.target.value;
        break;
      case 'lastName':
        data.lastName = event.target.value;
        break;
      case 'warehouseId':
        data.warehouseId = event.target.value;
        break;
    }
    this.setState({ data });
  }

  handleInput(event) {
    const { displayUserList } = this.props;
    const input = event.target.value;
    const pattern = new RegExp(input, 'i');
    const userList = [];

    displayUserList.forEach((user) => {
      if (pattern.test(user.name) || pattern.test(user.warehouseName))
        userList.push(user)
    });

    this.setState({ userList });
    this.setState({ inputString: input });
  }

  render() {
    const { userList, isOpen, data } = this.state;
    const { warehouseList } = this.props;
    return (
      <div>
        <AddStaffModal
          isOpen={isOpen}
          onClose={this.handleModal}
          handleTextInput={this.handleTextInput}
          warehouseList={warehouseList}
          processModal={this.processModal}
          handleTextInput={this.handleTextInput}
          data={data}
        />
        <input type="text" value={this.state.inputString} placeholder="Name of Warehouse or Staff..." onChange={this.handleInput.bind(this)} />
        <button onClick={this.handleModal}>+</button>
        {userList.map((user, index) => (
          <div key={index}>
            <div>
              <div>
                {user.name}
              </div>
              <div>
                {user.warehouseName}
              </div>
            </div>
            <div>
              <button onClick={(e) => this.deleteUser(user.userId, e)}>x</button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}