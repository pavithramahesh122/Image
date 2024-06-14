/*import { useState } from 'react';
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
*/


/*
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
*/

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showImages, setShowImages] = useState(false);
  const [rejectedImages, setRejectedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:3001/images');
      setImages(response.data);
      setSelectedImage(response.data[0]); // Select the first image by default
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
      try {
        await handleStatusUpdate(id, 'Rejected');
        const rejectedImage = images.find(image => image.id === id);
        setRejectedImages([...rejectedImages, { ...rejectedImage, date: new Date().toLocaleString() }]);
      } catch (error) {
        console.error('Error rejecting image:', error);
      }
    }
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const handlePrevious = () => {
    const previousIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[previousIndex]);
    setCurrentIndex(previousIndex);
  };

  const handleAnalyse = async () => {
    await fetchImages();
    setShowImages(true);
  };

  const handleApprove = async (id) => {
    await handleStatusUpdate(id, 'Approved');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: 'white', minHeight: '100vh' }}>
      <h1 style={{ color: 'yellow', fontWeight: 'bold', marginTop: 0 }}>INHABITR</h1>
      <hr style={{ borderColor: '#ddd', width: '100%', marginBottom: '20px' }} />
      
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <p style={{ fontSize: '14px' }}>CREATE SHORTCUT</p>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p style={{ fontSize: '14px', marginRight: '20px' }}>↑ Key Saves the Updated Image Metadata</p>
          <p style={{ fontSize: '14px' }}>↓ Key Deletes Current Image</p>
        </div>
      </div>
      
      <hr style={{ borderColor: '#ddd', width: '100%', marginBottom: '20px' }} />

      <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '10px' }}>
        <button 
          type="button" 
          onClick={handleAnalyse} 
          style={{ 
            padding: '10px 20px', 
            backgroundColor: 'white', 
            color: 'black', 
            border: '1px solid white', 
            borderRadius: '4px', 
            cursor: 'pointer', 
            marginRight: '10px' 
          }}
        >
          Analyse
        </button>
        <button 
          type="button" 
          onClick={() => setShowImages(true)} 
          style={{ 
            padding: '10px 20px', 
            backgroundColor: 'white', 
            color: 'black', 
            border: '1px solid white', 
            borderRadius: '4px', 
            cursor: 'pointer', 
            marginRight: '10px' 
          }}
        >
          Approved
        </button>
        <button 
          type="button" 
          onClick={() => setShowImages(false)} 
          style={{ 
            padding: '10px 20px', 
            backgroundColor: 'white', 
            color: 'black', 
            border: '1px solid white', 
            borderRadius: '4px', 
            cursor: 'pointer', 
            marginRight: '10px' 
          }}
        >
          Review Later
        </button>
        <button 
          type="button" 
          onClick={() => setShowImages(false)} 
          style={{ 
            padding: '10px 20px', 
            backgroundColor: 'white', 
            color: 'black', 
            border: '1px solid white', 
            borderRadius: '4px', 
            cursor: 'pointer' 
          }}
        >
          Rejected
        </button>
      </div>

      {showImages && (
        <div style={{ display: 'flex', gap: '20px', marginTop: '20px', position: 'relative' }}>
          <div style={{ width: '60%', minWidth: '300px', overflow: 'hidden' }}>
            {selectedImage && (
              <div style={{ border: '1px solid #ddd', padding: '20px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', minHeight: '400px', position: 'relative' }}>
                <img src={selectedImage.url} alt="Uploaded" style={{ width: '100%', maxHeight: '300px', objectFit: 'contain' }} />
                <div 
                  style={{ 
                    position: 'absolute', 
                    bottom: '10px', 
                    right: '10px', 
                    display: 'flex', 
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    transition: 'background-color 0.3s ease',
                  }}
                >
                  <button
                    onClick={() => handleApprove(selectedImage.id)}
                    style={{ 
                      padding: '10px 20px', 
                      backgroundColor: '#32cd32', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '4px', 
                      cursor: 'pointer', 
                      marginRight: '10px',
                      transition: 'background-color 0.3s ease',
                      ':hover': {
                        backgroundColor: 'white',
                        color: '#32cd32',
                      }
                    }}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(selectedImage.id)}
                    style={{ 
                      padding: '10px 20px', 
                      backgroundColor: '#ff4500', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '4px', 
                      cursor: 'pointer',
                      transition: 'background-color 0.3s ease',
                      ':hover': {
                        backgroundColor: 'white',
                        color: '#ff4500',
                      }
                    }}
                  >
                    Reject
                  </button>
                </div>
                <div style={{ position: 'absolute', bottom: '10px', left: '10px', display: 'flex', alignItems: 'flex-end' }}>
                  <button 
                    type="button" 
                    onClick={handlePrevious}
                    style={{ 
                      padding: '10px 20px', 
                      backgroundColor: '#1e90ff', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '4px', 
                      cursor: 'pointer', 
                      marginRight: '10px',
                      display: showImages ? 'block' : 'none' // Only display when showImages is true
                    }}
                  >
                    Previous
                  </button>
                  <button 
                    type="button" 
                    onClick={handleNext}
                    style={{ 
                      padding: '10px 20px', 
                      backgroundColor: '#1e90ff', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '4px', 
                      cursor: 'pointer', 
                      display: showImages ? 'block' : 'none' // Only display when showImages is true
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
          <div style={{ width: '40%', minHeight: '400px', overflow: 'hidden' }}>
            {selectedImage && (
              <div style={{ border: '1px solid #ddd', padding: '20px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', minHeight: '400px' }}>
                <h3>Image Attribute</h3>
                <pre style={{ backgroundColor: '#f4f4f4', padding: '10px', borderRadius: '5px', overflowX: 'auto', maxHeight: 'calc(100% - 50px)', marginBottom: '20px' }}>
                  {JSON.stringify(selectedImage.json, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
