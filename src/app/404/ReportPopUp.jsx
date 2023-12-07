import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

const ReportPopUp = ({isOpen, onClose}) => {
  return (
    isOpen && (
      <div className="popup-container">
        <div className="popup-content">
          <span className="close-btn" onClick={onClose}>
            &times;
          </span>
          <h2>This is a Popup</h2>
          <input type="email" />
          <p>Popup content goes here.</p>
        </div>
      </div>
    )
  );
};

// PropTypes for type validation
ReportPopUp.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ReportPopUp;
