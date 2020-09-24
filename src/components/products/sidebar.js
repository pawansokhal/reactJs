import React from 'react';
import PropTypes from 'prop-types';
import { ucfirst } from '../../common/common';
import RangeSlider from './rangeslider';
import $ from "jquery";
/*eslint-disable no-script-url*/
class SideBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sidebarindex: '',
      sidebarmorebutton: "Y",
      previousCatId: this.props.states.cat_id
    }
    this.showMore = this.showMore.bind(this)
  }
  showMore(event) {
    const buttonid = event.target.dataset.id;
    const buttontext = event.target.dataset.buttontext;
    $("#" + buttonid).slideToggle("fast");
    this.setState({
      sidebarmorebutton: buttontext
    });
    Object.assign(this.state, {
      sidebarmorebutton: buttontext
    })
  }




  render() {

    let filters = [];
    if (this.props.filters.hasOwnProperty('data')) {
      filters = this.props.filters.data;
    }
    let priceFilter = filters.find(price => price.filter_type === 'price');
    let restFilter = filters.filter(function (el) {
      return el.filter_type !== "price";
    });
    const propState = this.props.states;
    
    const handleInputChange = this.props.handleInputChange
    const handleSearchChange = this.props.handleSearchChange
    return (
      <React.Fragment>
        <aside className="aside-left sticky col-sm-12 stext-104">
          <div className="panel-search w-full p-t-10 p-b-15">
            <div className="bg0 bor8 dis-flex">
              <div className="field-input-full">
                <input className="form-control search-input " type="text" name="search_keyword" placeholder="Search" defaultValue={propState.search_keyword} onChange={handleSearchChange} />
                <div className="focus-input1 trans-06"></div>
              </div>
            </div>
          </div>
          {propState.price_range !== '-' ?
            <div className="product_brands_secletor" key={priceFilter.id}>
              <h6 className="heading">{priceFilter.display_name}</h6>
              <div className="product_brands_list pb-4">
                {priceFilter.price.min_price ? 
                <RangeSlider handleInputChange={handleInputChange} selectedPrices={propState.price_range} filter={filters} newloadCat={propState.newloadCat} />
                : null}
              </div>
            </div>
            : null}
          {restFilter.map(function name(filter, index) {
            return (
              <React.Fragment key={index}>
                {filter.options.length > 0 ?
                  <div className="product_brands_secletor" key={filter.id}>
                    <h6 className="heading">{ucfirst(filter.display_name)}</h6>
                    <div className="product_brands_list pb-4">
                      {filter.options.map(function name(item, indx) {
                        if (indx < 8) {
                          return (
                            <Filter key={indx} item={item} filter_type={filter.filter_type.replace(/ /g, '')} indx={filter.display_name + item.id} handleInputChange={handleInputChange} propState={propState} />
                          )
                        } else { return null }
                      })}
                      <HiddenFilter filterOptions={filter.options} index={index} filter_type={filter.filter_type.replace(/ /g, '')} handleInputChange={handleInputChange} propState={propState} />
                      {filter.options.length > 8 ? <a data-buttontext={this.state.sidebarmorebutton === "Y" ? "N" : "Y"} href="javascript:void(0)" onClick={this.showMore} data-id={filter.filter_type.replace(/ /g, '')} className="collapsed-icon-toggle collapsed showmore">{this.state.sidebarmorebutton === "Y" ? "More" : "Less"}</a> : null}
                    </div>
                  </div>
                  : null}
              </React.Fragment>
            )
          }.bind(this))}
        </aside>
      </React.Fragment>
    )
  }
}


SideBar.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  cdHandleSubmit: PropTypes.func.isRequired,
  states: PropTypes.any.isRequired,
  cat_id: PropTypes.number.isRequired,
}



export default (SideBar);

const Filter = (props) => {
  const propState = props.propState;
  const filterName = props.filter_type;
  let allSelected = propState.finalfilterSelected[filterName]
  let isSelected = allSelected ? allSelected.includes(parseInt(props.item.id, 10)) : false
  return (
    <div className="checkbox">
      <input id={props.indx} type="checkbox" name={filterName} checked={isSelected} value={props.item.id} autoComplete="off" onChange={props.handleInputChange} />
      <label htmlFor={props.indx}>{props.item.name}</label>
    </div>
  )
}

const HiddenFilter = (props) => {
  return (
    <div id={props.filter_type} className="collapse">
      {props.filterOptions.map((item, indx) => {

        if (indx >= 8) {

          return (
            <Filter key={indx} item={item} filter={props.filter} filter_type={props.filter_type} indx={props.filter_type + indx} handleInputChange={props.handleInputChange} propState={props.propState} />
          )
        } else { return ''; }
      })
      }
    </div>
  )
} 
