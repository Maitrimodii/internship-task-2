import React, { useEffect, useState } from 'react';
import UserList from '../components/UserList';
import UserDetails from '../components/UserDetails';
import Loader from '../components/Loader';
import axios from 'axios';
import './userPage.css';

const UserPage = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://602e7c2c4410730017c50b9d.mockapi.io/users');
                setUsers(response.data);
                setLoading(false);
            } catch (error) {
                setError("An error occurred while fetching data");
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleUserSelect = (user) => {
        console.log(user);
        setSelectedUser(user);
    };

    return (
       <>
        {loading ? <Loader /> :
        <div className="user-page mx-auto">
            <div className="user-list">
                 <UserList users={users} onUserSelect={handleUserSelect} />
            </div>
            <div className="user-details">
                <UserDetails user={selectedUser}/>
            </div>
        </div>
        }
        </>
    );
};

export default UserPage;
