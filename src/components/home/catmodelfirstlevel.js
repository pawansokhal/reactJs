
import React from 'react';
import { connect } from 'react-redux';
import CatModel from './catmodel';
import $ from "jquery";


class CatModelTop extends React.Component {
  componentWillMount() {
    $("html, body").animate({ scrollTop: 0 }, 600);
  }
  render() {
    return (
      <CatModel categoriesList={this.props.categoriesList} toplevel={false}/>
    );
  }
}
function mapStateToProps(state) {
  return {
      categoriesList: state.common.categories,
  };
}

export default connect(mapStateToProps)(CatModelTop);
