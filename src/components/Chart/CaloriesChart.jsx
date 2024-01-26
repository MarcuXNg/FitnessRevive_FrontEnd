import React from 'react';
import Chart from 'react-apexcharts';
import PropTypes from 'prop-types';

const CaloriesChart = ({percent, calories}) => {
  const options = {
    chart: {
      height: 350,
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '70%',
        },
      },
    },
    labels: [`${calories} remaining`],
  };

  const series = [percent];

  return (
    <Chart
      options={options}
      series={series}
      type="radialBar"
      height={350}
    />
  );
};

CaloriesChart.propTypes = {
  percent: PropTypes.number.isRequired, // Assuming percent should be a number and is required
  calories: PropTypes.number.isRequired,
};

export default CaloriesChart;
