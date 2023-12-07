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
            <h2 className='text-[35px] font-poppins mt-3'>Report</h2>
            <div className='relative w-[500px] mb-2 mt-4 items-center'>
              <input type="email" placeholder='Your email' className='rounded-[10px] mb-2 font-poppins w-96'/>
              <br/>
              <textarea
                placeholder='Write your report here'
                className='rounded-[10px] font-poppins mb-8 w-96 h-52'
              />
              <br/>
              <button className='bg-[#a1f65e] rounded-[10px] px-5 py-3 font-poppins font-medium hover:bg-[#85cf4c]'>Send</button>
            </div>
            <p className='font-poppins mb-3'>We are appreciated to hear from you.</p>
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
