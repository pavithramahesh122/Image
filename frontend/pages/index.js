import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.css';
import { faCopy, faEdit } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [view, setView] = useState('all'); // 'all', 'approved', 'rejected', 'reviewLater'
  const [rejectedProducts, setRejectedProducts] = useState([]);
  const [approvedProducts, setApprovedProducts] = useState([]);
  const [reviewLaterProducts, setReviewLaterProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [reviewMode, setReviewMode] = useState(false); // New state for review mode
  const [currentPageApproved, setCurrentPageApproved] = useState(0);
  const [currentPageRejected, setCurrentPageRejected] = useState(0);
  const [currentPageReviewLater, setCurrentPageReviewLater] = useState(0);
  
  const [itemsPerPage, setItemsPerPage] = useState(8); // Number of items per page

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    
    try {
      const response = await axios.get('http://localhost:3001/products');
      setProducts(response.data);
      setSelectedProduct(response.data[0]); // Select the first product by default
      filterProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const filterProducts = (products) => {
    const approved = products.filter(product => product.status === 'Approved');
    const rejected = products.filter(product => product.status === 'Rejected');
    const reviewLater = products.filter(product => product.status === 'ReviewLater');

    setApprovedProducts(approved);
    setRejectedProducts(rejected);
    setReviewLaterProducts(reviewLater);
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:3001/products/${id}`, { status: newStatus });

      // Update the products array locally instead of refetching
      const updatedProducts = products.map(product => 
        product.id === id ? { ...product, status: newStatus } : product
      );

      setProducts(updatedProducts);
      filterProducts(updatedProducts);

      // Ensure the selected product remains the same
      const updatedSelectedProduct = updatedProducts.find(product => product.id === selectedProduct.id);
      setSelectedProduct(updatedSelectedProduct || null);
    } catch (error) {
      console.error('Error updating product status:', error);
    }
  };

  const handleReject = async (id) => {
    const confirmReject = window.confirm('Are you sure you want to reject this product?');
    if (confirmReject) {
      try {
        await handleStatusUpdate(id, 'Rejected');
      } catch (error) {
        console.error('Error rejecting product:', error);
      }
    }
  };

  const handleApprove = async (id) => {
    await handleStatusUpdate(id, 'Approved');
  };

  const handleReviewLater = async (id) => {
    await handleStatusUpdate(id, 'ReviewLater');
  };

  const handleReviewAgain = async (product) => {
    try {
      await handleStatusUpdate(product.id, 'Pending');
      setSelectedProduct(product);
      setReviewMode(true);
      console.log('Product status reset to Pending:', product);
    } catch (error) {
      console.error('Error resetting product status:', error);
    }
  };

  const handleNextPageApproved = () => {
    setCurrentPageApproved(currentPageApproved + 1);
  };

  const handlePreviousPageApproved = () => {
    setCurrentPageApproved(currentPageApproved - 1);
  };

  const handleNextPageRejected = () => {
    setCurrentPageRejected(currentPageRejected + 1);
  };

  const handlePreviousPageRejected = () => {
    setCurrentPageRejected(currentPageRejected - 1);
  };

  const handleNextPageReviewLater = () => {
    setCurrentPageReviewLater(currentPageReviewLater + 1);
  };

  const handlePreviousPageReviewLater = () => {
    setCurrentPageReviewLater(currentPageReviewLater - 1);
  };

  const handleNext = () => {
    if (products.length > 0) {
      const nextIndex = (currentIndex + 1) % products.length;
      setCurrentIndex(nextIndex);
      setSelectedProduct(products[nextIndex]);
    }
  };

  const handlePrevious = () => {
    if (products.length > 0) {
      const previousIndex = (currentIndex - 1 + products.length) % products.length;
      setCurrentIndex(previousIndex);
      setSelectedProduct(products[previousIndex]);
    }
  };
  const handleCopy = (product) => {
    if (product) {
      // Initialize an array to hold defined properties
      const properties = [];

      // Function to push property with its label to properties array
      const pushProperty = (label, value) => {
        properties.push(`${label}: ${value}`);
      };

      // Push each defined property to properties array
      if (product.id) {
        pushProperty('ID', product.id);
      }
      if (product.fdc_product_id) {
        pushProperty('FDC Product ID', product.fdc_product_id);
      }
      if (product.name) {
        pushProperty('Name', product.name);
      }
      if (product.product_image_uri) {
        pushProperty('Product Image URI', product.product_image_uri);
      }
      if (product.product_description) {
        pushProperty('Product Description', product.product_description);
      }
      if (product.product_dimensions) {
        pushProperty('Product Dimensions', product.product_dimensions);
      }
      if (product.created_at) {
        pushProperty('Created At', product.created_at);
      }
      if (product.updated_at) {
        pushProperty('Updated At', product.updated_at);
      }
      if (product.price) {
        pushProperty('Price', product.price);
      }
      if (product.quantity) {
        pushProperty('Quantity', product.quantity);
      }
      if (product.status) {
        pushProperty('Status', product.status);
      }

      // Join the properties array into a single string
      const textToCopy = properties.join(', ');

      // Copy the text to the clipboard
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          showPopup('Text copied to clipboard!');
        })
        .catch(err => {
          console.error('Error copying text: ', err);
        });
    } else {
      console.error('No product selected');
    }
  };

  const handleEdit = (product) => {
    if (product) {
      // Initialize an object to hold defined properties
      const properties = {};
  
      // Function to add property to properties object
      const addProperty = (key, value) => {
        properties[key] = value;
      };
  
      // Add each defined property to properties object
      if (product.id) {
        addProperty('id', product.id);
      }
      if (product.fdc_product_id) {
        addProperty('fdc_product_id', product.fdc_product_id);
      }
      if (product.name) {
        addProperty('name', product.name);
      }
      if (product.product_image_uri) {
        addProperty('product_image_uri', product.product_image_uri);
      }
      if (product.product_description) {
        addProperty('product_description', product.product_description);
      }
      if (product.product_dimensions) {
        addProperty('product_dimensions', product.product_dimensions);
      }
      if (product.created_at) {
        addProperty('created_at', product.created_at);
      }
      if (product.updated_at) {
        addProperty('updated_at', product.updated_at);
      }
      if (product.price) {
        addProperty('price', product.price);
      }
      if (product.quantity) {
        addProperty('quantity', product.quantity);
      }
      if (product.status) {
        addProperty('status', product.status);
      }
  
      // Assuming you have a form that handles editing, pass the properties to it
      // Example: openEditForm(properties);
    } else {
      console.error('No product selected');
    }
  };
  
  // Function to handle the submission of the edited product details
  const submitEdit = (editedProperties, productId) => {
    const updatedProduct = { id: productId, ...editedProperties };
  
    // Call the API to update the product
    axios.put(`http://localhost:3001/products/${productId}`, updatedProduct)
      .then(() => {
        // Update the product in the local state
        setProducts(products.map(p => p.id === productId ? updatedProduct : p));
        setSelectedProduct(updatedProduct);
        filterProducts(products.map(p => p.id === productId ? updatedProduct : p));
      })
      .catch(err => {
        console.error('Error updating product: ', err);
      });
  };
  
  // Function to handle the editing process
  const openEditForm = (product) => {
    // Your code to open the form with product details pre-filled
    // Once the form is submitted, call the submitEdit function with edited properties
  };
  
  // Remove the showPopup function as it is no longer needed
  

  

  const renderProductList = (productList, currentPage, handleNextPage, handlePreviousPage) => {
    const totalPages = Math.ceil(productList.length / itemsPerPage);
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = productList.slice(startIndex, endIndex);

    return (
      <div style={{ marginTop: '20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#BEE4F4', borderBottom: '1px solid #ddd' }}>
              <th style={{ padding: '5px', textAlign: 'center' }}>Images</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Approved On</th>
              <th style={{ padding: '10px', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ padding: '10px', verticalAlign: 'top', textAlign: 'center' }}>
                  <img src={product.product_image_uri} alt="Product Thumbnail" style={{ width: '35px', height: '50px', objectFit: 'contain' }} />
                </td>
                <td style={{ padding: '10px', verticalAlign: 'middle' }}>
                  {formatDate(product.updated_at)} {/* Display the formatted date */}
                </td>
                <td style={{ padding: '10px', verticalAlign: 'middle', textAlign: 'center' }}>
                  <button onClick={() => handleReviewAgain(product)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#007bff', textDecoration: 'underline' }}>
                    Analyze again
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" style={{ position: 'relative', textAlign: 'center'}}>
                <button 
                  onClick={handlePreviousPage} 
                  style={{ 
                    position: 'absolute', 
                    left: 0, 
                    padding: '10px 20px', 
                    backgroundColor: 'white', 
                    color: 'black',  
                    border: 'none', 
                    borderRadius: '5px', 
                    cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    
                  }} 
                  disabled={currentPage === 0}
                >
                  <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '5px' }} />
                  Previous 
                </button>
                <span style={{ margin: '0 20px' }}>
                  <span style={{ fontWeight: 'bold' }}> {currentPage + 1}</span>  {totalPages}
                </span>
                <button 
                  onClick={handleNextPage} 
                  style={{ 
                    position: 'absolute', 
                    right: 0, 
                    padding: '10px 20px', 
                    backgroundColor: 'white', 
                    color: 'black',  
                    border: 'none', 
                    borderRadius: '5px', 
                    cursor: endIndex >= productList.length ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft: '10px'
                  }} 
                  disabled={endIndex >= productList.length}
                >
                  Next 
                  <FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: '5px' }} />
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  };

