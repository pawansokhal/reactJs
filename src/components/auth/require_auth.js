import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { logoutUser } from '../../actions/auth';
import { browserHistory } from 'react-router';


export default function (ComposedComponent) {
 
  class Authentication extends Component {
    constructor(props){
      super(props)
      this.state = { isauthenticated:false}
      this.pathname = this.props.location.pathname;
    }
    componentWillMount() {
      const custId   = localStorage.getItem('cust_id');
      const sessionKey   = localStorage.getItem('session_key');
      if (!custId && !sessionKey) {
        browserHistory.push({
            pathname: '/login',
            search: '',
            state: { previouspath: this.pathname }
        });
      }else{
        this.setState({isauthenticated: true})
      }
    }

    componentWillUpdate(nextProps) {
      const custId   = localStorage.getItem('cust_id');
      const sessionKey   = localStorage.getItem('session_key');
      if (!custId && !sessionKey) {
        browserHistory.push({
            pathname: '/login',
            search: '',
            state: { previouspath: this.pathname }
        });
      }
    }
    render() {
      return (this.state.isauthenticated) ? <ComposedComponent {...this.props}  /> : false 
    }
  }

  function mapStateToProps(state) {
     return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
}
