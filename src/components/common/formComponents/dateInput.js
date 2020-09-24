import React from 'react';
import PropTypes from 'prop-types';

const DateInput = (props) => {
    return(        
        <div className={"form-group " + props.containerClass}>
            <div className="row"> 
                <label className="form-label" htmlFor="singleInput">{props.title}</label>
                <input
                    id="singleInput"
                    className="form-control "
                    name={props.name}
                    type="date"
                    value={props.content}
                    onChange={props.controlFunc}
                    placeholder={props.placeholder} 
                    required={props.required}
                    min={props.min}
                />
            </div>
        </div>
    );    
};

DateInput.propTypes = {  
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  controlFunc: PropTypes.func.isRequired,
  content: PropTypes.string,
  placeholder: PropTypes.string,
  min: PropTypes.string,
  required: PropTypes.bool.isRequired,
  containerClass: PropTypes.string,
};


export default DateInput;
