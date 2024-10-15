// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function Users() {
//     const [users, setUsers] = useState([]);
//     const [apiResponse, setApiResponse] = useState(null); // New state to store the API response

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3000/getUser')
//                 setApiResponse(response.data)
//                 console.log('API Response:', response.data)
//                 if (response.data && response.data.status) {
//                     setUsers(response.data.data)
//                 } else {
//                     console.error('Failed to fetch users:', response.data.message);
//                 }
//             } catch (error) {
//                 console.error('Error fetching users:', error);
//             }
//         };

//         fetchUsers();
//     }, []);

//     return (
//         <div>
//             <h1>All Users</h1>
//             <ul>
//                 {users.length > 0 ? (
//                     users.map(user => (
//                         <li key={user.uuid}>
//                             {user.user_name} - {user.email} - {user.phone} - {user.role}
//                         </li>
//                     ))
//                 ) : (
//                     <li>No users found</li>
//                 )}
//             </ul>
//         </div>
//     );
// }

import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Users() {
    const [users, setUsers] = useState([]);
    const [apiResponse, setApiResponse] = useState(null); // State to store the API response
    const [message, setMessage] = useState(""); // State to hold the message to be sent
    const [senderUuid, setSenderUuid] = useState("your-sender-uuid"); // Replace with actual sender UUID
    const [receiverUuid, setReceiverUuid] = useState(""); // State to hold the receiver UUID
    const [messages, setMessages] = useState([]); // State to store viewed messages

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/getUser');
                setApiResponse(response.data);
                console.log('API Response:', response.data);
                if (response.data && response.data.status) {
                    setUsers(response.data.data);
                } else {
                    console.error('Failed to fetch users:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleSendMessage = async () => {
        try {
            const response = await axios.post('http://localhost:3000/sendMessage', {
                sender_uuid: senderUuid,
                receiver_uuid: receiverUuid,
                message: message
            });
            alert(response.data.message); // Alert the user about the send message status
            setMessage(""); // Clear the message input
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Error sending message!');
        }
    };

    const handleViewMessages = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/viewMessage?sender_uuid=${senderUuid}&receiver_uuid=${receiverUuid}`);
            setMessages(response.data.data); // Store the messages received
        } catch (error) {
            console.error('Error fetching messages:', error);
            alert('Error fetching messages!');
        }
    };

    return (
        <div>
            <h1>All Users</h1>
            <ul>
                {users.length > 0 ? (
                    users.map(user => (
                        <li key={user.uuid}>
                            {user.user_name} - {user.email} - {user.phone} - {user.role}
                            <div>
                                {/* Input for the receiver's UUID */}
                                <input
                                    type="text"
                                    placeholder="Receiver UUID"
                                    value={receiverUuid}
                                    onChange={(e) => setReceiverUuid(e.target.value)}
                                />
                                {/* Input for the message */}
                                <input
                                    type="text"
                                    placeholder="Message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                                <button onClick={handleSendMessage}>Send Message</button>
                                <button onClick={handleViewMessages}>View Messages</button>
                            </div>
                        </li>
                    ))
                ) : (
                    <li>No users found</li>
                )}
            </ul>

            {/* Display viewed messages */}
            {messages.length > 0 && (
                <div>
                    <h2>Messages</h2>
                    <ul>
                        {messages.map((msg, index) => (
                            <li key={index}>{msg.message}</li> // Adjust based on your message structure
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
