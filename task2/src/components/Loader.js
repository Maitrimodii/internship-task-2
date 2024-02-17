import React from 'react'
import '../pages/userPage.css'

const Loader = () => {
  return (
    <div className="loader-container">
      <img src="Spinner.svg" alt="Loading spinner" className="spinner-img" />
    </div>
  )
}

export default Loader