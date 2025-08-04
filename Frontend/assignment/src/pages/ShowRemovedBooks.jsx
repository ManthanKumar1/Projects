import { useEffect, useState } from 'react';
import axios from 'axios';
import './css/ShowRemovedBooks.css';

const ShowRemovedBooks = () => {
  const [books, setBooks] = useState([]);
  const [msg, setMsg] = useState('');
  const [currentUserId, setCurrentUserId] = useState('');
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setCurrentUserId(payload.id);
      } catch (err) {
        console.error('Invalid token:', err);
      }
    }
  }, [token]);

  useEffect(() => {
    const fetchRemovedBooks = async () => {
      try {
        const res = await axios.get('https://projects-5epb.onrender.com/showRemove', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBooks(res.data.data);
      } catch (err) {
        setMsg(err.response?.data?.message || 'Error fetching removed books');
      }
    };

    if (token) fetchRemovedBooks();
  }, [token]);

  return (
    <div className="removed-books-container">
      <h2>Sold/Bought Books</h2>
      {msg && <p>{msg}</p>}
      {books.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {books.map(book => {
            const isSeller = book.owner?._id === currentUserId;

            console.log("Book:", book.title, "Owner:", book.owner?._id, "CurrentUser:", currentUserId);

            const statusClass = isSeller ? 'Sold' : 'Bought';

            return (
              <li key={book._id} className="book-card">
                <h3>{book.title}</h3>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Price:</strong> ₹{book.price}</p>
                <p>
                  <strong>Status:</strong>{' '}
                  <span className={`status ${statusClass}`}>
                    {isSeller ? 'Sold' : 'Bought'}
                  </span>
                </p>

                {book.image && book.image.length > 0 && (
                  <div className="images">
                    <strong>Images:</strong><br />
                    {book.image.map((img, index) => (
                      <img key={index} src={img} alt="book" />
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      ) : !msg && <p>Loading...</p>}
    </div>
  );
};

export default ShowRemovedBooks;