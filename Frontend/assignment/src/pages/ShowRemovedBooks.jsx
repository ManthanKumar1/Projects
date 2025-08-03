import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ShowRemovedBooks = () => {
  const [books, setBooks] = useState([]);
  const [msg, setMsg] = useState('');
  const token = sessionStorage.getItem('token');

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
    <div>
      <h2>Removed Books</h2>
      {msg && <p>{msg}</p>}
      {books.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {books.map(book => (
            <li key={book._id} style={{ border: '1px solid #ccc', margin: '10px 0', padding: '10px' }}>
              <h3>{book.title}</h3>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Price:</strong> ₹{book.price}</p>
              <p><strong>Status:</strong> {book.status}</p>
              {book.image && book.image.length > 0 && (
                <div>
                  <strong>Images:</strong><br />
                  {book.image.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt="book"
                      style={{ width: '100px', height: 'auto', marginRight: '10px' }}
                    />
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