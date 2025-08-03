import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageRequests = () => {
  const [books, setBooks] = useState([]);
  const [msg, setMsg] = useState('');
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    const fetchOwnerBooks = async () => {
      try {
        const jwt = JSON.parse(atob(token.split('.')[1]));
        const ownerId = jwt.id;

        const res = await axios.get(`https://projects-5epb.onrender.com/getBook?owner=${ownerId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setBooks(res.data.data);
      } catch (err) {
        setMsg(err.response?.data?.message || 'Error fetching books');
      }
    };

    if (token) fetchOwnerBooks();
  }, [token]);

  const updateRequest = async (bookId, requestId, status) => {
    try {
      const res = await axios.post(
        `https://projects-5epb.onrender.com/updateRequestStatus?bookId=${bookId}&requestId=${requestId}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert(res.data.message);
      window.location.reload(); // reload to reflect status change
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update status');
    }
  };

  return (
    <div>
      <h2>Manage Book Requests</h2>
      {msg && <p>{msg}</p>}

      {books.map(book => (
        <div key={book._id} style={{ border: '1px solid #ccc', margin: '20px', padding: '15px' }}>
          <h3>{book.title} by {book.author}</h3>
          <p>Price: ₹{book.price}</p>
          <p>Condition: {book.condition}</p>
          <h4>Requests:</h4>

          {book.requests.length === 0 && <p>No requests yet.</p>}

          <ul>
            {/* Filter unique user requests by user._id */}
            {[...new Map(book.requests.map(req => [req.user?._id, req])).values()].map(request => (
              <li key={request._id} style={{ marginBottom: '10px' }}>
                <strong>User:</strong> {request.user?.username || 'Unknown'}<br />
                <strong>Status:</strong>{' '}
                {request.status === 'accepted'
                  ? '✅ Accepted'
                  : request.status === 'declined'
                  ? '❌ Declined'
                  : '⏳ Not approved yet'}<br />

                {request.status !== 'accepted' && request.status !== 'declined' && (
                  <>
                    <button
                      onClick={() => updateRequest(book._id, request._id, 'accepted')}
                      style={{ marginRight: '10px' }}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => updateRequest(book._id, request._id, 'declined')}
                    >
                      Decline
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ManageRequests;