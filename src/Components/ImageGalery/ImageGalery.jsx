import { Component } from "react";
import ImageGalleryItem from "../ImageGaleryItem/ImageGaleryItem";

class ImageGallery extends Component {
  render() {
    const { images, onImageClick } = this.props;
    return (
      <ul className="ImageGallery">
        {images.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageGalleryItem key={id} webformatURL={webformatURL} tags={tags} onClick={() => onImageClick(largeImageURL, tags)} />
        ))}
      </ul>
    );
  }
}

export default ImageGallery;
