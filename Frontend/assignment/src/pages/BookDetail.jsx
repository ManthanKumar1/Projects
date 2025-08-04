import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './css/BookDetail.css'; // ✅ Add this line

const BookDetail = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [message, setMessage] = useState('');
  const token = sessionStorage.getItem('token');

  useEffect(() => {
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
  }, [bookId]);

  if (message) return <p className="book-message">{message}</p>;
  if (!book) return <p className="book-message">Loading...</p>;

  return (
    <div className="book-detail-container">
      <h2>{book.title}</h2>
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

      {book.requests?.length > 0 && (
        <>
          <h4>Requests:</h4>
          <ul className="request-list">
            {book.requests.map((req, index) => (
              <li key={index}>
                {req.user?.username} - <em>{req.status}</em>
              </li>
            ))}
          </ul>
        </>
      )}

      <Link to="/" className="back-button">
        Back to Home
      </Link>
    </div>
  );
};

export default BookDetail;