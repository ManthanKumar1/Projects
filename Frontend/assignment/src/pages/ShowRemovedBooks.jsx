import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/ShowRemovedBooks.css';

const ShowRemovedBooks = () => {
  const [books, setBooks] = useState([]);
  const [bookImages, setBookImages] = useState({});
  const [msg, setMsg] = useState('');
  const [filter, setFilter] = useState('');
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRemovedBooks = async () => {
      try {
        const res = await axios.get('https://projects-5epb.onrender.com/showRemove', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBooks(res.data.data);
      } catch (err) {
        setMsg(err.response?.data?.message || 'Error fetching removed books');
      }
    };

    if (token) fetchRemovedBooks();
  }, [token]);

  useEffect(() => {
    const fetchImages = async () => {
      const images = {};

      for (const book of books) {
        try {
          const res = await axios.get(
            `https://projects-5epb.onrender.com/getBookImage?bookId=${book._id}`
          );
          images[book._id] = res.data.data || [];
        } catch {
          images[book._id] = [];
        }
      }

      setBookImages(images);
    };

    if (books.length > 0) {
      fetchImages();
    }
  }, [books]);

  const filteredBooks = filter
    ? books.filter(book => book.status.toLowerCase() === filter.toLowerCase())
    : books;

  return (
    <div className="removed-books-container">
      <div className="header-row">
        <h2>Sold/Bought Books</h2>
        <div className="filter-select">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="">-- All --</option>
            <option value="Sold">Sold</option>
            <option value="Bought">Bought</option>
          </select>
        </div>
        <button className="home-button" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>

      {msg && <p className="error-message">{msg}</p>}
      {filteredBooks.length > 0 ? (
        <ul className="book-list">
          {filteredBooks.map((book) => (
            <li key={book._id} className="book-card">
              <h3>{book.title}</h3>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Price:</strong> ₹{book.price}</p>
              <p>
                <strong>Status:</strong>{' '}
                <span className={`status ${book.status.toLowerCase()}`}>
                  {book.status}
                </span>
              </p>

              {bookImages[book._id] && bookImages[book._id].length > 0 && (
                <div className="images">
                  <strong>Images:</strong><br />
                  {bookImages[book._id].map((img, index) => (
                    <img key={index} src={img} alt="book" />
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : !msg && <p>Loading...</p>}
    </div>
  );
};

export default ShowRemovedBooks;