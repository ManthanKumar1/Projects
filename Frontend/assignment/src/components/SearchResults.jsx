import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './SearchResults.css';

const SearchResults = () => {
    const [books, setBooks] = useState([]);
    const [msg, setMsg] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const query = new URLSearchParams(location.search).get('q');

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const res = await axios.get(`https://projects-5epb.onrender.com/searchBook?q=${query}`);
                setBooks(res.data.data);
            } catch (error) {
                setMsg(error.response?.data?.message || 'Search failed');
            }
        };

        if (query) fetchSearchResults();
    }, [query]);

    return (
        <div className="search-results">
            <h2>Search Results for: "{query}"</h2>
            {msg && <p>{msg}</p>}
            {books.length === 0 && !msg && <p>No books found.</p>}
            <ul className="book-list">
                {books.map(book => (
                    <li key={book._id} className="book-item" onClick={() => navigate(`/book/${book._id}`)}>
                        <div className="book-card">
                            <h3>{book.title}</h3>
                            <p><strong>Author:</strong> {book.author}</p>
                            <p><strong>Price:</strong> ₹{book.price}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchResults;