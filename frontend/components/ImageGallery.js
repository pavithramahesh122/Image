// ImageGallery.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/global.css';

function ImageGallery() {
  const [url, setUrl] = useState('');
  const [json, setJson] = useState('');
  const [status, setStatus] = useState('');
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:3001/images');
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const uploadImage = async () => {
    try {
      const response = await axios.post('http://localhost:3001/images', { url, json, status });
      setImages([...images, response.data]);
      setUrl('');
      setJson('');
      setStatus('');
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const deleteImage = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/images${id}`);
      setImages(images.filter((image) => image.id !== id));
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const updateImageStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:3001/images${id}`, { status: newStatus });
      setImages(
        images.map((image) =>
          image.id === id ? { ...image, status: newStatus } : image
        )
      );
      setCurrentImage(null);
    } catch (error) {
      console.error('Error updating image status:', error);
    }
  };

  const clearCurrent = () => {
    setCurrentImage(null);
  };

  return (
    <div className={styles.container}>
      <h1>Image Gallery</h1>
      <div className={styles.input-field}>
        <input
          type="text"
          placeholder="Image URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <input
          type="text"
          placeholder="JSON Data"
          value={json}
          onChange={(e) => setJson(e.target.value)}
        />
        <input
          type="text"
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <button className={styles.button} onClick={uploadImage}>
          Upload Image
        </button>
      </div>
      {currentImage && (
        <div className={styles.image-card}>
          <img src={currentImage.url} alt="Uploaded" />
          <p>{currentImage.json}</p>
          <p>{currentImage.status}</p>
          <button className={styles.button} onClick={() => updateImageStatus(currentImage.id, 'Approved')}>
            Approve
          </button>
          <button className={styles.button} onClick={() => updateImageStatus(currentImage.id, 'Rejected')}>
            Reject
          </button>
          <button className={styles.button} onClick={clearCurrent}>Close</button>
        </div>
      )}
      <div>
        {images.map((image) => (
          <div key={image.id} className={styles.image-card}>
            <img
              src={image.url}
              alt="Uploaded"
              onClick={() => setCurrentImage(image)}
            />
            <p>{image.json}</p>
            <p>{image.status}</p>
            <button className={styles.button} onClick={() => deleteImage(image.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageGallery;
