import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [images, setImages] = useState([]);
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('');
  const [json, setJson] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showImages, setShowImages] = useState(false);

  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:3001/images');
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3001/images', { url, status, json: JSON.parse(json) });
      fetchImages();
      setUrl('');
      setStatus('');
      setJson('');
    } catch (error) {
      console.error('Error creating image:', error);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:3001/images/${id}`, { status: newStatus });
      fetchImages(); // Refresh the image list to show updated status
    } catch (error) {
      console.error('Error updating image status:', error);
    }
  };

  const handleReject = async (id) => {
    const confirmReject = window.confirm('Are you sure you want to reject this image?');
    if (confirmReject) {
      await handleStatusUpdate(id, 'Rejected');
    }
  };

  const handleFetchImages = async (event) => {
    event.preventDefault();
    await fetchImages();
    setShowImages(true);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Image Manager</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div>
          <label>URL:</label><br />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            style={{ width: '50%', padding: '8px', margin: '8px 0' }}
          /><br />
        </div>
        <div>
          <label>Status:</label><br />
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            style={{ width: '50%', padding: '8px', margin: '8px 0' }}
          />
        </div>
        <div>
          <label>JSON:</label><br />
          <textarea
            value={json}
            onChange={(e) => setJson(e.target.value)}
            required
            style={{ width: '50%', padding: '8px', margin: '8px 0' }}
          ></textarea>
        </div>
        <button type="submit" style={{ padding: '10px 20px',backgroundColor: 'blue', color: 'white' }}>Post</button>
      </form>

      <form onSubmit={handleFetchImages} style={{ marginBottom: '20px' }}>
        <button type="submit" style={{ padding: '10px 20px',backgroundColor: 'green', color: 'white' }}>Get Images</button>
      </form>

      {showImages && images.length > 0 && (
        <div>
          <button
            onClick={() => setCurrentIndex((currentIndex - 1 + images.length) % images.length)}
            style={{ padding: '5px 5px', marginRight: '10px',backgroundColor: 'green', color: 'white' }}
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentIndex((currentIndex + 1) % images.length)}
            style={{ padding: '5px 20px',backgroundColor: 'green', color: 'white' }}
          >
            Next
          </button>
          <div style={{ marginTop: '20px', border: '1px solid #ddd', padding: '20px' }}>
            <img src={images[currentIndex].url} alt="Uploaded" width="200" />
            <p>URL: {images[currentIndex].url}</p>
            <p>Status: {images[currentIndex].status}</p>
            <p>JSON: {JSON.stringify(images[currentIndex].json)}</p>
            <button
              onClick={() => handleStatusUpdate(images[currentIndex].id, 'Approved')}
              style={{ padding: '10px 20px', marginRight: '10px', backgroundColor: 'green', color: 'white' }}
            >
              Approve
            </button>
            <button
              onClick={() => handleReject(images[currentIndex].id)}
              style={{ padding: '10px 20px', backgroundColor: 'red', color: 'white' }}
            >
              Reject
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
