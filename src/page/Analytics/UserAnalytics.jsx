import React, {useEffect} from 'react';
import Chart from 'react-apexcharts';

const UserAnalytics = () => {
  const Top5MealsChart = () => {
    const options = {
      // ApexCharts options go here
      chart: {
        type: 'bar',
      },
      xaxis: {
        title: {
          text: 'Month',
        },
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      },
      yaxis: {
        title: {
          text: 'Products',
        },
      },
    };
    const series = [
      {
        name: 'Sales',
        data: [30, 40, 45, 50, 49, 60, 70],
      },
      {
        name: 'Revenue',
        data: [76, 85, 101, 98, 87, 105, 91],
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
  const CaloriesChart = () => {
    const options = {
      // ApexCharts options go here
      chart: {
        type: 'area',
      },
      xaxis: {
        title: {
          text: 'Month',
        },
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
      yaxis: {
        title: {
          text: 'Kcal',
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 90, 100],
        },
      },
    };
    const series = [
      {
        name: 'Calories in',
        data: [30, 140, 45, 450, 849, 160, 1070, 30, 140, 45, 450, 849],
      },
      {
        name: 'Calories out',
        data: [160, 640, 945, 350, 149, 460, 570, 160, 640, 945, 350, 149],
      },
    ];
    return (
      <Chart
        options={options}
        series={series}
        type="area"
        height={350}
      />
    );
  };
  const WeightChart = () => {
    const options = {
      // ApexCharts options go here
      chart: {
        type: 'bar',
      },
      xaxis: {
        title: {
          text: 'Month',
        },
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
      yaxis: {
        title: {
          text: 'Kg',
        },
      },
    };
    const series = [
      {
        name: 'Weight',
        data: [100, 110, 95, 92, 89, 90, 88, 85, 82, 80, 79, 81],
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
  const WaterDrinkChart = () => {
    const options = {
      // ApexCharts options go here
      chart: {
        type: 'bar',
      },
      xaxis: {
        title: {
          text: 'Month',
        },
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
      yaxis: {
        title: {
          text: 'mL',
        },
      },
    };
    const series = [
      {
        name: 'Water drink',
        data: [1300, 1440, 1645, 1550, 1149, 1560, 1470, 2000, 2500, 1600, 1400, 1500],
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
            <Top5MealsChart />
            <div id="bar-chart"></div>
          </div>

          <div className="charts-card">
            <h2 className="chart-title">Calories</h2>
            <CaloriesChart />
            <div id="area-chart"></div>
          </div>
        </div>
        {/* <!-- weight and Amount of drinking water --> */}
        <div className="charts">
          <div className="charts-card">
            <h2 className="chart-title">Weight</h2>
            <WeightChart />
            <div id="bar-chart1"></div>
          </div>
          <div className="charts-card">
            <h2 className="chart-title">Amount of drinking water</h2>
            <WaterDrinkChart />
            <div id="bar-chart2"></div>
          </div>
        </div>
      </main>

    </div>
  );
};

export default UserAnalytics;
