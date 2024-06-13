import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showImages, setShowImages] = useState(false);
  const [rejectedImages, setRejectedImages] = useState([]);

  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:3001/images');
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:3001/images/${id}`, { status: newStatus });
      fetchImages();
    } catch (error) {
      console.error('Error updating image status:', error);
    }
  };

  const handleReject = async (id) => {
    const confirmReject = window.confirm('Are you sure you want to reject this image?');
    if (confirmReject) {
      await handleStatusUpdate(id, 'Rejected');
      const rejectedImage = images.find(image => image.id === id);
      setRejectedImages([...rejectedImages, { ...rejectedImage, date: new Date().toLocaleString() }]);
    }
  };

  const handleFetchImages = async (event) => {
    event.preventDefault();
    await fetchImages();
    setShowImages(true);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>InhabitR Image Manager</h1>

      <form onSubmit={handleFetchImages} style={{ marginBottom: '20px' }}>
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#1e90ff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Analyse</button>
        <button
          type="button"
          onClick={() => setShowImages(true)}
          style={{ padding: '10px 20px', backgroundColor: '#32cd32', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginLeft: '10px' }}
        >
          Approved
        </button>
        <button
          type="button"
          onClick={() => setShowImages(false)}
          style={{ padding: '10px 20px', backgroundColor: '#ffa500', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginLeft: '10px' }}
        >
          Review Later
        </button>
        <button
          type="button"
          onClick={() => setShowImages(false)}
          style={{ padding: '10px 20px', backgroundColor: '#ff4500', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginLeft: '10px' }}
        >
          Rejected
        </button>
      </form>

      {showImages && images.length > 0 && (
        <div>
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ width: '50%', border: '1px solid #ddd', padding: '20px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
              <img src={images[currentIndex].url} alt="Uploaded" style={{ width: '100%' }} />
            </div>
            <div style={{ width: '45%', border: '1px solid #ddd', padding: '20px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
              <h3>Image Attribute</h3>
              <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', borderRadius: '5px', overflowX: 'auto' }}>
                {JSON.stringify(images[currentIndex].json, null, 2)}
              </pre>
              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <button
                  onClick={() => handleStatusUpdate(images[currentIndex].id, 'Approved')}
                  style={{ padding: '10px 20px', backgroundColor: '#32cd32', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(images[currentIndex].id)}
                  style={{ padding: '10px 20px', backgroundColor: '#ff4500', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Reject
                </button>
              </div>
              {rejectedImages.length > 0 && (
                <div style={{ marginTop: '20px' }}>
                  <h3>Rejected Images</h3>
                  <ul>
                    {rejectedImages.map((image, index) => (
                      <li key={index} style={{ marginBottom: '10px', listStyleType: 'none', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
                        <p><strong>URL:</strong> {image.url}</p>
                        <p><strong>Date Rejected:</strong> {image.date}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
            <button
              onClick={() => setCurrentIndex((currentIndex - 1 + images.length) % images.length)}
              style={{ padding: '10px 20px', marginRight: '10px', backgroundColor: '#1e90ff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentIndex((currentIndex + 1) % images.length)}
              style={{ padding: '10px 20px', backgroundColor: '#1e90ff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