// Function to format date as DD/MM/YYYY
   const formatDate = (dateString) => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  const formattedDate = new Date(dateString).toLocaleDateString('en-GB', options);
  return formattedDate;
};
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowUp') {
        // Implement logic to save updated metadata
        console.log('Saving updated metadata...');
      } else if (event.key === 'ArrowDown') {
        // Implement logic to delete current image
        console.log('Deleting current image...');
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: 'white', minHeight: '100vh' }}>
      <h1 style={{ color: '#f5c500', fontWeight: 'bold', marginTop: 0 }}>INHABITR</h1>
      <hr style={{ borderColor: '#ddd', width: '100%', marginBottom: '20px' }} />

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <p style={{ fontSize: '14px' }}>KEYBOARD SHORTCUT</p>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p style={{ fontSize: '14px', marginRight: '20px' }}>↑ Key Saves the Updated Image Metadata</p>
          <p style={{ fontSize: '14px' }}>↓ Key Deletes the Current Image</p>
        </div>
      </div>

      <hr style={{ borderColor: '#ddd', width: '100%', marginBottom: '20px' }} />

      <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '10px' }}>
        <button
          type="button"
          onClick={() => { setView('all'); setReviewMode(false); }}
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
          onClick={() => setView('approved')}
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
          onClick={() => setView('rejected')}
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
          Rejected
        </button>
        <button
          type="button"
          onClick={() => setView('reviewLater')}
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
      </div>

      {!reviewMode && view === 'approved' && (
        renderProductList(approvedProducts, currentPageApproved, handleNextPageApproved, handlePreviousPageApproved)
      )}
      {!reviewMode && view === 'rejected' && (
        renderProductList(rejectedProducts, currentPageRejected, handleNextPageRejected, handlePreviousPageRejected)
      )}
      {!reviewMode && view === 'reviewLater' && (
        renderProductList(reviewLaterProducts, currentPageReviewLater, handleNextPageReviewLater, handlePreviousPageReviewLater)
      )}

      {products.length > 0 && (view === 'all' || reviewMode) && (
        <div style={{ display: 'flex', gap: '20px', marginTop: '20px', position: 'relative' }}>
          <div style={{ width: '60%', minWidth: '300px', overflow: 'hidden' }}>
            {selectedProduct && (
              <div style={{ border: '1px solid #ddd', padding: '20px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', minHeight: '400px', position: 'relative' }}>
                <img src={selectedProduct.product_image_uri} alt="Product" style={{ width: '100%', maxHeight: '300px', objectFit: 'contain' }} />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    display: 'flex',
                    gap: '10px',
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    transition: 'background-color 0.3s ease',
                  }}
                >
                  <button
                    onClick={() => handleApprove(selectedProduct.id)}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#1E90FF',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(selectedProduct.id)}

                    style={{
                      padding: '10px 20px',
                      backgroundColor: 'white',
                      color: 'black',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => handleReviewLater(selectedProduct.id)}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '',
                      color: 'black',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    Review Later
                  </button>
                </div>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '10px',
                    display: 'flex',
                    gap: '10px',
                  }}
                >
                  <button
                    type="button"
                    onClick={handlePrevious}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#1e90ff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
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
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
          <div style={{ width: '40%', minHeight: '400px', overflow: 'hidden' }}>
            {selectedProduct && (
              <div style={{ border: '1px solid #ddd', padding: '20px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', minHeight: '400px' }}>
                <h3 style={{ 
    border: '1px solid #ddd', 
    padding: '10px 20px', 
    margin: 0, 
    boxShadow: '0 0 10px rgba(0,0,0,0.1)', 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
}}>
    <span>Image Attributes</span>
    <span>
        <FontAwesomeIcon 
            icon={faCopy} 
            style={{ marginRight: '10px', cursor: 'pointer', color: 'black'}} 
            onClick={() => handleCopy(selectedProduct)} 
        />
        <FontAwesomeIcon 
            icon={faEdit} 
            style={{ cursor: 'pointer', color: 'black'}} 
            onClick={() => handleEdit(selectedProduct)} 
        />
    </span>
</h3>


                
                <div style={{ backgroundColor: '#f4f4f4', padding: '10px', borderRadius: '5px', overflowX: 'auto' }}>
                  <p><strong>ID:</strong> {selectedProduct.id}</p>
                  <p><strong>Product ID:</strong> {selectedProduct.fdc_product_id}</p>
                  <p><strong>Name:</strong> {selectedProduct.name}</p>
                  <p><strong>Product Image URI:</strong> {selectedProduct.product_image_uri} </p>
                  <p><strong>Description:</strong> {selectedProduct.product_description}</p>
                  <p><strong>Dimensions:</strong> {selectedProduct.product_dimensions}</p>
                  <p><strong>Created At:</strong> {selectedProduct.created_at}</p>
                  <p><strong>Updated At:</strong> {selectedProduct.updated_at}</p>
                  <p><strong>Price:</strong> ${selectedProduct.price}</p>
                  <p><strong>Quantity:</strong> {selectedProduct.quantity}</p>
                  <p><strong>Status:</strong> {selectedProduct.status}</p>
                  <p><strong>Approved Date:</strong> {selectedProduct.updated_at ? formatDate(selectedProduct.updated_at) : ''}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

         
