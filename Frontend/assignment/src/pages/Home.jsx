import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/Home.css';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [msg, setMsg] = useState('');
  const [sort, setSort] = useState('');
  const [currentUserId, setCurrentUserId] = useState('');
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setCurrentUserId(payload.id);
    }

    const fetchBooks = async () => {
      try {
        const res = await axios.get(`https://projects-5epb.onrender.com/filterBooks${sort ? `?sort=${sort}` : ''}`);
        setBooks(res.data.data);
      } catch (error) {
        setMsg(error.response?.data?.message || 'Failed to fetch books');
      }
    };

    fetchBooks();
  }, [token, sort]);

  return (
    <div className="home-container">
      <div className="home-header">
        <h2 className="home-heading">Books</h2>
        <select
          className="sort-dropdown"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">-- Sort by Price --</option>
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
        </select>
      </div>

      {msg && <p>{msg}</p>}

      <ul className="book-list">
        {books.map(book => {
          const imageUrl = `https://projects-5epb.onrender.com/getBookImage?bookId=${book._id}`;

          return (
            <li
              key={book._id}
              className="book-card"
              onClick={() => navigate(`/book/${book._id}`)}
            >
              <img
                src={imageUrl}
                alt={`${book.title}`}
                onError={(e) => (e.target.style.display = 'none')}
              />

              <div className="book-info">
                <strong>{book.title}</strong> by {book.author} — ₹{book.price} <br />
                Owner: {book.owner?.username || 'N/A'}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;