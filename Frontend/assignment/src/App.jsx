import { Routes, Route, Link } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import AddBook from './pages/AddBook';
import RequestBook from './pages/RequestBook';
import ManageRequests from './pages/ManageRequests';

function App() {
  return (
    <>
      <nav>
        <Link to="/signup">Signup</Link> | <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addbook" element={<AddBook />} />
        <Route path="/request/:bookId" element={<RequestBook />} />
        <Route path="/manage-requests" element={<ManageRequests />} />
      </Routes>
    </>
  );
}

export default App;