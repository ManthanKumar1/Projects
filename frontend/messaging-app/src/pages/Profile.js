import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Profile() {
    const [user, setUser] = useState(null);
    const [uuid, setUuid] = useState("190f7b91-8af0-11ef-be15-e4e7490f61c4"); // Set this to your user uuid
    const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
    const [formData, setFormData] = useState({
        user_name: '',
        email: '',
        phone: '',
        password: '',
        role: ''
    });

    useEffect(() => {
        // Fetch user details on component mount
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/getUser?uuid=${uuid}`);
                if (response.data.status) {
                    setUser(response.data.data);
                    setFormData(response.data.data); // Set form data for editing
                } else {
                    console.error("Failed to fetch user data:", response.data.message);
                    alert("Failed to fetch user details");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                alert("Error fetching user data");
            }
        };
        fetchUserDetails();
    }, [uuid]);

    const handleUpdate = async (event) => {
        event.preventDefault(); // Prevent default form submission

        try {
            const response = await axios.post(`http://localhost:3000/updateUser/${uuid}`, formData);
            if (response.data.status) {
                alert("User updated successfully!");
                setIsEditing(false); // Exit editing mode

                // Optionally, refetch user details to show updated data
                const userResponse = await axios.get(`http://localhost:3000/getUser?uuid=${uuid}`);
                if (userResponse.data.status) {
                    setUser(userResponse.data.data);
                }
            } else {
                console.error("Error updating user:", response.data.message);
                alert("Error updating user: " + response.data.message);
            }
        } catch (error) {
            console.error("Error updating user:", error);
            alert("Error updating user!");
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:3000/deleteUser/${uuid}`);
            if (response.data.status) {
                alert("User deleted successfully!");
                // Optionally, reset the user state or redirect to another page
                setUser(null);
            } else {
                console.error("Error deleting user:", response.data.message);
                alert("Error deleting user: " + response.data.message);
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Error deleting user!");
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div>
            <h2>Your Profile Page</h2>
            {user ? (
                <div>
                    {isEditing ? (
                        <form onSubmit={handleUpdate}>
                            <div>
                                <label>
                                    Name:
                                    <input
                                        type="text"
                                        name="user_name"
                                        value={formData.user_name}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Email:
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Phone:
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Password:
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Role:
                                    <input
                                        type="text"
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                            </div>
                            <button type="submit">Update User</button>
                            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                        </form>
                    ) : (
                        <div>
                            <p><strong>Name:</strong> {user.user_name}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Phone:</strong> {user.phone}</p>
                            <p><strong>Role:</strong> {user.role}</p>
                            <button onClick={() => setIsEditing(true)}>Edit User</button>
                            <button onClick={handleDelete}>Delete User</button>
                        </div>
                    )}
                </div>
            ) : (
                <p>Loading user details...</p>
            )}
        </div>
    );
}
