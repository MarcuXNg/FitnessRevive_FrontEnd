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
          <div>
            <h2>Report</h2>
            <div className='columns-1'>
              <input type="email" placeholder='your email' className='rounded-[10px] mb-2'/>
              <input type='text'placeholder='Write your report here' className='rounded-[10px]'/>
            </div>
            <p>We are appreciated to here from you.</p>
          </div>
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
