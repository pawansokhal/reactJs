import React, { Component } from 'react';
import { connect } from 'react-redux';

class MainContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            loaded: false
        }
    }

    render(){       
        return (
            <section className="">        
                {/* <div className="row"> */}
                    {this.props.children}
                {/* </div> */}
            </section>
        )
    }
}
function mapStateToProps(state) {
    return {
        // isajaxprocessing: state.ajaxrequest.isajaxprocessing,
    };
}

export default connect(mapStateToProps)(MainContainer);