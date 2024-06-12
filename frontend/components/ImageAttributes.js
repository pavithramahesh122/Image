import React from 'react';

const ImageAttributes = ({ image }) => {
  if (!image) {
    return <div>Select an image to see its attributes</div>;
  }

  return (
    <div>
      <h2>Image Attributes</h2>
      <p>URL: {image.url}</p>
      <p>Public ID: {image.publicId}</p>
    </div>
  );
};

export default ImageAttributes;
