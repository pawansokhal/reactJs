import React from 'react';
import PropTypes from 'prop-types';

const ButtonInput = (props) => {
    return(
        <div className="form-group">
            <div className="row"> 
                <div className={props.containerClass}>
                    <button 
                        id={props.name}
                        className="btn btn-primary"
                        name={props.name}
                        type={props.inputType}
                        disabled={props.disabled}
                        data-custom_data={props.customAttr}
                    >{props.content}</button>
                </div>
            </div>
        </div>
 
        
    );    
};

ButtonInput.defaultProps = {
    title: '',
    content: 'Submit',
    disabled: false,
    customAttr:''
}

ButtonInput.propTypes = {  
  inputType: PropTypes.oneOf(['button', 'submit']).isRequired,
  name: PropTypes.string.isRequired,
  content: PropTypes.string,
  containerClass: PropTypes.string,
  disabled: PropTypes.bool,
  customAttr: PropTypes.string
};


export default ButtonInput;

/*
<div className={"form-group " + props.containerClass}>
            <label className="form-label" htmlFor="buttonInput">{props.title}</label>
            <button 
                id="buttonInput"
                className="form-control btn-primary"
                name={props.name}
                type={props.inputType}
                disabled={props.disabled}
                data-custom_data={props.customAttr}
            >{props.content}</button>
        </div>
*/