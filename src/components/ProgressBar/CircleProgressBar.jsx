// CircleProgressBar.js
import React from 'react';
import PropTypes from 'prop-types';

const CircleProgressBar = ({percent, color}) => {
  const radius = 45; // Radius of the circle
  const circumference = 2 * Math.PI * radius; // Circumference of the circle (chu vi hình tròn)

  // Calculate the stroke-dashoffset based on the percentage
  const dashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative">
      <svg className="w-28 h-28">
        <circle
          className={`stroke-current ${color}`}
          strokeWidth="11"
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx="50%"
          cy="50%"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: dashoffset,
            transform: 'rotate(-90deg)', // Rotate the circle to start from the top
            transformOrigin: '50% 50%',
          }}
        />
      </svg>
      <div className= {`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center ${color}`}>
        <span className="text-lg font-semibold">+{`${percent}%`}</span>
      </div>
    </div>
  );
};

CircleProgressBar.propTypes = {
  percent: PropTypes.number.isRequired, // Assuming percent should be a number and is required
  color: PropTypes.string.isRequired,
};

export default CircleProgressBar;
