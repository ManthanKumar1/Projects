import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [msg, setMsg] = useState('');
  const [currentUserId, setCurrentUserId] = useState('');

  useEffect(() => {
    // Get user ID from token payload
    const token = sessionStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setCurrentUserId(payload.id);
    }

    const fetchBooks = async () => {
      try {
        const res = await axios.get('https://projects-5epb.onrender.com/getBook');
        setBooks(res.data.data);
      } catch (error) {
        setMsg(error.response?.data?.message || 'Failed to fetch books');
      }
    };
    fetchBooks();
  }, []);

  return (
    <div>
      <h2>Books</h2>
      {msg && <p>{msg}</p>}
      <ul>
        {books.map(book => {
          const isOwner = book.owner?._id === currentUserId;
          const alreadyRequested = book.requests?.some(req => req.user?._id === currentUserId);

          return (
            <li key={book._id} style={{ marginBottom: '20px' }}>
              <strong>{book.title}</strong> by {book.author} — ₹{book.price} <br />
              Owner: {book.owner?.username || 'N/A'} <br />
              
              {!isOwner && !alreadyRequested && (
                <Link to={`/request/${book._id}`}>
                  <button>Buy</button>
                </Link>
              )}

              {isOwner && <span style={{ color: 'gray' }}>Your Book</span>}
              {alreadyRequested && !isOwner && <span style={{ color: 'orange' }}>Already Requested</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;