import React, {useEffect} from 'react';
import Chart from 'react-apexcharts';

const Admin = () => {
  const MyChart = () => {
    const options = {
      // ApexCharts options go here
      chart: {
        type: 'bar',
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      },
    };
    const series = [
      {
        name: 'Sales',
        data: [30, 40, 45, 50, 49, 60, 70],
      },
    ];
    return (
      <Chart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    );
  };
  useEffect(() => {
    document.title = 'Dashboard';
  }, []);
  return (
    <div className="grid-container">
      <main className="main-container">
        <div className="main-title">
          <h2>DASHBOARD</h2>
        </div>
        <div className="main-cards">
          <div className="card">
            <div className="card-inner">
              <h3>Active Users</h3>
              <span className="material-icons-outlined">groups</span>
            </div>
            <h1>27/80</h1>
          </div>
          <div className="card">
            <div className="card-inner">
              <h3>Exercises</h3>
              <span className="material-icons-outlined">category</span>
            </div>
            <h1>25</h1>
          </div>
          <div className="card">
            <div className="card-inner">
              <h3>Steps</h3>
              <span className="material-icons-outlined">fitness_center</span>
            </div>
            <h1>1500</h1>
          </div>
          <div className="card">
            <div className="card-inner">
              <h3>ALERTS</h3>
              <span className="material-icons-outlined">notification_important</span>
            </div>
            <h1>56</h1>
          </div>
        </div>
        <div className="charts">
          {/* <!-- Top 5 meals and Calories --> */}
          <div className="charts-card">
            <h2 className="chart-title">Top 5 meals</h2>
            <MyChart />
            <div id="bar-chart"></div>
          </div>

          <div className="charts-card">
            <h2 className="chart-title">Calories</h2>
            <div id="area-chart"></div>
          </div>
        </div>
        {/* <!-- weight and Amount of drinking water --> */}
        <div className="charts">
          <div className="charts-card">
            <h2 className="chart-title">Weight</h2>
            <div id="bar-chart1"></div>
          </div>
          <div className="charts-card">
            <h2 className="chart-title">Amount of drinking water</h2>
            <div id="bar-chart2"></div>
          </div>
        </div>
      </main>


    </div>

  );
};

export default Admin;
