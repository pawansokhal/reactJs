import React, { Component } from 'react';
import PropTypes from 'prop-types';


class Pagination extends Component {
	render(){
		const total_record	=	this.props.total_record;
		const current_page	=	this.props.current_page;
		const record_per_page	=	this.props.record_per_page;
		const setLastpage 	= Math.ceil(total_record/record_per_page);
		
		const links 	= 4;		
		const start 	= ( ( current_page - links ) > 0 ) ? current_page - links : 1;
		const end 		= ( ( current_page + links ) < setLastpage ) ? current_page + links : setLastpage;

		let pagination_html	= [];
		// for (var i = 1; i <= setLastpage; i++) {
		// 	let activeClass = "";	
		// 	if(i === current_page){
		// 		activeClass	=	'disabled';
		// 	}
		// 	pagination_html.push(
		// 		<li key={i} className={"page-item "+activeClass}>
		// 			<a onClick={this.props.handlePageChange} className="page-link" aria-controls="example2" data-dt-idx={i} tabIndex={i}>{i}</a>
		// 		</li>	
		// 	)
		// }

		for ( let i = start ; i <= end; i++ ) {
			let activeClass = "";	
			if(i === current_page){
				activeClass	= 'disabled';
			}
			pagination_html.push(
				<li key={i} className={"page-item "+activeClass}>
		 			<a onClick={this.props.handlePageChange} className="page-link" aria-controls="example2" data-dt-idx={i} tabIndex={i}>{i}</a>
		 		</li>
			)
		}

		return(
			<div className="pagination-block text-center">
				<ul className="pagination">					
					{/* <li className={"page-item "}>
						<a onClick={this.props.handlePageChange} className="page-link" aria-controls="example2" data-dt-idx={1} tabIndex={1}>&laquo;</a>
					</li>				 */}
					{( start > 1 ) ? (
						<React.Fragment>
							<li>
								<a onClick={this.props.handlePageChange} className="page-link" aria-controls="example2" data-dt-idx={1} tabIndex={1}>1</a>
							</li>
							<li className="disabled"><span className="page-link" >...</span></li>
							{/* <a onClick={this.props.handlePageChange} className="page-link" aria-controls="example2" data-dt-idx={1} tabIndex={1}>&laquo;</a> */}
						</React.Fragment>
					):('')}
					{pagination_html}				
					{( end < setLastpage ) ? (
						<React.Fragment>
							<li className="disabled"><span className="page-link">...</span></li>
							<li>
								<a onClick={this.props.handlePageChange} className="page-link" aria-controls="example2" data-dt-idx={setLastpage} tabIndex={setLastpage}>{setLastpage}</a>
							</li>
						</React.Fragment>
					) : ('')}
					{/* <li className={"page-item "}>						
						<a onClick={this.props.handlePageChange} className="page-link" aria-controls="example2" data-dt-idx={setLastpage} tabIndex={setLastpage}>&raquo;</a>
					</li> */}
				</ul>
			</div>
		)

		// return(
		// 	<div className="pagination-block text-center">
		// 		<ul className="pagination">
		// 			{pagination_html}
		// 		</ul>
		// 	</div>
		// )
	}
}

Pagination.propTypes = {  
  current_page: PropTypes.number.isRequired,
  total_record: PropTypes.number.isRequired,
  record_per_page: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
};

export default Pagination;
