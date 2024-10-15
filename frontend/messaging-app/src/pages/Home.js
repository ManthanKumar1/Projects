import React, { useState } from 'react';
import axios from 'axios';

export default function Home() {
    // Ensure state property name matches the input field
    const [registerData, setRegisterData] = useState({ user_name: '', email: '', phone: '', password: '', role: '' });
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');

    // Handle registration form change
    const handleRegisterChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    };

    // Handle login form change
    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    // Handle registration form submission
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/createUser', registerData);
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data.message || 'Error occurred');
        }
    };

    // Handle login form submission
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/loginUser', loginData);
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data.message || 'Error occurred');
        }
    };

    return (
        <div className="container">
            <h1>Welcome to the Home Page</h1>

            <div className="row">
                <div className="col-md-6">
                    <h2>Register</h2>
                    <form onSubmit={handleRegisterSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="user_name" // Use user_name here to match state
                                value={registerData.user_name} 
                                onChange={handleRegisterChange} 
                                required 
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                name="email" 
                                value={registerData.email} 
                                onChange={handleRegisterChange} 
                                required 
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Phone</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                name="phone" 
                                value={registerData.phone} 
                                onChange={handleRegisterChange} 
                                required 
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                name="password" 
                                value={registerData.password} 
                                onChange={handleRegisterChange} 
                                required 
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Role</label>
                            <select
                                className="form-control"
                                name="role"
                                value={registerData.role}
                                onChange={handleRegisterChange}
                                required
                            >
                                <option value="" disabled>Select Role</option>
                                <option value="Student">Student</option>
                                <option value="Teacher">Teacher</option>
                                <option value="Institute">Institute</option>
                            </select>
                        </div>

                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>
                </div>

                <div className="col-md-6">
                    <h2>Login</h2>
                    <form onSubmit={handleLoginSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                name="email" 
                                value={loginData.email} 
                                onChange={handleLoginChange} 
                                required 
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                name="password" 
                                value={loginData.password} 
                                onChange={handleLoginChange} 
                                required 
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>

            {message && <div className="alert alert-info mt-3">{message}</div>}
        </div>
    );
}
