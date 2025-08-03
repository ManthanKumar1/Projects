import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    body.append('title', formData.title);
    body.append('author', formData.author);
    body.append('condition', formData.condition);
    body.append('originalPrice', formData.originalPrice);
    body.append('price', formData.price);

    for (let i = 0; i < images.length; i++) {
      body.append('image', images[i]);
    }

    try {
      const res = await axios.post('https://projects-5epb.onrender.com/createBook', body, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      });
      setMessage(res.data.message);
      navigate('/home'); // Redirect after success
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to create book');
    }
  };

  return (
    <div>
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="title" placeholder="Title" onChange={handleChange} required /><br />
        <input type="text" name="author" placeholder="Author" onChange={handleChange} required /><br />
        <select name="condition" onChange={handleChange} required>
          <option value="">Select Condition</option>
          <option value="Good">Good</option>
          <option value="Moderate">Moderate</option>
          <option value="Bad">Bad</option>
        </select><br />
        <input type="text" name="originalPrice" placeholder="Original Price" onChange={handleChange} required /><br />
        <input type="text" name="price" placeholder="Price" onChange={handleChange} required /><br />
        <input type="file" name="image" multiple onChange={handleImageChange} accept="image/*" /><br />
        <button type="submit">Add Book</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default AddBook;