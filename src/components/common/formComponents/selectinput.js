import React from 'react';
import PropTypes from 'prop-types';
import { ucfirst } from '../../../common/common'

const Select = (props) => (  
    <div className="form-group">
        <div className="row"> 
            <div className={props.containerClass}>
                <select 
                    id="select"
                    className="form-control"
                    name={props.name}
                    value={props.selectedOption}
                    onChange={props.controlFunc}
                    required={props.required}
                    data-custom_data={props.customAttr}
                    disabled={props.disabled}
                >
                {(props.placeholder !== '') ? (<option value="">{props.placeholder}</option>) : ('')}        
                {props.options.map(opt => {
                    return (
                    <option
                        key={opt.value}
                        value={opt.value}>{ucfirst(opt.text)}</option>
                    );
                })}
                </select>
            </div> 
        </div> 
    </div>
    
);

Select.defaultProps = {
    customAttr:''
}

Select.propTypes = {  
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  selectedOption: PropTypes.string,
  controlFunc: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool.isRequired,
  containerClass: PropTypes.string,
  disabled : PropTypes.bool,
};

export default Select;