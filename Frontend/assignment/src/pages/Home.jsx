import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [msg, setMsg] = useState('');
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
        const res = await axios.get('https://projects-5epb.onrender.com/getBook');
        setBooks(res.data.data);
      } catch (error) {
        setMsg(error.response?.data?.message || 'Failed to fetch books');
      }
    };

    fetchBooks();
  }, [token]);

  const deleteBook = async (bookId) => {
    try {
      await axios.post(
        `https://projects-5epb.onrender.com/deleteBook?bookId=${bookId}`,
        {}, // Empty body
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Book deleted successfully");
      setBooks(books.filter(book => book._id !== bookId));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete book");
    }
  };

  return (
    <div>
      <h2>Books</h2>
      {msg && <p>{msg}</p>}
      <ul>
        {books.map(book => {
          const isOwner = book.owner?._id === currentUserId;
          const userRequest = book.requests?.find(req => req.user?._id === currentUserId);

          return (
            <li key={book._id} style={{ marginBottom: '20px' }}>
              <strong>{book.title}</strong> by {book.author} — ₹{book.price} <br />
              Owner: {book.owner?.username || 'N/A'} <br />

              {!isOwner && (
                <>
                  {(!userRequest || userRequest.status === 'declined') && (
                    <Link to={`/request/${book._id}`}>
                      <button>{userRequest ? 'Re-request' : 'Buy'}</button>
                    </Link>
                  )}
                  {userRequest && userRequest.status === 'pending' && (
                    <span style={{ color: 'orange' }}>Already Requested</span>
                  )}
                  {userRequest && userRequest.status === 'accepted' && (
                    <span style={{ color: 'green' }}>Request Accepted</span>
                  )}
                  {userRequest && userRequest.status === 'declined' && (
                    <span style={{ color: 'red', marginLeft: '10px' }}>Previously Declined</span>
                  )}
                </>
              )}

              {isOwner && (
                <>
                  <span style={{ color: 'gray' }}>Your Book</span><br />
                  <button onClick={() => navigate(`/updateBook/${book._id}`)} style={{ marginRight: '10px' }}>
                    Update
                  </button>
                  <button onClick={() => deleteBook(book._id)} style={{ color: 'red' }}>
                    Delete
                  </button>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;