/* eslint-disable */
// About.jsx
import React, {useEffect} from 'react';

const Feature = ({title, description}) => (
  <div className="mx-4">
    <h3 className="text-lg font-bold mb-2 text-white">{title}</h3>
    <p className="text-gray-500">{description}</p>
  </div>
);


const About = () => {
  useEffect(() => {
    document.title = 'About';
  }, []);

  return (
    <div className="font-sans bg-gray-100 relative">
      <div className="bg-cover bg-center h-screen flex flex-col items-center justify-center text-white" style={{ backgroundColor: '#191c21' }}>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold mb-4">Start with us the body and mind cleansing</h1>
        </div>
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        </div>
      </div>

      <div className="flex justify-between mt-3">
        <div className="w-1/5 bg-gray-300 p-6 rounded-lg aspect-w-1 aspect-h-1 mr-3">
          <h2 className="text-2xl font-bold mb-4">The Story Behind Your Gym</h2>
          <p>Content goes here...</p>
        </div>
        <div className="w-1/5 bg-green-500 p-6 rounded-lg aspect-w-1 aspect-h-1 mr-3">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p>Content goes here...</p>
        </div>
      </div>

      <div className="flex justify-between mt-3">
        <div className="w-1/5 bg-blue-500 p-6 rounded-lg aspect-w-1 aspect-h-1 mr-3">
          <h2 className="text-2xl font-bold mb-4">The Story</h2>
          <p>Content goes here...</p>
        </div>
        <div className="w-1/5 bg-gray-400 p-6 rounded-lg aspect-w-1 aspect-h-1">
          <h2 className="text-2xl font-bold mb-4">Our Value</h2>
          <p>Content goes here...</p>
        </div>
      </div>

      <div className="flex justify-between mt-3">
        <div className="w-1/5 p-6 rounded-lg aspect-w-1 aspect-h-1">
          <h2 className="text-2xl font-bold mb-4">Respect Your Body, It's The Only One You Get</h2>
          <p>More content goes here...</p>
        </div>
      </div>

      <div className="flex justify-between mt-3">
        <div className="w-1/5 p-6 rounded-lg aspect-w-1 aspect-h-1">
          <h2 className="text-2xl font-bold mb-4">Respect Your Body, It's The Only One You Get</h2>
          <p>More content goes here...</p>
        </div>
      </div>

      <div className="flex justify-between mt-3">
        <div className="w-2/5 p-6 rounded-lg aspect-square">
          <h2 className="text-2xl font-bold mb-4">Respect Your Body, It's The Only One You Get</h2>
          <p>More content goes here...</p>
        </div>
      </div>

      <div className="flex justify-between mt-3">
        <div className="w-2/5 p-6 rounded-lg aspect-w-1 aspect-h-1">
          <h2 className="text-2xl font-bold mb-4">Respect Your Body, It's The Only One You Get</h2>
          <p>More content goes here...</p>
        </div>
      </div>

      <div className="flex justify-between mt-3">
        <div className="w-2/5 p-6 rounded-lg aspect-w-1 aspect-h-1">
          <div>
            <h2 className="text-2xl font-bold mb-4">Inspiration</h2>
            <p>Content for Inspiration goes here...</p>
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-bold mb-4">Motivation</h2>
            <p>Content for Motivation goes here...</p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-black p-4">
        <h2 className="text-3xl font-bold mb-4 text-white">Our Key Features</h2>
        <div className="flex">
          <Feature title="Certified Trainer" description="Bodybuilding is the practice of progressive resistance exercise to build, control, and develop one muscle via hypertrophy." />
          <Feature title="Nutrition & Diet" description="A form of strength training that utilizes an individual body weight." />
          <Feature title="Years of Experience" description="CrossFit is a strength and conditioning workout that is made up of functional performed at a high intensity level." />
        </div>
      </div>
    </div>
  );
};

export default About;
