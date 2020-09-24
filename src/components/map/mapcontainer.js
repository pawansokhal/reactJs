import React, { Component } from 'react';
import MainContainer from '../common/mainContainer';

class MapContainer extends Component {

    render(){
        return(
            <MainContainer>
                <div style={{width: "100%", height: 550 }} ref={this.props.mapRef}></div>
            </MainContainer>
        )
    }
}

export default MapContainer