import { Routes, Route, Link } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import AddBook from './pages/AddBook';
import RequestBook from './pages/RequestBook';
import ManageRequests from './pages/ManageRequests';
import ShowRemovedBooks from './pages/ShowRemovedBooks';

function App() {
  return (
    <>
      <nav>
        <Link to="/signup">Signup</Link> | <Link to="/login">Login</Link> | <Link to="/removed-books">Sold/Bought Books</Link>
      </nav>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addbook" element={<AddBook />} />
        <Route path="/request/:bookId" element={<RequestBook />} />
        <Route path="/manage-requests" element={<ManageRequests />} />
        <Route path="/removed-books" element={<ShowRemovedBooks />} />
      </Routes>
    </>
  );
}

export default App;