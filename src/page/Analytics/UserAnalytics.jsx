/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import Chart from 'react-apexcharts';
import useInstance from '../../setup/instance';

const UserAnalytics = () => {
  const {instance, controller} = useInstance();
  const [waterData, setWaterData] = useState([]);
  const [weightData, setWeightData] = useState([]);
  const [weightMax, setWeightMax] = useState(0);
  const [caloriesMax, setCaloriesMax] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState([]);
  const [caloriesConsumed, setCaloriesConsumed] = useState([]);
  const [carb, setCarb] = useState([]);
  const [protein, setProtein] = useState([]);
  const [fat, setFat] = useState([]);
  const goal = (Number(((0.55 * (Number(caloriesMax))) / 4).toFixed(0)));
  const [waterMax, setWaterMax] = useState(0);
  const DataChart = () => {
    const options = {
      // ApexCharts options go here
      chart: {
        type: 'bar',
      },
      xaxis: {
        title: {
          text: 'Days of Week',
        },
        categories: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      },
      yaxis: {
        title: {
          text: 'gam',
        },
        min: 0, // Set the minimum value for the y-axis
        max: goal, // Set the maximum value for the y-axis
        // tickAmount: 20, // Set the number of ticks on the y-axis
      },
    };

    const transformedDataCarb = transformCarb();
    const transformedDataProtein = transformProtein();
    const transformedDataFat = transformFat();
    const series = [
      {
        name: 'Carb',
        data: Object.values(transformedDataCarb),
      },
      {
        name: 'Protein',
        data: Object.values(transformedDataProtein),
      },
      {
        name: 'Fat',
        data: Object.values(transformedDataFat),
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

  const transformDataCaloConsumed = () => {
    const result = {
      Sunday: 0,
      Monday: 0,
      Tuesday: 0,
      Wednesday: 0,
      Thursday: 0,
      Friday: 0,
      Saturday: 0,
    };

    caloriesConsumed.forEach((day) => {
      const logDate = new Date(day.log_date);
      const dayOfWeek = new Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(logDate);
      result[dayOfWeek] += day.calories_consumed_per_day;
    });

    return result;
  };

  const transformDataCaloBurned = () => {
    const result = {
      Sunday: 0,
      Monday: 0,
      Tuesday: 0,
      Wednesday: 0,
      Thursday: 0,
      Friday: 0,
      Saturday: 0,
    };

    caloriesBurned.forEach((day) => {
      const logDate = new Date(day.log_date);
      const dayOfWeek = new Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(logDate);
      result[dayOfWeek] += day.calories_burnt_per_day;
    });

    return result;
  };

  const transformFat = () => {
    const result = {
      Sunday: 0,
      Monday: 0,
      Tuesday: 0,
      Wednesday: 0,
      Thursday: 0,
      Friday: 0,
      Saturday: 0,
    };

    fat.forEach((day) => {
      const logDate = new Date(day.log_date);
      const dayOfWeek = new Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(logDate);
      result[dayOfWeek] += day.fat_consumed_per_day;
    });

    return result;
  };
  const transformCarb = () => {
    const result = {
      Sunday: 0,
      Monday: 0,
      Tuesday: 0,
      Wednesday: 0,
      Thursday: 0,
      Friday: 0,
      Saturday: 0,
    };

    carb.forEach((day) => {
      const logDate = new Date(day.log_date);
      const dayOfWeek = new Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(logDate);
      result[dayOfWeek] += day.carbs_consumed_per_day;
    });

    return result;
  };
  const transformProtein = () => {
    const result = {
      Sunday: 0,
      Monday: 0,
      Tuesday: 0,
      Wednesday: 0,
      Thursday: 0,
      Friday: 0,
      Saturday: 0,
    };

    protein.forEach((day) => {
      const logDate = new Date(day.log_date);
      const dayOfWeek = new Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(logDate);
      result[dayOfWeek] += day.protein_consumed_per_day;
    });

    return result;
  };

  const CaloriesChart = () => {
    const options = {
      // ApexCharts options go here
      chart: {
        type: 'area',
      },
      xaxis: {
        title: {
          text: 'Days of Week',
        },
        categories: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      },
      yaxis: {
        title: {
          text: 'Cal',
        },
        min: 0, // Set the minimum value for the y-axis
        max: caloriesMax, // Set the maximum value for the y-axis
        // tickAmount: 6, // Set the number of ticks on the y-axis
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
    const transformedDataConsumed = transformDataCaloConsumed();
    const transformedDataBurned = transformDataCaloBurned();

    const series = [
      {
        name: 'Calories consumed',
        data: Object.values(transformedDataConsumed),
      },
      {
        name: 'Calories burned',
        data: Object.values(transformedDataBurned),
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
        min: 0, // Set the minimum value for the y-axis
        max: weightMax, // Set the maximum value for the y-axis
        // tickAmount: 6, // Set the number of ticks on the y-axis
      },
    };
    const transformedData = transformDataByMonth(weightData);
    const series = [
      {
        name: 'Weight',
        data: Object.values(transformedData),
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
          text: 'Days of week',
        },
        categories: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      },
      yaxis: {
        title: {
          text: 'mL',
        },
        min: 0, // Set the minimum value for the y-axis
        max: Number((waterMax * 1000).toFixed(0)), // Set the maximum value for the y-axis
      },
    };
    const series = [
      {
        name: 'Water drink',
        data: Object.values(transformDataByDay()),
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


  const date = new Date();
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const transformDataByDay = () => {
    const result = {
      Sunday: 0,
      Monday: 0,
      Tuesday: 0,
      Wednesday: 0,
      Thursday: 0,
      Friday: 0,
      Saturday: 0,
    };

    waterData.forEach((day) => {
      const logDate = new Date(day.log_date);
      const dayOfWeek = new Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(logDate);
      result[dayOfWeek] += day.water_drink_per_day;
    });

    return result;
  };

  const transformDataByMonth = (weightData) => {
    const result = {
      Jan: 0,
      Feb: 0,
      Mar: 0,
      Apr: 0,
      May: 0,
      Jun: 0,
      Jul: 0,
      Aug: 0,
      Sep: 0,
      Oct: 0,
      Nov: 0,
      Dec: 0,
    };

    weightData.forEach((day) => {
      const logDate = new Date(day.log_date);
      const month = new Intl.DateTimeFormat('en-US', {month: 'short'}).format(logDate);
      result[month] += day.weight_per_day;
    });

    return result;
  };

  const getWaterWeek = async (date) => {
    try {
      const res = await instance.get(`/user/water/consumed/week/${date}`);
      if (res && res.data && res.data.EC === 0) {
        // console.log(res.data.DT);
        setWaterData(res.data.DT);
      } else {
        console.log(res.data.EM);
      }
    } catch (error) {
      console.log(error);
    } finally {
      controller.abort();
    }
  };
  const getWeightByMonth = async (date) => {
    try {
      const res = await instance.get(`/user/weight/month/${date}`);
      if (res && res.data && res.data.EC === 0) {
        // console.log(res.data.DT);
        setWeightData(res.data.DT);
      } else {
        console.log(res.data.EM);
      }
    } catch (error) {
      console.log(error);
    } finally {
      controller.abort();
    }
  };

  const getGoal = async () => {
    try {
      const res = await instance.get(`/users/goal/get`);
      if (res && res.data && res.data.EC === 0) {
        setCaloriesMax(res.data.DT.calories_goal);
        setWeightMax(res.data.DT.weight_goal);
        setWaterMax(res.data.DT.water_intake);
        // setWaterGoal(res.data.DT.water_intake);
      } else {
        // toast.error(res.data.EM);
        console.log(res.data.EM);
      }
    } catch (error) {
      console.log(error);
    } finally {
      controller.abort();
    }
  };

  const getCalo = async (date) => {
    try {
      const res = await instance.get(`/user/calo/week/${date}`);
      if (res && res.data && res.data.EC === 0) {
        setCaloriesBurned(res.data.DT);
        setCaloriesConsumed(res.data.DT);
        setCarb(res.data.DT);
        setProtein(res.data.DT);
        setFat(res.data.DT);
        // console.log(res.data.DT);
      } else {
        // toast.error(res.data.EM);
        console.log(res.data.EM);
      }
    } catch (error) {
      console.log(error);
    } finally {
      controller.abort();
    }
  };


  useEffect(() => {
    document.title = 'Analytics';
    getWaterWeek(formatDate(date));
    getWeightByMonth(formatDate(date));
    getCalo(formatDate(date));
    getGoal();
  }, []);
  return (
    <div className="grid-container">
      <main className="main-container">
        <div className="charts">
          {/* <!-- Top 5 meals and Calories --> */}
          <div className="charts-card">
            <h2 className="chart-title">Data</h2>
            <DataChart />
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
