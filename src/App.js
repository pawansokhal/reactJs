import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Header from './common/header';
import Footer from './common/footer';
import Loader from './common/loader';
import $ from "jquery";
class App extends Component {
  render() {
    // const currentLocation = this.props.location.pathname;
    $(document).on('focus', ':input', function () {
      $(this).attr('autocomplete', 'off');
    });
    return (
      <React.Fragment>
        {this.props.isajaxprocessing > 0 ? <Loader/> : null}
        <Header {...this.props} />
        {this.props.children}
        <Footer />
      </React.Fragment>
    );
  }
}
function mapStateToProps(state) {
  return {
    isajaxprocessing: state.ajaxrequest.isajaxprocessing
  };
}
export default connect(mapStateToProps)(App);
