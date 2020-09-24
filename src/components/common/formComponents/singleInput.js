import React from 'react';
import PropTypes from 'prop-types';

const SingleInput = (props) => {
    return(
        <div className="form-group"> 
            <div className="row"> 
                <div className={props.containerClass}>
                    <input
                        id={props.name}
                        className="form-control input-md"
                        name={props.name}
                        type={props.inputType}
                        value={props.content}
                        onChange={props.controlFunc}
                        placeholder={props.placeholder} 
                        required={props.required}
                        data-custom_data={props.customAttr}
                    />
                </div>
            </div>
        </div>    
    );    
};

SingleInput.defaultProps = {
    customAttr:''
}

SingleInput.propTypes = {  
  inputType: PropTypes.oneOf(['text', 'number', 'email', 'password', 'date']).isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  controlFunc: PropTypes.func.isRequired,
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool.isRequired,
  containerClass: PropTypes.string,
};


export default SingleInput;