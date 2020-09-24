import React from 'react';
import Lightbox from 'react-image-lightbox';
import PropTypes from 'prop-types';

const customStyles = {
    overlay : {
        position: "fixed",
        // top: "5%",
        // left: "25%",
        // right: "20%",
        // bottom: "5%"
    }
};

class ImagesPopup extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            photoIndex:this.props.index,
            isOpen:this.props.isOpenLightbox
        }
    }

    render(){
        const images = this.props.images;
        const photoIndex = this.state.photoIndex;
        // if(images.length >0 && this.state.isOpen){
        if(images.length >0){
            return(            
                <Lightbox
                    reactModalStyle={customStyles}
                    wrapperClassName="image_popup_model"
                    mainSrc={images[photoIndex]}
                    nextSrc={images[(photoIndex + 1) % images.length]}
                    prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                    //onCloseRequest={() => this.setState({ isOpen: false })}                    
                    onCloseRequest={this.props.cbOnCloseRequest}
                    onMovePrevRequest={() =>
                    this.setState({
                        photoIndex: (photoIndex + images.length - 1) % images.length,
                    })
                    }
                    onMoveNextRequest={() =>
                        this.setState({
                            photoIndex: (photoIndex + 1) % images.length,
                        })
                    }
                    animationDuration={400}
                    imagePadding={20}
                /> 
            )
        }else{
            return('')
        }
        
    }
}

ImagesPopup.defaultProps = {
    images: [],
    index: 0
}

ImagesPopup.propTypes = {
    index: PropTypes.string.isRequired,
    images: PropTypes.array.isRequired,
    cbOnCloseRequest: PropTypes.func.isRequired,
}
export default ImagesPopup;