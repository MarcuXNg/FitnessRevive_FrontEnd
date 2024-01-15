// About.jsx
import React, {useEffect} from 'react';

const About = () => {
  useEffect(() => {
    document.title = 'About';
  }, []);
  return <h2>About</h2>;
};

export default About;
