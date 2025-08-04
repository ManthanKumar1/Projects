import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './css/AddBook.css';

const AddBook = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    condition: '',
    originalPrice: '',
    price: '',
  });

  const [images, setImages] = useState([]);
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = e => {
    setImages(e.target.files);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const body = new FormData();
    for (let key in formData) {
      body.append(key, formData[key]);
    }
    for (let i = 0; i < images.length; i++) {
      body.append('image', images[i]);
    }

    try {
      const res = await axios.post('https://projects-5epb.onrender.com/createBook', body, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(res.data.message);
      navigate('/home');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to create book');
    }
  };

  return (
    <div className="add-book-container">
      <div className="top-bar">
        <h2>Add Book</h2>
        <Link to="/home" className="back-home-button">Back to Home</Link>
      </div>

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="add-book-form">
        <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
        <input type="text" name="author" placeholder="Author" onChange={handleChange} required />
        <select name="condition" onChange={handleChange} required>
          <option value="">Select Condition</option>
          <option value="Good">Good</option>
          <option value="Moderate">Moderate</option>
          <option value="Bad">Bad</option>
        </select>
        <input type="text" name="originalPrice" placeholder="Original Price" onChange={handleChange} required />
        <input type="text" name="price" placeholder="Selling Price" onChange={handleChange} required />
        <input type="file" name="image" multiple onChange={handleImageChange} accept="image/*" />
        <button type="submit">Add Book</button>
      </form>

      {message && <p className="add-book-message">{message}</p>}
    </div>
  );
};

export default AddBook;