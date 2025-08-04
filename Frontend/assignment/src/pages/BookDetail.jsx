import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './css/BookDetail.css';

const BookDetail = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [message, setMessage] = useState('');
  const [currentUserId, setCurrentUserId] = useState('');
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setCurrentUserId(payload.id);
      } catch (e) {
        console.error("Invalid token");
      }
    }

    const fetchBook = async () => {
      try {
        const res = await axios.get(`https://projects-5epb.onrender.com/getBook?bookId=${bookId}`);
        if (res.data.data && res.data.data.length > 0) {
          setBook(res.data.data[0]);
        } else {
          setMessage("Book not found");
        }
      } catch (err) {
        setMessage(err.response?.data?.message || 'Failed to load book details');
      }
    };

    if (bookId) fetchBook();
  }, [bookId, token]);

  const deleteBook = async () => {
    try {
      await axios.post(
        `https://projects-5epb.onrender.com/deleteBook?bookId=${book._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Book deleted successfully');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete book');
    }
  };

  if (message) return <p className="book-message">{message}</p>;
  if (!book) return <p className="book-message">Loading...</p>;

  const isOwner = book.owner?._id === currentUserId;

  // ✅ Get last request by current user if any
  const userRequests = book.requests?.filter(req => req.user?._id === currentUserId) || [];
  const userRequest = userRequests.length > 0 ? userRequests[userRequests.length - 1] : null;

  return (
    <div className="book-detail-container">
      <div className="top-bar">
        <h2>{book.title}</h2>
        <Link to="/" className="back-button">Back to Home</Link>
      </div>

      <img
        src={`https://projects-5epb.onrender.com/getBookImage?bookId=${book._id}`}
        alt={book.title}
        className="book-detail-image"
        onError={(e) => (e.target.style.display = 'none')}
      />
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Condition:</strong> {book.condition}</p>
      <p><strong>Original Price:</strong> ₹{book.originalPrice}</p>
      <p><strong>Selling Price:</strong> ₹{book.price}</p>
      <p><strong>Owner:</strong> {book.owner?.username}</p>

      <div className="action-buttons">
        {isOwner ? (
          <>
            <span className="status-text owner">Your Book</span><br />
            <button onClick={() => navigate(`/updateBook/${book._id}`)} className="update-button">
              Update
            </button>
            <button onClick={deleteBook} className="delete-button">
              Delete
            </button>
          </>
        ) : (
          <>
            {!userRequest && (
              <Link to={`/request/${book._id}`}>
                <button className="buy-button">Buy</button>
              </Link>
            )}

            {userRequest?.status === 'pending' && (
              <span className="status-text pending">Already Requested</span>
            )}

            {userRequest?.status === 'accepted' && (
              <span className="status-text accepted">Request Accepted</span>
            )}

            {userRequest?.status === 'declined' && (
              <Link to={`/request/${book._id}`}>
                <button className="buy-button">Re-request</button>
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BookDetail;