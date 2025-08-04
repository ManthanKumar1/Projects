import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './css/Home.css'

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
        {},
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
    <div className="home-container">
      <h2 className="home-heading">Books</h2>
      {msg && <p>{msg}</p>}
      <ul className="book-list">
        {books.map(book => {
          const isOwner = book.owner?._id === currentUserId;
          const userRequest = book.requests?.find(req => req.user?._id === currentUserId);
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

              <div
                className="book-actions"
                onClick={(e) => e.stopPropagation()}
              >
                {!isOwner ? (
                  <>
                    {(!userRequest || userRequest.status === 'declined') && (
                      <Link to={`/request/${book._id}`}>
                        <button className="buy-button">
                          {userRequest ? 'Re-request' : 'Buy'}
                        </button>
                      </Link>
                    )}
                    {userRequest && userRequest.status === 'pending' && (
                      <span className="status-text pending">Already Requested</span>
                    )}
                    {userRequest && userRequest.status === 'accepted' && (
                      <span className="status-text accepted">Request Accepted</span>
                    )}
                    {userRequest && userRequest.status === 'declined' && (
                      <span className="status-text declined">Previously Declined</span>
                    )}
                  </>
                ) : (
                  <>
                    <span className="status-text owner">Your Book</span><br />
                    <button
                      onClick={() => navigate(`/updateBook/${book._id}`)}
                      className="update-button"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => deleteBook(book._id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;