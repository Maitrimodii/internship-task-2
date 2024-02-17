// UserDetails.js
import React from 'react';
import './userDetails.css';

const UserDetails = ({ user }) => {
  const handleImageError = (event) => {
    event.target.src = "/user.jpg"; 
  };  

  return (
    <div className='user-details-container'>
      {user ? (
        <>
          <div className="user-image">
            <img 
              src={user.avatar} 
              onError={handleImageError}
              alt={`${user.profile.firstName} ${user.profile.lastName}`}
              className='rounded-img'
            />
          </div>
          <div className="user-info">
            <h2>{user.profile.firstName} {user.profile.lastName}</h2>
            <div className='users-other'>
              <div className="table-row">
                <div className="title">Username:</div>
                <div className="value">{user.profile.username}</div>
              </div>
              <div className="table-row">
                <div className="title">Email:</div>
                <div className="value">{user.profile.email}</div>
              </div>
              <div className="table-row">
                <div className="title">Job Title:</div>
                <div className="value">{user.jobTitle}</div>
              </div>
              <div className="table-row">
                <div className="title">Bio:</div>
                <div className="value">{user.Bio}</div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="user-info">
          <h2>No user selected</h2>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
