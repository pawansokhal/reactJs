/* eslint-disable react/prop-types */
import React from 'react';
import Slider from 'rc-slider';
import InputRange from 'react-input-range';
import PropTypes from 'prop-types';
import { currencySymbol } from '../../common/common';

// import 'rc-slider/assets/index.css';
// import 'rc-tooltip/assets/bootstrap.css';

import 'react-input-range/lib/css/index.css';
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const wrapperStyle = {width:250, margin:0 };


class RangeSlider extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          flag:true,
          startFlag: false,
          slctdRange:[0,1000],
          minRange: (this.props.filter.min_price) ? parseFloat(this.props.filter.min_price, 10) : 0,
          maxRange:  (this.props.filter.max_price) ? parseFloat(this.props.filter.max_price, 10) : 0,
          selectedMin: (this.props.filter.min_price) ? parseFloat(this.props.filter.min_price, 10) : 0,
          selectedMax:(this.props.filter.max_price) ? parseFloat(this.props.filter.max_price, 10) : 0,
          mainValue:{min: (this.props.filter.min_price) ? parseFloat(this.props.filter.min_price, 10) : 0, max:(this.props.filter.max_price) ? parseFloat(this.props.filter.max_price, 10) : 0},
        }
     
        this.handleRangeChange = this.handleRangeChange.bind(this);
    }

    handleRangeChange(event){
      this.setState({
        // selectedMin: (event[0]) ? parseFloat(event[0], 10) : 0,
        // selectedMax: (event[1]) ? parseFloat(event[1], 10) : 0,
        mainValue:{min:(event.min) ? parseFloat(event.min, 10) : 0, max: (event.max) ? parseFloat(event.max, 10) : 0},
      });
    }

    componentWillReceiveProps(nextProps) {
      if(this.props.newloadCat) {
        this.setState({
          minRange: (nextProps.filter[0].price.min_price) ? parseFloat(nextProps.filter[0].price.min_price, 10) : parseFloat(nextProps.filter[0].price.min_price, 10),
          maxRange: (nextProps.filter[0].price.max_price) ? parseFloat(nextProps.filter[0].price.max_price, 10) : parseFloat(nextProps.filter[0].price.max_price, 10),
          selectedMin: (nextProps.filter[0].price.min_price) ? parseFloat(nextProps.filter[0].price.min_price, 10) : parseFloat(nextProps.filter[0].price.min_price, 10),
          selectedMax: (nextProps.filter[0].price.max_price) ? parseFloat(nextProps.filter[0].price.max_price, 10) : parseFloat(nextProps.filter[0].price.max_price, 10),
          mainValue:{min: (nextProps.filter[0].price.min_price) ? parseFloat(nextProps.filter[0].price.min_price, 10) : parseFloat(nextProps.filter[0].price.min_price, 10), max:(nextProps.filter[0].price.max_price) ? parseFloat(nextProps.filter[0].price.max_price, 10) : parseFloat(nextProps.filter[0].price.max_price, 10)},
          startFlag: true,
        });   
      }
     if(this.state.flag && !this.state.startFlag) {
      this.setState({
        minRange: (nextProps.filter[0].price.min_price) ? parseFloat(nextProps.filter[0].price.min_price, 10) : parseFloat(nextProps.filter[0].price.min_price, 10),
        maxRange: (nextProps.filter[0].price.max_price) ? parseFloat(nextProps.filter[0].price.max_price, 10) : parseFloat(nextProps.filter[0].price.max_price, 10),
        selectedMin: (nextProps.filter[0].price.min_price) ? parseFloat(nextProps.filter[0].price.min_price, 10) : parseFloat(nextProps.filter[0].price.min_price, 10),
        selectedMax: (nextProps.filter[0].price.max_price) ? parseFloat(nextProps.filter[0].price.max_price, 10) : parseFloat(nextProps.filter[0].price.max_price, 10),
        mainValue:{min: (nextProps.filter[0].price.min_price) ? parseFloat(nextProps.filter[0].price.min_price, 10) : parseFloat(nextProps.filter[0].price.min_price, 10), max:(nextProps.filter[0].price.max_price) ? parseFloat(nextProps.filter[0].price.max_price, 10) : parseFloat(nextProps.filter[0].price.max_price, 10)},
        startFlag: true,
      });
     }
        if(this.props.selectedPrices !== undefined && this.props.selectedPrices.length && this.state.flag){
          const selectedRange = this.props.selectedPrices.split('-');
          Object.assign(this.state, {
            selectedMin:parseFloat(selectedRange[0], 10),
            selectedMax:parseFloat(selectedRange[1], 10),
            mainValue:{min:parseFloat(selectedRange[0], 10), max:parseFloat(selectedRange[1], 10)},
            flag:false
          })
        } 
    }
    
    render(){
      return(
          <div style={wrapperStyle}>
            {/* <p className="text-center slider_price_range">{currencySymbol(this.state.selectedMin)}  - {currencySymbol(this.state.selectedMax)} </p> */}
            {/* <Range min={this.state.minRange} max={this.state.maxRange} value={[this.state.selectedMin, this.state.selectedMax]} onChange={this.handleRangeChange} onAfterChange={this.props.handleInputChange} tipFormatter={value => `${value}`} /> */}
            {this.state.maxRange ? 
            <InputRange minValue={this.state.minRange} maxValue={this.state.maxRange} value={this.state.mainValue}
            //  onChange={mainValue => this.setState({ mainValue })} 
            onChangeComplete={this.props.handleInputChange}
            onChange={this.handleRangeChange}
            step={0.25}
            // formatLabel={mainValue => `${currencySymbol(mainValue)}`}
            // allowSameValues={true}
             />
             : null}
          </div>
      ) 
    } 
    
}
 
RangeSlider.propTypes = {
  selectedPrices: PropTypes.string.isRequired,
  filter: PropTypes.any.isRequired,
  handleInputChange: PropTypes.func.isRequired
};

export default RangeSlider;
