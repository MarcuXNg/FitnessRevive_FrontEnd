/* eslint-disable react/prop-types */
import React, {useState} from 'react';

const Feature = ({title, description}) => (
  <div className="mx-4">
    <h3 className="text-lg font-bold mb-2">{title}</h3>
    <p className="text-gray-500">{description}</p>
  </div>
);

const Developer = ({name, role, image}) => (
  <div className="mx-4">
    <img src={image} alt={name} className="rounded-full h-32 w-32 mb-2" />
    <p className="text-lg">{name}</p>
    <p className="text-sm text-gray-500">{role}</p>
  </div>
);

const Home = () => {
  const [showFeatures, setShowFeatures] = useState(false);
  const [showDevelopers, setShowDevelopers] = useState(false);

  return (
    <div className="App bg-gray-900 text-white">
      <div className="bg-cover bg-center h-screen flex items-center">
        <div className="text-center mx-auto">
          <h1 className="text-5xl font-bold mb-4">Your Fitness Journey Starts Here</h1>
          <p className="text-lg mb-8">Achieve your fitness goals with our expert trainers and state-of-the-art facilities.</p>
          <a href="/login" className="bg-green-500 text-white py-2 px-6 rounded-[10px] text-lg mr-4 hover:bg-green-600">Start Today</a>
          <a href="/about" className="bg-blue-500 text-white py-2 px-6 rounded-[10px] text-lg hover:bg-blue-600">About Us</a>
        </div>
      </div>

      <div className="bg-gray-800 py-10 text-center">
        <div className="flex justify-center items-center mb-4">
          <p className="text-2xl text-white">Our Fitness Support</p>
          <button onClick={() => setShowFeatures(!showFeatures)} className="bg-gray-500 text-white py-2 px-6 rounded-full text-lg hover:bg-gray-600 ml-4">More</button>
        </div>

        {showFeatures && (
          <div className="mt-8">
            <h2 className="text-3xl font-bold mb-4">Our Key Features</h2>
            <div className="flex justify-center">
              <Feature title="BMI/BMR Calculate" description="Bodybuilding is the practice of progressive resistance exercise to build, control and develop one muscle via hypertrophy." />
              <Feature title="Calories" description="A Form Of Strength Training That Utilizes An Individual Body Weight." />
              <Feature title="Exercise" description="CrossFit is a strength and conditioning workout that is made up of functional performed at a high intensity level." />
            </div>
          </div>
        )}
      </div>

      <div className="bg-black py-8 text-center">
        <p className="text-white">FOCUS ON YOUR <span className="text-green-500 font-bold">FITNESS</span> NOT YOUR LOSS</p>
      </div>

      <div className="bg-gray-700 py-10 text-center">
        <div className="flex justify-center items-center mb-4">
          <p className="text-2xl text-white">Meet Our Developers</p>
          <button onClick={() => setShowDevelopers(!showDevelopers)} className="bg-gray-500 text-white py-2 px-6 rounded-full text-lg hover:bg-gray-600 ml-4">More</button>
        </div>

        {showDevelopers && (
          <div className="mt-8">
            <h2 className="text-3xl font-bold mb-4">Meet Our Developers</h2>
            <div className="flex justify-center">
              <Developer name="Duong Nguyen" role="Back-end Developer" image={process.env.PUBLIC_URL + '/developer1.jpg'} />
              <Developer name="Minh Tri" role="Front-end Developer" image={process.env.PUBLIC_URL + '/developer2.jpg'} />
              <Developer name="Trung Kien" role="Back-end Developer" image={process.env.PUBLIC_URL + '/developer3.jpg'} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
