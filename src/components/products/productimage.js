import React from 'react';
import ImageGallery from 'react-image-gallery';

import "react-image-gallery/styles/css/image-gallery.css";
class ProductImage extends React.Component {
  render() {
    let gallaryImages = []
    this.props.images.map(item => {
      gallaryImages.push({
        original: item.full_image,
        thumbnail: item.thumbnail_image,
      });
      return true;
    });
    return (
      <div className="image-gallery-thumbnails-wrapper left">
      <ImageGallery
      showNav={false}
        ref={this.props.refImageGallery}
        items={gallaryImages}
        infinite={true}
        thumbnailPosition="left"
        showFullscreenButton={false}
        useBrowserFullscreen={false}
        showPlayButton={false}
        lazyLoad={false}
        onClick={this.props.cbOnImageClick}
        useTranslate3D={true}
      />
    </div>
    )
  }
}

  
export default (ProductImage);
