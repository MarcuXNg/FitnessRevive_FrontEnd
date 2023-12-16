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
    <div className="bg-white">
      <div className="relative mt-[55px] flex items-center">
        <div className="text-center mx-auto">
          <img src={process.env.PUBLIC_URL + '/home/background.jpg'} alt="" className="w-full h-full object-cover"/>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center mx-auto">
            <h1 className="text-5xl font-bold mb-4 text-white">Keep Your Body</h1>
            <h1 className="text-5xl font-bold mb-4 text-white">Fit & Strong</h1>
            <p className="text-lg mb-8 text-white">Achieve your fitness goals with our expert trainers and state-of-the-art facilities.</p>
            <a href="/login" className="bg-[#8ce24b] text-white py-3 px-6 rounded-[10px] text-lg mr-4 hover:bg-[#7ec24a]">Start Today</a>
            <a href="/about" className="bg-transparent border border-white-700 text-white py-3 px-6 rounded-[10px] text-lg hover:bg-[#a7ada2]">About Us</a>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl py-5 my-[80px]">
        <div className="grid grid-rows-1 grid-cols-[auto,8rem] mb-4">
          <div className='pl-[120px]'>
            <p className="text-2xl text-[#524FF5] text-center font-semibold tracking-wider font-poppins">OUR FITNESS SUPPORT</p>
            <h2 className="text-3xl text-[#1C2129] font-bold mb-4 text-center font-poppins">Features</h2>
          </div>
          <div>
            <button onClick={() => setShowFeatures(!showFeatures)} className="bg-[#1C2129] text-white py-2 px-6 rounded-[10px] text-lg hover:bg-gray-600 mx-4">More</button>
          </div>
        </div>

        {showFeatures && (
          <div className="mt-8">

            <div className="grid grid-cols-3 justify-center">
              <Feature title="BMI/BMR Calculate" description="Bodybuilding is the practice of progressive resistance exercise to build, control and develop one muscle via hypertrophy." />
              <Feature title="Calories" description="A Form Of Strength Training That Utilizes An Individual Body Weight." />
              <Feature title="Exercise" description="CrossFit is a strength and conditioning workout that is made up of functional performed at a high intensity level." />
            </div>
          </div>
        )}
      </div>

      <div className="bg-[#1D2229] py-8 text-center">
        <p className="text-white text-[40px] tracking-widest font-poppins">FOCUS ON YOUR <span className="text-[#A1F65E] font-bold">FITNESS</span> NOT YOUR LOSS</p>
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
