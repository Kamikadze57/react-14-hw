import { memo } from "react";
import ImageGalleryItem from "../ImageGaleryItem/ImageGaleryItem";

const ImageGallery = memo(({ images, onImageClick }) => {
  return (
    <ul className="ImageGallery">
      {images.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem key={id} webformatURL={webformatURL} tags={tags} onClick={() => onImageClick(largeImageURL, tags)} />
      ))}
    </ul>
  );
});

export default ImageGallery;
