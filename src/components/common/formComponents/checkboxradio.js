import React from 'react';
import PropTypes from 'prop-types';

const CheckboxOrRadioGroup = (props) => {
  return (
    <div className={"form-group " + props.containerClass}>
        <div className="row"> 
          <div className="checkbox-group">
            {props.options.map(opt => {
              return (
                <label key={opt} className="form-label">                  
                  <input
                    className="form-checkbox"
                    name={props.name}
                    onChange={props.controlFunc}
                    value={opt}
                    checked={ props.selectedOption.indexOf(opt) > -1 }
                    type={props.inputType} 
                    required={props.required}
                  />
                  &nbsp;{props.title}
                </label>
              );
            })}
        </div>
      </div>
  </div>
  )  
};

CheckboxOrRadioGroup.propTypes = {  
  title: PropTypes.string.isRequired,
  inputType: PropTypes.oneOf(['checkbox', 'radio']).isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  selectedOption: PropTypes.array,
  controlFunc: PropTypes.func.isRequired,
  required: PropTypes.bool.isRequired,
  containerClass: PropTypes.string,
};

export default CheckboxOrRadioGroup;  