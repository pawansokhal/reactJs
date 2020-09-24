import React from 'react';
import PropTypes from 'prop-types';
const Rating = (props) => {
    let totalRated = Math.round(props.rating);
    let shortRated = 5 - totalRated;
    let ratedHtml = [];
    let shortHtml = [];
    for (let i = 0; i < totalRated; i++) {
        ratedHtml.push(<i key={i + 1} className="fa fa-star" aria-hidden="true" />)
    }
    for (let i = 0; i < shortRated; i++) {
        shortHtml.push(<i key={i + 1} className="fa fa-star-o" aria-hidden="true" />)
    }
    return (
        <div className="icon">
           <span className="fs-18 cl11">
            {ratedHtml}
            {shortHtml}
            </span> 
        </div>
    )
}
Rating.propTypes = {
    rating: PropTypes.number
  };
export default Rating;