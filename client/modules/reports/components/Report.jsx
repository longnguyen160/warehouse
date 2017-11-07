import React, { Component } from 'react';

export default class Staff extends React.Component{
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render(){
    return (
      <div>
        <input type="text" placeholder="Name of Warehouse or Staff..."/>
      </div>
    );
  }
}