import { Component } from "react";

class ImageGalleryItem extends Component {
  render() {
    const { webformatURL, tags, onClick } = this.props;
    return (
      <li className="ImageGalleryItem" onClick={onClick}>
        <img src={webformatURL} alt={tags} className="ImageGalleryItem-image" />
      </li>
    );
  }
}

export default ImageGalleryItem;
