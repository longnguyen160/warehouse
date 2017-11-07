import React, { Component } from 'react';
import Modal from '../../modal/Modal';
import {
  TitleAccountStyled,
  FormBlockStyled,
  FormGroupStyled,
  LineFormStyled,
  TitleFormStyled,
  Input,
  TextErrorStyled,
  Span
} from '../../../stylesheets/GeneralStyled';
import { Button } from '../../../stylesheets/Button';

const AddStaffModal = (props) => {
  const {
    isOpen,
    onClose,
    warehouseList,
    processModal,
    handleTextInput,
    data
  } = props;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <FormBlockStyled
        show
      >
        <LineFormStyled>
          <TitleFormStyled>Email</TitleFormStyled>
          <Input
            type="text"
            placeholder="Email..."
            data={data.email}
            onChange={(e) => handleTextInput(e, 'email')}
          />
        </LineFormStyled>
        <LineFormStyled>
          <TitleFormStyled>Password</TitleFormStyled>
          <Input
            type="text"
            placeholder="Password..."
            data={data.password}
            onChange={(e) => handleTextInput(e, 'password')}
          />
        </LineFormStyled>
        <LineFormStyled>
          <TitleFormStyled>First Name</TitleFormStyled>
          <Input
            type="text"
            placeholder="First Name..."
            value={data.firstName}
            onChange={(e) => handleTextInput(e, 'firstName')}
          />
        </LineFormStyled>

        <LineFormStyled>
          <TitleFormStyled>Last Name</TitleFormStyled>
          <Input
            type="text"
            placeholder="Last Name..."
            value={data.lastName}
            onChange={(e) => handleTextInput(e, 'lastName')}
          />
        </LineFormStyled>

        <LineFormStyled>
          <TitleFormStyled>Warehouse</TitleFormStyled>
          <select
            onChange={(e) => handleTextInput(e, 'warehouseId')}
            value={data.warehouseId}
          >
            <option
              key=''
              value=''
            >
                  Select A Warehouse...
            </option>
            {
              warehouseList.map(warehouse => (
                <option
                  key={warehouse._id}
                  value={warehouse._id}
                >
                  {warehouse.name}
                </option>
              ))
            }
          </select>
        </LineFormStyled>

        <LineFormStyled>
          <Button
            hasBorder
            modal
            onClick={processModal}
          >
            Add New
          </Button>
        </LineFormStyled>

      </FormBlockStyled>

    </Modal>
  );
}
export default AddStaffModal;