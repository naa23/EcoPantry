import React from 'react';
import about from '../assets/about.png';
import waste from '../assets/food-waste.png';
import team from '../assets/team.jpg';

const About = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <img src={about} alt="about" className='w-44 h-44 mt-5' />
      <p className='max-w-[900px] text-xl'>
        Every year, over 1.3 billion tons of food is wasted worldwide. That's about one-third of all food produced for human consumption, 
        and it has a massive impact on our environment and communities. At Eco Pantry, 
        we're on a mission to reduce this staggering amount of waste by making it easier for people to manage what they already have.
      </p>
      <p className='max-w-[900px] text-xl mt-5'>
        Our app empowers you to take control of your pantry with simple tools like expiration date tracking, 
        recipe suggestions, and even a community-sharing feature for when you have items to give away. 
        No more forgotten food at the back of the fridge or expired pantry items—Eco Pantry ensures you use what you have, 
        all while saving money and supporting sustainability.
      </p>
      <img src={waste} alt="waste" className='w-[900px] h-[400px] mt-8' />
      
      <h1 className='mt-5 text-2xl font-bold'>Our Motivation</h1>
      <p className='mt-5 text-xl max-w-[900px]'>
        Eco Pantry was born out of a passion for helping people and our planet.
        We're a group of four friends who came together at HackNJIT to build something meaningful in just 24 hours. 
        We recognized the need for an app that goes beyond simple inventory management. We believe in a future where technology supports sustainable choices, 
        and we're here to make that future a reality. Our team's diverse backgrounds bring together creativity, technical skill, and a shared goal to reduce food waste globally.
      </p>
      
      <h1 className='mt-5 text-2xl font-bold'>Who We Are</h1>
      <p className='mt-5 text-xl max-w-[900px]'>
        Eco Pantry was born out of a passion for helping people and our planet.
        We're a group of four friends who came together at HackNJIT to build something meaningful in just 24 hours. 
        We recognized the need for an app that goes beyond simple inventory management. We believe in a future where technology supports sustainable choices, 
        and we're here to make that future a reality. Our team's diverse backgrounds bring together creativity, technical skill, and a shared goal to reduce food waste globally.
      </p>
      
      <img src={team} alt="team" className='w-[500px] h-[300px] mt-5' />
      
      <div className='flex items-center justify-center bg-gray-300 w-full h-[100px] mt-10'>
        <p>Created By Team Steam Sustain | © All Rights Reserved</p>
      </div>
    </div>
  );
};

export default About;
