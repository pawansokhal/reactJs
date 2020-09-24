import React from 'react';
import PropTypes from 'prop-types';

const TextArea = (props) => (  
  <div className="form-group"> 
    <div className="row"> 
      <div className={props.containerClass}>
        <textarea
            className="form-control"
            style={props.resize ? null : {resize: 'none'}}
            name={props.name}
            rows={props.rows}
            value={props.content}
            onChange={props.controlFunc}
            placeholder={props.placeholder} 
            required={props.required} />
      </div>
    </div>
  </div>
);

TextArea.propTypes = {  
  title: PropTypes.string.isRequired,
  rows: PropTypes.number,
  name: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  resize: PropTypes.bool,
  placeholder: PropTypes.string,
  controlFunc: PropTypes.func.isRequired,
  required: PropTypes.bool.isRequired,
  containerClass: PropTypes.string,
};

export default TextArea;  