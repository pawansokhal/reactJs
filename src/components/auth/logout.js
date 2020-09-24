import React, { Component } from 'react';
// import * as actions from '../../actions/auth';

class Logout extends Component {
  componentWillMount() {
    localStorage.removeItem('name');
  }

  render() {
    return <div className="container">Sorry to see you go!</div>;
  }
}

export default (Logout);
