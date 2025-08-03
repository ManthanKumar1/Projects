import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const RequestBook = () => {
  const { bookId } = useParams(); // bookId from URL
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    const requestBook = async () => {
      try {
        const res = await axios.post(
          `https://projects-5epb.onrender.com/requestBook?bookId=${bookId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessage(res.data.message);
        // Redirect to home after 2 seconds
        setTimeout(() => navigate('/home'), 2000);
      } catch (err) {
        setMessage(err.response?.data?.message || 'Something went wrong');
      }
    };

    if (bookId) {
      requestBook();
    } else {
      setMessage("No book ID provided");
    }
  }, [bookId, token, navigate]);

  return (
    <div>
      <h2>Requesting Book...</h2>
      <p>{message}</p>
    </div>
  );
};

export default RequestBook;