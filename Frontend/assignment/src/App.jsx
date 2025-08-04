// App.jsx
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import AddBook from './pages/AddBook';
import RequestBook from './pages/RequestBook';
import ManageRequests from './pages/ManageRequests';
import ShowRemovedBooks from './pages/ShowRemovedBooks';
import UpdateBook from './pages/UpdateBook';
import BookDetail from './pages/BookDetail';
import SearchResults from './components/SearchResults';
import UserProfile from './pages/UserProfile';

import PublicNavbar from './components/PublicNavbar';
import PrivateNavbar from './components/PrivateNavbar';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('token'));

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      {isLoggedIn ? (
        <PrivateNavbar onLogout={handleLogout} />
      ) : (
        <PublicNavbar />
      )}

      <Routes>
        <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addbook" element={<AddBook />} />
        <Route path="/request/:bookId" element={<RequestBook />} />
        <Route path="/manage-requests" element={<ManageRequests />} />
        <Route path="/sold-bought-books" element={<ShowRemovedBooks />} />
        <Route path="/updateBook/:bookId" element={<UpdateBook />} />
        <Route path="/book/:bookId" element={<BookDetail />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </>
  );
}

export default App;