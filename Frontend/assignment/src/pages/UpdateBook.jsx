import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './css/UpdateBook.css'; // Add this line

const UpdateBook = () => {
  const { bookId } = useParams();
  const [form, setForm] = useState({
    title: '',
    author: '',
    condition: '',
    originalPrice: '',
    price: ''
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`https://projects-5epb.onrender.com/getBook?bookId=${bookId}`);
        const book = res.data.data[0];
        setForm({
          title: book.title || '',
          author: book.author || '',
          condition: book.condition || '',
          originalPrice: book.originalPrice || '',
          price: book.price || ''
        });
      } catch (err) {
        setMessage(err.response?.data?.message || 'Failed to load book');
      }
    };

    if (bookId) fetchBook();
  }, [bookId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (let key in form) {
        formData.append(key, form[key]);
      }
      if (image) {
        formData.append('image', image);
      }

      const res = await axios.post(
        `https://projects-5epb.onrender.com/updateBook?bookId=${bookId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      alert(res.data.message);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update book');
    }
  };

  return (
    <div className="update-book-container">
      <h2>Update Book</h2>
      {message && <p className="error-message">{message}</p>}

      <form onSubmit={handleSubmit} className="update-book-form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          required
        />

        <select
          name="condition"
          value={form.condition}
          onChange={handleChange}
          required
        >
          <option value="">Select Condition</option>
          <option value="Good">Good</option>
          <option value="Moderate">Moderate</option>
          <option value="Bad">Bad</option>
        </select>

        <input
          type="number"
          name="originalPrice"
          placeholder="Original Price"
          value={form.originalPrice}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Selling Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
        />

        <button type="submit">Update Book</button>
      </form>
    </div>
  );
};

export default UpdateBook;