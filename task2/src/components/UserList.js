import React, { useState } from 'react';
import { GrPrevious, GrNext, GrSearch } from "react-icons/gr"; // Import icons from react-icons library
import './UserList.css';
import { Button, Form } from 'react-bootstrap';

const UserList = ({ users, onUserSelect}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const itemsPerPage = 6; 

  const handleImageError = (event) => {
    event.target.src = "/user.jpg"; 
  };  

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Filter users based on search term
  const filteredUsers = users.filter(user => {
    return user.profile.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           user.profile.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           user.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const handlePagination = (action) => {
    if(action === "prev" && currentPage > 1){
      setCurrentPage(currentPage - 1);
    }else if(action === "next" && indexOfLastItem < filteredUsers.length){
      setCurrentPage(currentPage + 1);
    }
  }

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setCurrentPage(1); 
    setSearchTerm(event.target.value);
  }

  return (
    <div className='user-list-container mx-auto'>
      <div className='heading'>
        <h2 className='title'>Users</h2>
        <div className="search-container">
          <Form.Control
            type="text" 
            value={searchTerm} 
            onChange={handleSearchChange} 
            placeholder="Search users..." 
            className="search-input" 
          />
        </div>
      </div>

      {currentUsers.length > 0 ? (
        <>
          {currentUsers.map((user) => (
            <div
             key={user.profile.email}
             className="user-card"
             onClick={() => onUserSelect(user)}
             > 
              <div className="user-card-body">
                <div className="user-images">
                  <img  
                    src={user.avatar} 
                    onError={handleImageError}
                    alt={`${user.profile.firstName} ${user.profile.lastName}`} 
                    className='rounded-img'
                  />
                </div>
                <div className="user-details">
                  <h5 className="user-name">{user.profile.firstName} {user.profile.lastName}</h5>
                  <p className="job_post">{user.jobTitle}</p>
                </div>
              </div>
            </div>
          ))}
          {currentUsers.length >= 4 && 
          <>
          {/* Pagination controls */}
          <div className="pagination">
            <Button onClick={() => handlePagination('prev')} disabled={currentPage === 1}><GrPrevious/></Button>
            <Button onClick={() => handlePagination('next')} disabled={indexOfLastItem >= filteredUsers.length }><GrNext/></Button>
          </div>
          </>
          }

        </>
      ) : (
        <div className='no-users-container'>
          <div className="no-users-found">No such users found.</div>
        </div>
      )}
      </div>
  );
};

export default UserList;
