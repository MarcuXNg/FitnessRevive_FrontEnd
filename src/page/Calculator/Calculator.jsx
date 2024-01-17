/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import useInstance from '../../setup/instance';
import {useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import CaloriesPopUp from '../../components/Popup/CaloriesPopUp';

const Calculator = () => {
  const {instance, controller} = useInstance();
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('male');
  const [activityLevel, setActivityLevel] = useState('sedentary');
  const [show, setShow] = useState(false);
  const [waterIntake, setWaterIntake] = useState(0);
  const [energy, setEnergy] = useState('');
  const [bmi, setBMI] = useState('');
  const [bmr, setBMR] = useState('');
  const [age, setAge] = useState('');
  const [displaySave, setDisplaySave] = useState(false);
  const [analysis, setAnalysis] = useState('');
  const [tdee, setTdee] = useState('');
  const auth = useSelector((state) => state.auth);

  const saveData = async (bmi, bmr, tdee, waterIntake, activityLevel, height, weight) => {
    try {
      if (auth.isAuthenticated === true) {
        const res = await instance.post(`/users/bmi-bmr/save`, {bmi, bmr, tdee, waterIntake, activityLevel, height, weight});
        if (res && res.data && res.data.EC === 0) {
          toast.success(res.data.EM);
        } else {
          toast.error(res.data.EM);
        }
      } else {
        toast.error('Please login.');
      }
    } catch (error) {
      console.log(error);
    } finally {
      controller.abort();
    }
  };

  const saveGoal = async (goal) => {
    try {
      if (auth.isAuthenticated === true) {
        const res = await instance.post(`/users/goal/save`, {goal});
        if (res && res.data && res.data.EC === 0) {
          toast.success(res.data.EM);
        } else {
          toast.error(res.data.EM);
        }
      } else {
        toast.error('Please login.');
      }
    } catch (error) {
      console.log(error);
    } finally {
      controller.abort();
    }
  };

  const dataSave = () => {
    saveData(bmi, bmr, tdee, waterIntake, activityLevel, height, weight);
  };

  const calculateBMI = () => {
    if (weight && height) {
      // Calculate BMI
      const calculatedBMI =
        parseFloat(weight) / (parseFloat(height) / 100) ** 2;
      setBMI(calculatedBMI.toFixed(2));
    } else {
      toast.error('Please fill in all input');
    }
  };

  const calculateBMR = () => {
    if (weight && height && age && gender && activityLevel) {
      if (gender === 'male') {
        const calculatedBMR =
          88.362 +
          13.397 * parseFloat(weight) +
          4.799 * parseFloat(height) -
          5.677 * age;
        // console.log(calculatedBMR);
        let tdee;
        switch (activityLevel) {
          case 'sedentary':
            tdee = calculatedBMR.toFixed(2) * 1.2;
            break;
          case 'lightlyActive':
            tdee = calculatedBMR.toFixed(2) * 1.375;
            break;
          case 'moderatelyActive':
            tdee = calculatedBMR.toFixed(2) * 1.55;
            break;
          case 'veryActive':
            tdee = calculatedBMR.toFixed(2) * 1.725;
            break;
          case 'extraActive':
            tdee = calculatedBMR.toFixed(2) * 1.9;
            break;
          default:
            break;
        }
        setBMR(calculatedBMR.toFixed(2));
        setTdee(tdee.toFixed(2));

        const waterIntake = Math.round((weight * 0.03) * 100) / 100;
        setWaterIntake(waterIntake.toFixed(0));
      }
      if (gender === 'female') {
        const calculatedBMR =
          447.593 +
          9.247 * parseFloat(weight) +
          3.098 * parseFloat(height) -
          4.33 * age;
        // console.log(calculatedBMR);
        let tdee;
        switch (activityLevel) {
          case 'sedentary':
            tdee = calculatedBMR.toFixed(2) * 1.2;
            break;
          case 'lightlyActive':
            tdee = calculatedBMR.toFixed(2) * 1.375;
            break;
          case 'moderatelyActive':
            tdee = calculatedBMR.toFixed(2) * 1.55;
            break;
          case 'veryActive':
            tdee = calculatedBMR.toFixed(2) * 1.725;
            break;
          case 'extraActive':
            tdee = calculatedBMR.toFixed(2) * 1.9;
            break;
          default:
            break;
        }
        setBMR(calculatedBMR.toFixed(2));
        setTdee(tdee.toFixed(2));

        const waterIntake = Math.round((weight * 0.03) * 100) / 100;
        setWaterIntake(waterIntake.toFixed(0));
      }
    } else {
      toast.error('Please fill in all input');
    }
  };

  const calculate = () => {
    if (weight && age && height && gender) {
      calculateBMI();
      calculateBMR();
      advancedBMIAnalysis(bmi, age, gender);
      setDisplaySave(true);
    } else {
      toast.error('Please fill in all input');
    }
  };

  const advancedBMIAnalysis = (bmi, age, gender) => {
    // Adjust BMI categories based on age and gender
    const isMale = gender === 'male';
    const isFemale = gender === 'female';

    if (isMale && age >= 50) {
      if (bmi < 22) {
        setAnalysis('Below the recommended range for older males.');
      } else if (bmi >= 22 && bmi < 27) {
        setAnalysis('Within the recommended range for older males.');
      } else {
        setAnalysis('Above the recommended range for older males.');
      }
    } else if (isFemale && age >= 50) {
      if (bmi < 21) {
        setAnalysis('Below the recommended range for older females.');
      } else if (bmi >= 21 && bmi < 26) {
        setAnalysis('Within the recommended range for older females.');
      } else {
        setAnalysis('Above the recommended range for older females.');
      }
    } else {
      // Standard BMI categories
      if (bmi < 18.5) {
        setAnalysis('Underweight');
      } else if (bmi >= 18.5 && bmi < 24.9) {
        setAnalysis('Normal weight');
      } else if (bmi >= 25 && bmi < 29.9) {
        setAnalysis('Overweight');
      } else {
        setAnalysis('Obese');
      }
    }
  };

  const adjustCalories = (calo, factor) => {
    // Logic để điều chỉnh calo dựa trên factor

    const res = calo * factor;

    setEnergy(res);
    saveGoal(res);
    // toast.success(`Energy needed is: ${res} calories/day`);
  };
  const togglePopup = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  return (
    <div>
      <div className="flex justify-center items-center h-[496px] w-[100%] overflow-hidden relative mt-[80px]">
        <div>
          <img
            src={process.env.PUBLIC_URL + '/home/background.jpg'}
            alt="Background"
          />
          <span className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 text-white text-[48px] font-bold">
            Calculator
          </span>
        </div>
      </div>
      <div className="container mx-auto max-w-6xl py-5 my-[80px]">
        <div className="grid grid-rows-1 grid-cols-2 gap-[25px]">
          <div>
            <h2 className="text-[#524FF5] font-inter text-[20px] font-semibold leading-[22px] tracking-[8px] uppercase">
              Fill details and save your data
            </h2>
            <h3 className="text-[#1C2129] font-inter text-[45px] font-[700] leading-[22px] mt-[60px] mb-5">
              Your BMI / BMR
            </h3>
            <p className="text-justify mb-4">
              <span className="font-bold font-poppins text-[20px]">Body mass index</span> is
              a value derived from the mass and height of a person. The BMI is
              defined as the body mass divided by the square of the body height,
              and is expressed in units of kg/m², resulting from mass in
              kilograms and height in metres.
            </p>
            <p className="text-justify mb-4">
              <span className="font-bold font-poppins text-[20px]">
                Basal Metabolic Rate
              </span>{' '}
              represents the amount of energy, measured in calories, that the
              body requires at rest to maintain normal bodily functions such as
              breathing, circulation, and cell production. In other words, it is
              the number of calories your body needs to perform basic
              physiological functions while at complete rest.
            </p>
            <div className='mt-10'>
              <div className="grid grid-rows-1 grid-cols-2">
                <div className="mb-2 flex justify-center font-poppins">
                  <input
                    type="text"
                    placeholder="Height / cm"
                    className="px-3 py-3 border-black border-[2px] rounded-[4px]"
                    id="height"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </div>
                <div className="mb-2 flex justify-center font-poppins">
                  <input
                    type="text"
                    id="weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Weight / kg"
                    className="px-3 py-3 border-black border-[2px] rounded-[4px]"
                  />
                </div>
                <div className="mb-2 flex justify-center font-poppins">
                  <input
                    type="text"
                    placeholder="Age"
                    className="px-3 py-3 border-black border-[2px] rounded-[4px]"
                    onChange={(e) => setAge(e.target.value)}
                    value={age}
                  />
                </div>
                <div className="mb-3 flex justify-center font-poppins">
                  <select
                    id="gender"
                    name="gender"
                    className="px-3 py-3 border-black border-[2px] rounded-[4px]"
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
              <div className="mb-3 flex justify-center font-poppins">
                <select
                  id="activityLevel"
                  name='activityLevel'
                  value={activityLevel}
                  className="px-3 py-3 border-black border-[2px] rounded-[4px]"
                  onChange={(e) => setActivityLevel(e.target.value)}
                >
                  <option value="sedentary">Sedentary (little or no exercise)</option>
                  <option value="lightlyActive">Lightly Active (light exercise/sports 1-3 days/week)</option>
                  <option value="moderatelyActive">Moderately Active (moderate exercise/sports 3-5 days/week)</option>
                  <option value="veryActive">Very Active (hard exercise/sports 6-7 days a week)</option>
                  <option value="extraActive">Extra Active (very hard exercise/sports & physical job or 2x training)</option>
                </select>
              </div>
            </div>
            {/* Add other form fields here */}
            <div className="items-center justify-center flex">
              <button
                className="flex justify-center items-center gap-[10px] bg-[#1B2129] text-white border-none cursor-pointer text-[16px] rounded-[4px] pt-[15px] pr-[40px] pb-[15px] pl-[40px] font-poppins"
                onClick={calculate}
              >
                Calculate
              </button>
            </div>
            <div className="grid grid-cols-2 mt-10">
              <div>
                <div className="mt-7">
                  {bmi && (
                    <h3 className="text-[20px] font-poppins">
                      Your BMI is:{' '}
                      <span className="font-bold text-red-500">{bmi}</span>
                    </h3>
                  )}
                </div>
                {analysis && (
                  <h2 className="font-poppins">
                    <span className="font-poppins font-bold">Note:</span>{' '}
                    {analysis}
                  </h2>
                )}
                <div className="mt-2">
                  {bmr && (
                    <h3 className="text-[20px] font-poppins">
                      Your BMR is:{' '}
                      <span className="font-bold text-red-500">{bmr}</span>
                    </h3>
                  )}
                </div>
                <div className="mt-2">
                  {bmr && (
                    <h3 className="text-[20px] font-poppins">
                      Your TDEE is:{' '}
                      <span className="font-bold text-red-500">{tdee}</span>
                    </h3>
                  )}
                </div>
              </div>
              {displaySave && (
                <div className="items-center justify-center grid">
                  <div>
                    <button
                      className="flex justify-center items-center gap-[10px] bg-[#1B2129] text-white border-none cursor-pointer text-[16px] rounded-[4px] pt-[15px] pr-[40px] pb-[15px] pl-[40px] mt-4 font-poppins"
                      onClick={dataSave}
                    >
                    Save
                    </button>
                  </div>
                  <div>
                    <button
                      className="flex justify-center items-center gap-[10px] bg-[#1B2129] text-white border-none cursor-pointer text-[16px] rounded-[4px] pt-[15px] pr-[40px] pb-[15px] pl-[40px] mt-4 font-poppins"
                      onClick={togglePopup}
                    >
                    Set your goal
                    </button>
                    <CaloriesPopUp
                      show={show}
                      handleClose={handleClose}
                      data={tdee}
                      adjustCalories={adjustCalories}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-[#1C2129] font-inter text-[45px] font-[700] leading-[22px] mt-5 mb-5">
              Chart
            </h3>
            <table>
              <thead>
                <tr>
                  {/* <th className="py-2 px-[2px] hover:bg-gray-200 border-r w-[100px]">BMI</th>
                  <th className="py-2 px-4 hover:bg-gray-200 border-r">URL</th> */}
                  <th className="py-5 px-[120px] border bg-[#1C2128] font-poppins text-white">
                    BMI
                  </th>
                  <th className="py-5 px-[80px] border bg-[#1C2128] font-poppins text-white">
                    WEIGHT STATUS
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-5 px-[20px] border text-center font-poppins bg-[#1C2128] text-white">
                    Below 18.5
                  </td>
                  <td className="py-5 px-[20px] border text-center font-poppins bg-[#1C2128] text-yellow-300">
                    Underweight
                  </td>
                </tr>
                <tr>
                  <td className="py-5 px-[20px] border text-center font-poppins bg-[#1C2128] text-white">
                    18.5 - 24.9
                  </td>
                  <td className="py-5 px-[20px] border text-center font-poppins bg-[#1C2128] text-green-400">
                    Healthy
                  </td>
                </tr>
                <tr>
                  <td className="py-5 px-[20px] border text-center font-poppins bg-[#1C2128] text-white">
                    25.0 -29.9
                  </td>
                  <td className="py-5 px-[20px] border text-center font-poppins bg-[#1C2128] text-orange-400">
                    Overweight
                  </td>
                </tr>
                <tr>
                  <td className="py-5 px-[20px] border text-center font-poppins bg-[#1C2128] text-white">
                    30.0 - and Above
                  </td>
                  <td className="py-5 px-[20px] border text-center font-poppins bg-[#1C2128] text-red-400">
                    Obese
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="mt-10">
              <h3 className="text-[#1C2129] font-inter text-[45px] font-[700] leading-[22px] mt-[60px] mb-5">
                Your TDEE
              </h3>
              <p className="text-justify mb-4">
                <span className="font-bold font-poppins text-[20px]">TDEE</span> stands for{' '}
                <span className="font-bold font-poppins">
                  Total Daily Energy Expenditure
                </span>
                . It represents the total number of calories that an individual
                burns in a day, taking into account all activities, including
                basal metabolic rate (BMR), physical activity, and the thermic
                effect of food. The TDEE is a crucial factor in determining an
                individual&apos;s caloric needs, especially for those who are
                interested in managing their weight. To calculate TDEE, you
                typically start with the BMR, which represents the number of
                calories your body needs at rest to maintain basic physiological
                functions. Then, you factor in the calories burned through daily
                activities and exercise.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
