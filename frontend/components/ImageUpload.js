// components/ImageUpload.js

import { useState } from 'react';

function ImageUpload() {
  const [file, setFile] = useState(null);

  const handleChange = event => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('image', file);
      await fetch('http://localhost:3001/images/upload', {
        method: 'POST',
        body: formData
      });
      alert('Image uploaded successfully');
    } catch (error) {
      console.error(error);
      alert('Error uploading image');
    }
  };

  return (
    <div>
      <h1>Upload Image</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default ImageUpload;
